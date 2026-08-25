import { Routes, Route } from "react-router-dom";
import SplashScreen from "./screens/SplashScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import NewCheckScreen from "./screens/NewCheckScreen";
import ResultsScreen from "./screens/ResultsScreen";
import DocumentChecklistScreen from "./screens/DocumentChecklistScreen";
import PrintableChecklistScreen from "./screens/PrintableChecklistScreen";
import ProfileScreen from "./screens/ProfileScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AuditLogScreen from "./screens/AuditLogScreen";
import StuckScreen from "./screens/StuckScreen";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/welcome" element={<WelcomeScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/new-check" element={<NewCheckScreen />} />
      <Route path="/results" element={<ResultsScreen />} />
      <Route path="/documents" element={<DocumentChecklistScreen />} />
      <Route path="/printable" element={<PrintableChecklistScreen />} />
      <Route path="/profile/:id" element={<ProfileScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="/audit-log" element={<AuditLogScreen />} />
      <Route path="/stuck" element={<StuckScreen />} />
      <Route path="*" element={<SplashScreen />} />
    </Routes>
  );
}
