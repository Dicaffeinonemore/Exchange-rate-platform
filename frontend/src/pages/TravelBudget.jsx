import { useMemo, useState } from "react";

const currencies = {
  JPY: { name: "일본 엔", symbol: "¥", flag: "🇯🇵", rate: 9.42, locale: "ja-JP" },
  USD: { name: "미국 달러", symbol: "$", flag: "🇺🇸", rate: 1380, locale: "en-US" },
  EUR: { name: "유로", symbol: "€", flag: "🇪🇺", rate: 1595, locale: "de-DE" },
  CNY: { name: "중국 위안", symbol: "¥", flag: "🇨🇳", rate: 191, locale: "zh-CN" },
};
const destinations = {
  도쿄: { country: "일본", currency: "JPY", icon: "🗼", daily: [115000, 195000, 335000] },
  오사카: { country: "일본", currency: "JPY", icon: "🏯", daily: [105000, 180000, 305000] },
  뉴욕: { country: "미국", currency: "USD", icon: "🗽", daily: [180000, 310000, 510000] },
  파리: { country: "프랑스", currency: "EUR", icon: "🥐", daily: [165000, 280000, 450000] },
  상하이: { country: "중국", currency: "CNY", icon: "🌃", daily: [85000, 150000, 260000] },
};
const styles = ["절약형", "일반형", "여유형"];
const formatKrw = (value) => `${Math.max(0, Math.round(value)).toLocaleString("ko-KR")}원`;

function NumberField({ label, value, onChange, suffix, min = 0 }) {
  return <label className="field"><span>{label}</span><div className="input-wrap"><input type="number" min={min} value={value} onChange={(e) => onChange(Number(e.target.value))} /><b>{suffix}</b></div></label>;
}

function TravelBudget() {
  const [city, setCity] = useState("도쿄");
  const [days, setDays] = useState(5);
  const [people, setPeople] = useState(2);
  const [travelStyle, setTravelStyle] = useState(1);
  const [maxBudget, setMaxBudget] = useState(2000000);
  const [flightCost, setFlightCost] = useState(600000);
  const [foreignAmount, setForeignAmount] = useState(50000);
  const destination = destinations[city];
  const currency = currencies[destination.currency];
  const available = Math.max(0, maxBudget - flightCost);
  const availableForeign = available / currency.rate;
  const requiredKrw = foreignAmount * currency.rate;
  const recommendation = useMemo(() => {
    const total = destination.daily[travelStyle] * days * people;
    return { total, stay: total * .38, food: total * .25, transport: total * .12, activity: total * .15, reserve: total * .1 };
  }, [destination, days, people, travelStyle]);
  const gap = available - recommendation.total;
  const changeCity = (next) => { setCity(next); setForeignAmount(["도쿄", "오사카"].includes(next) ? 50000 : 500); };

  return <div className="travel-page">
    <section className="hero"><div><p className="eyebrow">PLAN LIGHT, TRAVEL FAR</p><h1>여행의 시작은<br /><em>좋은 예산</em>부터.</h1><p className="hero-copy">항공권을 빼고 실제로 쓸 수 있는 돈부터<br />현지 추천 예산까지 한눈에 계산해 보세요.</p></div><div className="passport-stamp"><span>READY</span><b>✈</b><small>TO GO</small></div></section>
    <div className="main-grid">
      <section className="card setup-card">
        <div className="card-title"><span className="step">01</span><div><p>YOUR TRIP</p><h2>어디로 떠나시나요?</h2></div></div>
        <label className="field"><span>여행지</span><div className="select-wrap"><span className="destination-icon">{destination.icon}</span><select value={city} onChange={(e) => changeCity(e.target.value)}>{Object.entries(destinations).map(([name, item]) => <option key={name} value={name}>{item.country} · {name}</option>)}</select></div></label>
        <div className="two-columns"><NumberField label="여행 기간" value={days} min={1} onChange={setDays} suffix="일" /><NumberField label="여행 인원" value={people} min={1} onChange={setPeople} suffix="명" /></div>
        <div className="field"><span>여행 스타일</span><div className="style-tabs">{styles.map((item, i) => <button type="button" className={travelStyle === i ? "active" : ""} onClick={() => setTravelStyle(i)} key={item}>{["🎒", "📷", "✨"][i]} {item}</button>)}</div></div>
      </section>
      <section className="card budget-card">
        <div className="card-title"><span className="step">02</span><div><p>MY BUDGET</p><h2>얼마까지 생각하세요?</h2></div></div>
        <NumberField label="최대 여행 예산" value={maxBudget} onChange={setMaxBudget} suffix="원" /><NumberField label="항공권 총 금액" value={flightCost} onChange={setFlightCost} suffix="원" />
        <div className="budget-result"><div><span>현지에서 쓸 수 있는 돈</span><strong>{formatKrw(available)}</strong></div><div className="equals">=</div><div className="foreign-result"><span>{currency.flag} {currency.name}</span><strong>{currency.symbol}{Math.floor(availableForeign).toLocaleString(currency.locale)}</strong></div></div>
        {flightCost > maxBudget && <p className="warning">항공권이 최대 예산보다 커요. 예산을 다시 확인해 주세요.</p>}
      </section>
    </div>
    <section className="converter"><div><p className="eyebrow">QUICK CONVERTER</p><h2>이만큼 환전하려면?</h2><p>원하는 외화 금액을 입력하면 필요한 원화를 바로 알려드려요.</p></div><div className="converter-box"><div className="currency-label"><span>{currency.flag}</span><b>{currency.name}</b><small>{destination.currency}</small></div><div className="converter-input"><input type="number" min="0" value={foreignAmount} onChange={(e) => setForeignAmount(Number(e.target.value))} /><b>{destination.currency}</b></div><span className="conversion-arrow">→</span><div className="needed"><span>필요한 원화</span><strong>{formatKrw(requiredKrw)}</strong><small>1 {destination.currency} = {currency.rate.toLocaleString()}원 기준</small></div></div></section>
    <section className="recommend-card">
      <div className="recommend-head"><div><p className="eyebrow">SMART BUDGET GUIDE</p><h2><span>✦</span> 맞춤 여행 예산 추천</h2></div><span className="trip-summary">{city} · {days}일 · {people}명 · {styles[travelStyle]}</span></div>
      <div className="recommend-body"><div className="breakdown">{[['🏨','숙박',recommendation.stay],['🍜','식비',recommendation.food],['🚇','교통',recommendation.transport],['🎟️','관광',recommendation.activity],['🛟','예비비',recommendation.reserve]].map(([icon,label,value]) => <div className="breakdown-row" key={label}><span>{icon} {label}</span><i style={{width: `${value / recommendation.total * 210}%`}} /><b>{formatKrw(value)}</b></div>)}</div><div className="recommend-total"><span>추천 현지 예산</span><strong>{formatKrw(recommendation.total)}</strong><small>항공권 제외 · 현재 설정 기준</small></div></div>
      <div className={`advice ${gap >= 0 ? "enough" : "short"}`}><span>{gap >= 0 ? "✓" : "!"}</span><p><b>{gap >= 0 ? "여유 있는 예산이에요" : "조금 조정하면 좋아요"}</b><br />{gap >= 0 ? `추천 예산보다 ${formatKrw(gap)} 여유 있어요. 쇼핑이나 특별한 식사를 위한 금액으로 남겨두세요.` : `추천 예산보다 ${formatKrw(Math.abs(gap))} 부족해요. 숙박 등급이나 관광 일정을 조정해 보세요.`}</p></div>
    </section>
  </div>;
}

export default TravelBudget;
