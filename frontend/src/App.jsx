// ─────────────────────────────────────────────────────────────
// MyMedic — App Router & Shell
// ─────────────────────────────────────────────────────────────
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import useStore from './store/useStore';
import ToastContainer from './components/ui/ToastContainer';
import LoadingScreen from './components/ui/LoadingScreen';
import InstallPrompt from './components/pwa/InstallPrompt';
import UpdatePrompt from './components/pwa/UpdatePrompt';
import OfflineIndicator from './components/pwa/OfflineIndicator';

// ── Lazy-loaded Pages ────────────────────────────────────────
// Auth
const Splash = lazy(() => import('./pages/auth/Splash'));
const RoleSelection = lazy(() => import('./pages/auth/RoleSelection'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const OtpVerification = lazy(() => import('./pages/auth/OtpVerification'));
const KycVerification = lazy(() => import('./pages/auth/KycVerification'));

// Patient
const PatientDashboard = lazy(() => import('./pages/patient/Dashboard'));
const Marketplace = lazy(() => import('./pages/patient/Marketplace'));
const DoctorDetail = lazy(() => import('./pages/patient/DoctorDetail'));
const BookingCalendar = lazy(() => import('./pages/patient/BookingCalendar'));
const BookingPayment = lazy(() => import('./pages/patient/BookingPayment'));
const BookingSuccess = lazy(() => import('./pages/patient/BookingSuccess'));
const MedicalRecords = lazy(() => import('./pages/patient/MedicalRecords'));

// Professional
const ProfessionalDashboard = lazy(() => import('./pages/professional/Dashboard'));
const PatientList = lazy(() => import('./pages/professional/PatientList'));
const PatientDetail = lazy(() => import('./pages/professional/PatientDetail'));
const WeeklySchedule = lazy(() => import('./pages/professional/WeeklySchedule'));
const PrescriptionManagement = lazy(() => import('./pages/professional/PrescriptionManagement'));
const Earnings = lazy(() => import('./pages/professional/Earnings'));

// Shared
const ChatDirectory = lazy(() => import('./pages/shared/ChatDirectory'));
const ChatRoom = lazy(() => import('./pages/shared/ChatRoom'));
const Notifications = lazy(() => import('./pages/shared/Notifications'));
const Settings = lazy(() => import('./pages/shared/Settings'));
const NotFound = lazy(() => import('./pages/shared/NotFound'));

// ── Route Guard ──────────────────────────────────────────────
function ProtectedRoute({ children }) {
    const isAuthenticated = useStore(s => s.isAuthenticated);
    if (!isAuthenticated) return <Navigate to="/login" replace />;
    return children;
}

// ── App Component ────────────────────────────────────────────
export default function App() {
    const location = useLocation();

    useEffect(() => {
        useStore.getState().checkAuth();
    }, []);

    return (
        <div className="min-h-screen bg-background-light">
            <Suspense fallback={<LoadingScreen />}>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        {/* Auth Flow */}
                        <Route path="/" element={<Splash />} />
                        <Route path="/role" element={<RoleSelection />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/verify-otp" element={<OtpVerification />} />
                        <Route path="/verify-kyc" element={<KycVerification />} />

                        {/* Patient Routes */}
                        <Route path="/patient/dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
                        <Route path="/patient/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
                        <Route path="/patient/doctor/:id" element={<ProtectedRoute><DoctorDetail /></ProtectedRoute>} />
                        <Route path="/patient/booking/:doctorId" element={<ProtectedRoute><BookingCalendar /></ProtectedRoute>} />
                        <Route path="/patient/booking/payment" element={<ProtectedRoute><BookingPayment /></ProtectedRoute>} />
                        <Route path="/patient/booking/success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />
                        <Route path="/patient/records" element={<ProtectedRoute><MedicalRecords /></ProtectedRoute>} />

                        {/* Professional Routes */}
                        <Route path="/professional/dashboard" element={<ProtectedRoute><ProfessionalDashboard /></ProtectedRoute>} />
                        <Route path="/professional/patients" element={<ProtectedRoute><PatientList /></ProtectedRoute>} />
                        <Route path="/professional/patient/:id" element={<ProtectedRoute><PatientDetail /></ProtectedRoute>} />
                        <Route path="/professional/schedule" element={<ProtectedRoute><WeeklySchedule /></ProtectedRoute>} />
                        <Route path="/professional/prescriptions" element={<ProtectedRoute><PrescriptionManagement /></ProtectedRoute>} />
                        <Route path="/professional/earnings" element={<ProtectedRoute><Earnings /></ProtectedRoute>} />

                        {/* Shared Routes */}
                        <Route path="/chat" element={<ProtectedRoute><ChatDirectory /></ProtectedRoute>} />
                        <Route path="/chat/:threadId" element={<ProtectedRoute><ChatRoom /></ProtectedRoute>} />
                        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />

                        {/* Fallback */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </AnimatePresence>
            </Suspense>

            {/* Global Toast System */}
            <ToastContainer />

            {/* PWA Components */}
            <InstallPrompt />
            <UpdatePrompt />
            <OfflineIndicator />
        </div>
    );
}
