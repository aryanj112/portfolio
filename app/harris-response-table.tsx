"use client";

import { useMemo, useState } from "react";
import { InlineMath } from "react-katex";

const CASES = [
  { label: "Flat", lambda1: 0.1, lambda2: 0.1, interpretation: "Very small -> flat" },
  { label: "Edge", lambda1: 10, lambda2: 0.1, interpretation: "Negative -> edge" },
  { label: "Corner", lambda1: 10, lambda2: 10, interpretation: "Large positive -> corner" },
];

function formatNumber(value: number) {
  if (Math.abs(value) >= 100) return value.toFixed(1).replace(/\.0$/, "");
  if (Math.abs(value) >= 10) return value.toFixed(2).replace(/0$/, "").replace(/\.0$/, "");
  return value.toFixed(4).replace(/0+$/, "").replace(/\.$/, "");
}

export function HarrisResponseTable() {
  const [k, setK] = useState(0.04);
  const [customLambda1, setCustomLambda1] = useState(6);
  const [customLambda2, setCustomLambda2] = useState(2);

  const rows = useMemo(() => {
    return CASES.map((item) => {
      const det = item.lambda1 * item.lambda2;
      const trace = item.lambda1 + item.lambda2;
      const penalty = k * trace * trace;
      const response = det - penalty;

      return {
        ...item,
        det,
        trace,
        penalty,
        response,
      };
    });
  }, [k]);

  const customRow = useMemo(() => {
    const det = customLambda1 * customLambda2;
    const trace = customLambda1 + customLambda2;
    const response = det - k * trace * trace;

    let interpretation = "Near zero -> flat-ish";
    let tone: "neutral" | "positive" | "negative" = "neutral";

    if (response > 0.5) {
      interpretation = "Positive -> corner-like";
      tone = "positive";
    } else if (response < -0.5) {
      interpretation = "Negative -> edge-like";
      tone = "negative";
    }

    return {
      label: "Your values",
      lambda1: customLambda1,
      lambda2: customLambda2,
      det,
      trace,
      response,
      interpretation,
      tone,
    };
  }, [customLambda1, customLambda2, k]);

  return (
    <div className="harrisResponseTableWrap">
      <div className="harrisResponseTableTop">
        <p className="harrisResponseTableTitle">Numerical intuition</p>
        <label className="harrisResponseSlider">
          <span>
            <InlineMath math={"k"} /> = {k.toFixed(2)}
          </span>
          <input
            type="range"
            min="0.02"
            max="0.08"
            step="0.005"
            value={k}
            onChange={(event) => setK(Number(event.target.value))}
          />
        </label>
      </div>

      <div className="harrisResponseTableScroll">
        <table className="harrisResponseTable">
          <thead>
            <tr>
              <th className="harrisResponseCaseCol">Case</th>
              <th className="harrisResponseLambdaCol"><InlineMath math={"\\lambda_1"} /></th>
              <th className="harrisResponseLambdaCol"><InlineMath math={"\\lambda_2"} /></th>
              <th className="harrisResponseValueCol">
                <span className="harrisResponseHeaderSplit">
                  <span>det =</span>
                  <InlineMath math={"\\lambda_1\\lambda_2"} />
                </span>
              </th>
              <th className="harrisResponseValueCol">
                <span className="harrisResponseHeaderSplit">
                  <span>trace =</span>
                  <InlineMath math={"\\lambda_1 + \\lambda_2"} />
                </span>
              </th>
              <th className="harrisResponseFormulaCol"><InlineMath math={"R = \\det - k(\\mathrm{trace})^2"} /></th>
              <th className="harrisResponseInterpretationCol">Interpretation</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="harrisResponseCaseCol">{row.label}</td>
                <td className="harrisResponseLambdaCol">{formatNumber(row.lambda1)}</td>
                <td className="harrisResponseLambdaCol">{formatNumber(row.lambda2)}</td>
                <td className="harrisResponseValueCol">{formatNumber(row.det)}</td>
                <td className="harrisResponseValueCol">{formatNumber(row.trace)}</td>
                <td className={`harrisResponseFormulaCol ${row.label === "Flat" ? "isNeutral" : row.response >= 0 ? "isPositive" : "isNegative"}`}>
                  {formatNumber(row.det)} - {k.toFixed(2)}({formatNumber(row.trace * row.trace)}) = {formatNumber(row.response)}
                </td>
                <td className={`harrisResponseInterpretationCol ${row.label === "Flat" ? "isNeutralText" : row.response >= 0 ? "isPositiveText" : "isNegativeText"}`}>{row.interpretation}</td>
              </tr>
            ))}
            <tr>
              <td className="harrisResponseCaseCol">{customRow.label}</td>
              <td className="harrisResponseLambdaCol">
                <input
                  className="harrisResponseInput"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={customLambda1}
                  onChange={(event) => setCustomLambda1(Number(event.target.value))}
                />
              </td>
              <td className="harrisResponseLambdaCol">
                <input
                  className="harrisResponseInput"
                  type="number"
                  inputMode="decimal"
                  step="0.1"
                  value={customLambda2}
                  onChange={(event) => setCustomLambda2(Number(event.target.value))}
                />
              </td>
              <td className="harrisResponseValueCol">{formatNumber(customRow.det)}</td>
              <td className="harrisResponseValueCol">{formatNumber(customRow.trace)}</td>
              <td className={`harrisResponseFormulaCol ${customRow.tone === "neutral" ? "isNeutral" : customRow.tone === "positive" ? "isPositive" : "isNegative"}`}>
                {formatNumber(customRow.det)} - {k.toFixed(2)}({formatNumber(customRow.trace * customRow.trace)}) = {formatNumber(customRow.response)}
              </td>
              <td className={`harrisResponseInterpretationCol ${customRow.tone === "neutral" ? "isNeutralText" : customRow.tone === "positive" ? "isPositiveText" : "isNegativeText"}`}>
                {customRow.interpretation}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
