type TokenFeature = {
  index: number;
  token: string;
  role: number;
  object: number;
  writing: number;
  action: number;
  feeling: number;
  prediction: number;
};

const rawTokens = ["I", "just", "dropped", "my", "mechanical", "pencil", "I", "can't", "believe", "my", "lead", "___"];

const tokenFeatures: TokenFeature[] = rawTokens.map((token, index) => {
  const normalized = token.toLowerCase();

  return {
    index,
    token,
    role: normalized === "i" || normalized === "my" ? 1 : 0,
    object: normalized === "pencil" || normalized === "lead" ? 1 : 0,
    writing: normalized === "mechanical" || normalized === "pencil" || normalized === "lead" || token === "___" ? 1 : 0,
    action: normalized === "dropped" || token === "___" ? 1 : 0,
    feeling: normalized === "can't" || normalized === "believe" ? 1 : 0,
    prediction: normalized === "lead" || token === "___" ? 1 : 0,
  };
});

function dotProduct(query: TokenFeature, key: TokenFeature) {
  return (
    query.role * key.role * 0.7 +
    query.object * key.object * 1.1 +
    query.writing * key.writing * 0.9 +
    query.action * key.action * 0.65 +
    query.feeling * key.feeling * 0.7 +
    query.prediction * key.prediction * 1.2
  );
}

function attentionScore(query: TokenFeature, key: TokenFeature) {
  const distance = Math.abs(query.index - key.index);
  const nearbyBoost = Math.max(0, 0.55 - distance * 0.1);
  const selfBoost = query.index === key.index ? 1.25 : 0;
  return dotProduct(query, key) + nearbyBoost + selfBoost;
}

const attentionColumns = tokenFeatures.map((query) => {
  const rawScores = tokenFeatures.map((key) => attentionScore(query, key));
  const maxScore = Math.max(...rawScores);
  const expScores = rawScores.map((score) => Math.exp(score - maxScore));
  const total = expScores.reduce((sum, score) => sum + score, 0);

  return expScores.map((score) => score / total);
});

function formatScore(score: number) {
  return score.toFixed(2);
}

export function TokenAttentionTable() {
  const cellSize = 42;
  const leftGutter = 96;
  const topGutter = 92;
  const gridSize = tokenFeatures.length * cellSize;
  const width = leftGutter + gridSize + 18;
  const height = topGutter + gridSize + 36;

  return (
    <div style={{ margin: "22px 0 30px" }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        aria-label="Toy attention scores between every token in the example sentence"
        role="img"
        style={{
          display: "block",
          height: "auto",
          width: "100%",
        }}
      >
        <title>Toy attention score table</title>
        <desc>
          The same tokens are mirrored along the top and left side. Each circle is sized by a toy attention score and has the score
          written inside it.
        </desc>
        <rect x="0" y="0" width={width} height={height - 18} rx="10" fill="rgba(255, 251, 244, 0.66)" stroke="var(--rule)" />

        {tokenFeatures.map((query, index) => {
          const x = leftGutter + index * cellSize + cellSize / 2;

          return (
            <g key={`query-${query.index}`} transform={`translate(${x} ${topGutter - 10})`}>
              <rect x="-24" y="-68" width="48" height="24" rx="5" fill="rgba(255, 251, 244, 0.9)" stroke="var(--rule)" />
              <text
                x="0"
                y="-52"
                textAnchor="middle"
                fill="#251f18"
                fontSize="10"
                fontWeight="700"
                style={{ fontFamily: "inherit" }}
              >
                {query.token}
              </text>
              <line x1="0" y1="-38" x2="0" y2="-10" stroke="rgba(37, 31, 24, 0.48)" strokeWidth="1.5" />
            </g>
          );
        })}

        {tokenFeatures.map((keyToken, rowIndex) => {
          const y = topGutter + rowIndex * cellSize + cellSize / 2;

          return (
            <g key={`key-${keyToken.index}`}>
              <rect x="14" y={y - 12} width="68" height="24" rx="5" fill="rgba(255, 251, 244, 0.9)" stroke="var(--rule)" />
              <text
                x="48"
                y={y + 4}
                textAnchor="middle"
                fill="#251f18"
                fontSize="10"
                fontWeight="700"
                style={{ fontFamily: "inherit" }}
              >
                {keyToken.token}
              </text>
              <line x1="86" y1={y} x2={leftGutter - 8} y2={y} stroke="rgba(37, 31, 24, 0.48)" strokeWidth="1.5" />
            </g>
          );
        })}

        {tokenFeatures.map((_, index) => {
          const offset = leftGutter + index * cellSize;

          return (
            <g key={`grid-${index}`}>
              <line x1={offset} y1={topGutter} x2={offset} y2={topGutter + gridSize} stroke="rgba(74, 59, 43, 0.14)" />
              <line x1={leftGutter} y1={topGutter + index * cellSize} x2={leftGutter + gridSize} y2={topGutter + index * cellSize} stroke="rgba(74, 59, 43, 0.14)" />
            </g>
          );
        })}
        <line x1={leftGutter + gridSize} y1={topGutter} x2={leftGutter + gridSize} y2={topGutter + gridSize} stroke="rgba(74, 59, 43, 0.14)" />
        <line x1={leftGutter} y1={topGutter + gridSize} x2={leftGutter + gridSize} y2={topGutter + gridSize} stroke="rgba(74, 59, 43, 0.14)" />

        {tokenFeatures.map((keyToken, rowIndex) =>
          tokenFeatures.map((queryToken, columnIndex) => {
            const score = attentionColumns[queryToken.index][keyToken.index];
            const radius = 4 + Math.sqrt(score) * 27;
            const x = leftGutter + columnIndex * cellSize + cellSize / 2;
            const y = topGutter + rowIndex * cellSize + cellSize / 2;

            return (
              <g key={`${keyToken.index}-${queryToken.index}`}>
                <circle cx={x} cy={y} r={radius} fill="rgba(37, 31, 24, 0.18)" />
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  fill="#251f18"
                  fontSize="8"
                  fontWeight="700"
                  style={{ fontFamily: "inherit" }}
                >
                  {formatScore(score)}
                </text>
              </g>
            );
          }),
        )}
      </svg>
      <i>Each score is a toy softmax attention weight for a query token looking across all key tokens.</i>
    </div>
  );
}
