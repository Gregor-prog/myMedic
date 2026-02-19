import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, ArrowRight, Download, Home } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';

export default function BookingSuccess() {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                    className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mb-6"
                >
                    <CheckCircle className="w-14 h-14 text-emerald-500" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center max-w-xs">
                    <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Booking Confirmed!</h1>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Your appointment has been successfully booked. You'll receive a confirmation notification shortly.
                    </p>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="w-full max-w-xs mt-8 space-y-3">
                    <button onClick={() => navigate('/patient/dashboard')} className="btn-primary w-full">
                        <Home className="w-5 h-5" /> Go to Dashboard
                    </button>
                    <button onClick={() => navigate('/patient/marketplace')} className="btn-ghost w-full bg-gray-50">
                        Book Another Appointment
                    </button>
                </motion.div>
            </div>
        </PageTransition>
    );
}
