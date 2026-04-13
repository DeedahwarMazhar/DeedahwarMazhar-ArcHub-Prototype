import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { MainLayout } from './components/MainLayout';
import { Login } from './screens/Login';
import { SatelliteConfiguration } from './screens/SatelliteConfiguration';
import { Dashboard } from './screens/Dashboard';
import { AlertDetail } from './screens/AlertDetail';
import { SubsystemMap } from './screens/SubsystemMap';
import { IncidentLog } from './screens/IncidentLog';
import { OperatorFeedback } from './screens/OperatorFeedback';
import { Settings } from './screens/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login - no layout */}
        <Route path="/" element={<Login />} />

        {/* Onboarding - no layout */}
        <Route path="/onboarding" element={<SatelliteConfiguration />} />

        {/* Main app routes - with layout */}
        <Route path="/dashboard" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/alert/:id" element={<MainLayout><AlertDetail /></MainLayout>} />
        <Route path="/alerts" element={<MainLayout><Dashboard /></MainLayout>} />
        <Route path="/subsystem-map" element={<MainLayout><SubsystemMap /></MainLayout>} />
        <Route path="/incident-log" element={<MainLayout><IncidentLog /></MainLayout>} />
        <Route path="/feedback" element={<MainLayout><OperatorFeedback /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
