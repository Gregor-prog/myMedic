import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, ArrowRight, Download, Home, Video } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';
import { useEffect, useState } from 'react';
import { bookingService } from '../../services/api';
import useStore from '../../store/useStore';

export default function BookingSuccess() {
    const navigate = useNavigate();
    const location = useLocation();
    const { addToast } = useStore();
    const [calendarData, setCalendarData] = useState(null);
    const [loading, setLoading] = useState(true);

    const booking = location.state?.booking;

    useEffect(() => {
        const fetchCalendar = async () => {
            if (!booking) {
                setLoading(false);
                return;
            }
            try {
                const data = await bookingService.generateIcs({
                    startTime: booking.start_time,
                    endTime: booking.end_time,
                    professionalName: booking.professional_name || "Doctor",
                    patientName: booking.patient_name || "Patient",
                    summary: `Consultation with ${booking.professional_name || "Doctor"}`
                });
                setCalendarData(data);
            } catch (error) {
                console.error("Failed to generate calendar", error);
                addToast({ type: 'error', message: 'Could not generate calendar link.' });
            } finally {
                setLoading(false);
            }
        };

        fetchCalendar();
    }, [booking]);

    const handleDownloadIcs = () => {
        if (!calendarData?.ics_base64) return;
        const link = document.createElement('a');
        link.href = `data:text/calendar;base64,${calendarData.ics_base64}`;
        link.download = `appointment-${Date.now()}.ics`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

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
                    {calendarData?.meet_link && (
                        <a
                            href={calendarData.meet_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
                        >
                            <Video className="w-5 h-5" /> Join Consultation
                        </a>
                    )}

                    {calendarData?.ics_base64 && (
                        <button
                            onClick={handleDownloadIcs}
                            className="btn-secondary w-full border border-gray-200 flex items-center justify-center gap-2 hover:bg-gray-50 bg-white text-slate-700 font-semibold py-3 rounded-xl transition-all"
                        >
                            <Calendar className="w-5 h-5 text-primary" /> Add to Calendar
                        </button>
                    )}

                    <button onClick={() => navigate('/patient/dashboard')} className="btn-ghost w-full bg-gray-50 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-slate-600">
                        <Home className="w-5 h-5" /> Go to Dashboard
                    </button>
                </motion.div>
            </div>
        </PageTransition>
    );
}
