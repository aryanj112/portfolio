import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { blogViewsEnabled, registerUniqueView } from "../../../../../lib/blog-views";

function getCookieName(slug: string) {
  return `blog-viewer-${slug}`;
}

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!blogViewsEnabled()) {
    return NextResponse.json({ count: null, enabled: false });
  }

  const cookieStore = await cookies();
  const cookieName = getCookieName(slug);
  let viewerId = cookieStore.get(cookieName)?.value;

  if (!viewerId) {
    viewerId = crypto.randomUUID();
  }

  const count = await registerUniqueView(slug, viewerId);
  const response = NextResponse.json({ count, enabled: true });

  response.cookies.set(cookieName, viewerId, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
  });

  return response;
}
