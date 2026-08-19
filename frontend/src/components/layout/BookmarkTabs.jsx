import { NavLink } from "react-router-dom";

const tabs = [
  { label: "환율", path: "/exchange", icon: "$", color: "coral" },
  { label: "쇼핑", path: "/shopping", icon: "▣", color: "mustard" },
  { label: "여행", path: "/travel", icon: "✦", color: "teal" },
  { label: "주식", path: "/stock", icon: "↗", color: "blue" },
  { label: "MY", path: "/diary", icon: "✎", color: "plum" },
];

function BookmarkTabs() {
  return (
    <nav className="bookmark-tabs" aria-label="주요 메뉴">
      {tabs.map((tab) => (
        <NavLink
          className={({ isActive }) => `bookmark bookmark-${tab.color} ${isActive ? "active" : ""}`}
          key={tab.path}
          to={tab.path}
        >
          <span className="bookmark-icon">{tab.icon}</span>
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default BookmarkTabs;
