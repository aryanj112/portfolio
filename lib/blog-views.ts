const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;

function hasRedisConfig() {
  return Boolean(REDIS_URL && REDIS_TOKEN);
}

function getKey(slug: string) {
  return `blog:unique-viewers:${slug}`;
}

async function redisRequest(path: string, init?: RequestInit) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return null;
  }

  const response = await fetch(`${REDIS_URL}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis request failed: ${response.status}`);
  }

  return response.json();
}

export async function getUniqueViewCount(slug: string) {
  if (!hasRedisConfig()) {
    return null;
  }

  const key = encodeURIComponent(getKey(slug));
  const data = await redisRequest(`/scard/${key}`);
  return typeof data?.result === "number" ? data.result : 0;
}

export async function registerUniqueView(slug: string, viewerId: string) {
  if (!hasRedisConfig()) {
    return null;
  }

  const key = encodeURIComponent(getKey(slug));
  const member = encodeURIComponent(viewerId);

  await redisRequest(`/sadd/${key}/${member}`, { method: "POST" });
  return getUniqueViewCount(slug);
}

export function blogViewsEnabled() {
  return hasRedisConfig();
}
