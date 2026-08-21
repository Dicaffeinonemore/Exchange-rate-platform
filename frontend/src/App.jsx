import { Navigate, Route, Routes } from "react-router-dom";
import DiaryLayout from "./components/layout/DiaryLayout";
import TravelBudget from "./pages/TravelBudget";

function App() {
  return <Routes><Route element={<DiaryLayout />}><Route path="/" element={<Navigate to="/travel" replace />} /><Route path="/travel" element={<TravelBudget />} /></Route><Route path="*" element={<Navigate to="/travel" replace />} /></Routes>;
}

export default App;
