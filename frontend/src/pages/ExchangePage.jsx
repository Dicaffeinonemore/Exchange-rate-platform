import { useEffect, useState } from "react";
import ExchangeCalculator from "../components/exchange/ExchangeCalculator";

const fallbackRate = 1380;

function ExchangePage() {
  const [rate, setRate] = useState(fallbackRate);
  const [source, setSource] = useState("demo");

  useEffect(() => {
    fetch("http://localhost:5000/api/exchange")
      .then((response) => {
        if (!response.ok) throw new Error("Exchange API unavailable");
        return response.json();
      })
      .then((data) => {
        setRate(data.rate);
        setSource(data.source ?? "api");
      })
      .catch(() => setSource("demo"));
  }, []);

  return (
    <div className="exchange-page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">WEDNESDAY / AUGUST 19, 2026</p>
          <h1>오늘의 환율<span>.</span></h1>
          <p className="intro-copy">낯선 나라의 가격도<br />나만의 감각으로 기록해요.</p>
        </div>
        <div className="sun-mark" aria-hidden="true"><span>today</span></div>
      </div>

      <section className="rate-card" aria-label="현재 USD KRW 환율">
        <div className="rate-card-top"><span className="flag">US</span><span>USD / KRW</span><span className="live-dot" /> <small>{source === "api" ? "LIVE" : "MVP RATE"}</small></div>
        <div className="rate-value"><span>1 USD</span><strong>₩ {rate.toLocaleString()}</strong></div>
        <div className="rate-card-bottom"><span>기준 통화 미국 달러</span><span>+0.24% <b>↗</b></span></div>
      </section>

      <ExchangeCalculator rate={rate} />
    </div>
  );
}

export default ExchangePage;
