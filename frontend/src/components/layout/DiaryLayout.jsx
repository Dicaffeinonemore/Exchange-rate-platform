import { Outlet } from "react-router-dom";
import BookmarkTabs from "./BookmarkTabs";

function DiaryLayout() {
  return (
    <main className="app-background">
      <div className="ambient-mark ambient-mark-one" />
      <div className="ambient-mark ambient-mark-two" />
      <section className="diary-shell" aria-label="Exchange Diary">
        <div className="diary-paper">
          <header className="diary-header">
            <a className="brand" href="/exchange" aria-label="Exchange Diary 홈">
              <span className="brand-stamp">ED</span>
              <span>Exchange Diary</span>
            </a>
            <span className="issue-label">VOL. 01 / 2026</span>
          </header>
          <Outlet />
          <footer className="diary-footer">
            <span>keep a record of your world</span>
            <span className="footer-dot" />
            <span>01</span>
          </footer>
        </div>
        <BookmarkTabs />
      </section>
    </main>
  );
}

export default DiaryLayout;
