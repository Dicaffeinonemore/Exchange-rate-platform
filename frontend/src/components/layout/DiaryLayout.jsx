import { Outlet } from "react-router-dom";

function DiaryLayout() {
  return (
    <main className="app-background">
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <section className="diary-shell" aria-label="여행 예산 플래너">
        <header className="topbar"><a className="brand" href="/travel"><span className="brand-mark">W</span><span>Wander Wallet</span></a><span className="top-note">TRAVEL BUDGET PLANNER</span></header>
        <Outlet />
        <footer className="footer"><span>여행의 설렘은 남기고, 예산 걱정은 덜어드려요.</span><span>KRW · USD · EUR · CNY · JPY</span></footer>
      </section>
    </main>
  );
}

export default DiaryLayout;
