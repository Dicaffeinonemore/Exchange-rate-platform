import { Navigate, Route, Routes } from "react-router-dom";
import DiaryLayout from "./components/layout/DiaryLayout";
import ExchangePage from "./pages/ExchangePage";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <Routes>
      <Route element={<DiaryLayout />}>
        <Route path="/" element={<ExchangePage />} />
        <Route path="/exchange" element={<ExchangePage />} />
        <Route path="/shopping" element={<PlaceholderPage title="해외 쇼핑" eyebrow="SHOPPING" description="해외 상품의 가격과 배송비를 한눈에 비교하는 공간입니다." />} />
        <Route path="/travel" element={<PlaceholderPage title="여행 경비" eyebrow="TRAVEL" description="여행지의 환율과 예산을 기록하는 페이지를 준비하고 있습니다." />} />
        <Route path="/stock" element={<PlaceholderPage title="해외 주식" eyebrow="STOCK" description="환율을 반영한 해외주식 수익을 계산하는 공간입니다." />} />
        <Route path="/diary" element={<PlaceholderPage title="MY DIARY" eyebrow="NOTES" description="나의 환율 메모와 소비 기록을 모아보는 페이지입니다." />} />
      </Route>
      <Route path="*" element={<Navigate to="/exchange" replace />} />
    </Routes>
  );
}

export default App;
