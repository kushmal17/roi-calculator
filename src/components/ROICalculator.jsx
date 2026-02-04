import { useState } from "react";
import ROIGraph from "./ROIGraph";
import "../styles/roi.css";

const ROICalculator = () => {
  // ROI STATES
  const [invested, setInvested] = useState("");
  const [returned, setReturned] = useState("");
  const [mode, setMode] = useState("dates");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  // FUNNEL STATES
  const [leads, setLeads] = useState("");
  const [actualSales, setActualSales] = useState("");
  const [profitPerSale, setProfitPerSale] = useState("");
  const [expectedConversion, setExpectedConversion] = useState("");
  const [funnelResult, setFunnelResult] = useState(null);

  // ROI TIME CALC
  const calcYearsFromDates = () => {
    const start = new Date(from);
    const end = new Date(to);
    return (end - start) / (1000 * 60 * 60 * 24 * 365);
  };

  // ROI CALCULATION
  const calculateROI = () => {
    if (!invested || !returned) {
      alert("Please enter ROI details first");
      return;
    }

    const inv = Number(invested);
    const ret = Number(returned);
    const time = mode === "dates" ? calcYearsFromDates() : Number(years);

    if (!time || time <= 0) return;

    const gain = ret - inv;
    const roi = (gain / inv) * 100;
    const annualized = (Math.pow(ret / inv, 1 / time) - 1) * 100;

    setResult({ gain, roi, annualized });
    setFunnelResult(null); // reset funnel if ROI recalculated
  };

  // FUNNEL CALCULATION (ROI DEPENDENT)
  const calculateFunnel = () => {
    if (!result) {
      alert("Please calculate ROI first");
      return;
    }

    if (!leads || !actualSales || !profitPerSale || !expectedConversion) return;

    const l = Number(leads);
    const s = Number(actualSales);
    const p = Number(profitPerSale);
    const expConv = Number(expectedConversion);

    const actualConv = (s / l) * 100;
    const expectedSales = l * (expConv / 100);
    const diff = expectedSales - s;

    const amount = Math.abs(diff) * p;
    const status = diff > 0 ? "loss" : "profit";

    setFunnelResult({
      actualConv,
      expectedSales,
      actualSales: s,
      differenceSales: Math.abs(diff),
      amount,
      status,
    });
  };

  const clearAll = () => {
    setInvested("");
    setReturned("");
    setFrom("");
    setTo("");
    setYears("");
    setResult(null);

    setLeads("");
    setActualSales("");
    setProfitPerSale("");
    setExpectedConversion("");
    setFunnelResult(null);
  };

  return (
    <div className="roi-container">
      {/* LEFT */}
      <div className="roi-left">
        <h3>ROI Calculator</h3>

        <label>Amount Invested</label>
        <input value={invested} onChange={(e) => setInvested(e.target.value)} />

        <label>Amount Returned</label>
        <input value={returned} onChange={(e) => setReturned(e.target.value)} />

        <label>Investment Time</label>
        <div className="toggle">
          <button className={mode === "dates" ? "active" : ""} onClick={() => setMode("dates")}>
            Use Dates
          </button>
          <button className={mode === "length" ? "active" : ""} onClick={() => setMode("length")}>
            Use Length
          </button>
        </div>

        {mode === "dates" ? (
          <>
            <label>From</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <label>To</label>
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </>
        ) : (
          <>
            <label>Years</label>
            <input value={years} onChange={(e) => setYears(e.target.value)} />
          </>
        )}<br></br>
        <br></br>
        <h3>Sales Funnel Analysis</h3>

        <label>Leads</label>
        <input value={leads} onChange={(e) => setLeads(e.target.value)} />

        <label>Actual Sales</label>
        <input value={actualSales} onChange={(e) => setActualSales(e.target.value)} />

        <label>Profit per Sale</label>
        <input value={profitPerSale} onChange={(e) => setProfitPerSale(e.target.value)} />

        <label>Expected Conversion (%)</label>
        <input value={expectedConversion} onChange={(e) => setExpectedConversion(e.target.value)} />

        <div className="btns">
          <button className="calc" onClick={calculateROI}>Calculate ROI</button>
          <button className="calc" onClick={calculateFunnel}>Calculate Funnel</button>
          <button className="clear" onClick={clearAll}>Clear</button>
        </div>
      </div>

      {/* RIGHT */}
      <div className="roi-right">
        <div className="result-header">Result</div>

        {result && (
          <>
            <table>
              <tbody>
                <tr>
                  <td>Investment Gain</td>
                  <td className={result.gain >= 0 ? "green" : "red"}>
                    ₹{result.gain.toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td>ROI</td>
                  <td className={result.roi >= 0 ? "green" : "red"}>
                    {result.roi.toFixed(2)}%
                  </td>
                </tr>
                <tr>
                  <td>Annualized ROI</td>
                  <td className={result.annualized >= 0 ? "green" : "red"}>
                    {result.annualized.toFixed(2)}%
                  </td>
                </tr>
              </tbody>
            </table>

            <ROIGraph invested={invested} gain={result.gain} />
          </>
        )}

        {/* FUNNEL SHOW ONLY AFTER ROI + FUNNEL */}
        {result && funnelResult && (
          <>
            <div className="result-header">Funnel Insights</div>
            <table>
              <tbody>
                <tr>
                  <td>Actual Conversion</td>
                  <td>{funnelResult.actualConv.toFixed(2)}%</td>
                </tr>
                <tr>
                  <td>Expected Sales</td>
                  <td>{funnelResult.expectedSales}</td>
                </tr>
                <tr>
                  <td>Actual Sales</td>
                  <td>{funnelResult.actualSales}</td>
                </tr>
                <tr>
                  <td>{funnelResult.status === "loss" ? "Lost Sales" : "Extra Sales"}</td>
                  <td>{funnelResult.differenceSales}</td>
                </tr>
                <tr>
                  <td>{funnelResult.status === "loss" ? "Money Lost" : "Extra Profit"}</td>
                  <td className={funnelResult.status === "loss" ? "red" : "green"}>
                    ₹{funnelResult.amount}
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ROICalculator;
