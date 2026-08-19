import { useState } from "react";

function ExchangeCalculator({ rate }) {
  const [amount, setAmount] = useState("100");
  const [result, setResult] = useState(138000);

  const calculate = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);
    setResult(Number.isFinite(numericAmount) ? numericAmount * rate : 0);
  };

  return (
    <form className="calculator" onSubmit={calculate}>
      <div className="section-kicker">QUICK CALCULATOR</div>
      <div className="calculator-heading">
        <h2>환율 계산기</h2>
        <span className="calculator-arrow">↘</span>
      </div>
      <div className="amount-row">
        <label className="sr-only" htmlFor="usd-amount">USD 금액</label>
        <input id="usd-amount" min="0" onChange={(event) => setAmount(event.target.value)} type="number" value={amount} />
        <span>USD</span>
      </div>
      <div className="conversion-line"><span /> <b>1 USD = {rate.toLocaleString()} KRW</b> <span /></div>
      <div className="result-row">
        <span>받는 금액</span>
        <strong>₩ {Math.round(result).toLocaleString()}</strong>
      </div>
      <button className="primary-button" type="submit">계산하기 <span>→</span></button>
    </form>
  );
}

export default ExchangeCalculator;
