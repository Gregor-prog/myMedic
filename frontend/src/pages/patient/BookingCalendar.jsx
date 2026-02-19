import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import useStore from '../../store/useStore';
import { timeSlots } from '../../data/mockData';
import PageTransition from '../../components/ui/PageTransition';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export default function BookingCalendar() {
    const { doctorId } = useParams();
    const navigate = useNavigate();
    const { getDoctorById, setBookingDraft, addToast } = useStore();
    const doc = getDoctorById(doctorId);

    const today = new Date();
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);

    if (!doc) return <div className="page flex items-center justify-center"><p>Doctor not found.</p></div>;

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();
    const calendarDays = [];
    for (let i = 0; i < firstDayOfWeek; i++) calendarDays.push(null);
    for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);

    const isDateValid = (day) => {
        if (!day) return false;
        const date = new Date(currentYear, currentMonth, day);
        const dayName = DAYS[date.getDay()];
        return date >= today && doc.availability.includes(dayName);
    };

    const prevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
        else setCurrentMonth(m => m - 1);
    };

    const nextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
        else setCurrentMonth(m => m + 1);
    };

    const handleContinue = () => {
        if (!selectedDate || !selectedTime) {
            addToast({ type: 'error', message: 'Please select both date and time.' });
            return;
        }
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`;
        setBookingDraft({
            doctorId: doc.id,
            patientId: 'patient-001',
            date: dateStr,
            time: selectedTime,
            type: 'consultation',
            notes: '',
            fee: doc.fee,
        });
        navigate('/patient/booking/payment');
    };

    return (
        <PageTransition>
            <div className="page pb-32">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <div>
                        <h1 className="text-lg font-bold">Book Appointment</h1>
                        <p className="text-xs text-slate-500">{doc.name} — {doc.specialty}</p>
                    </div>
                </header>

                <div className="px-4 py-6 space-y-6">
                    {/* Calendar */}
                    <section className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={prevMonth} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                <ChevronLeft className="w-5 h-5 text-slate-600" />
                            </button>
                            <h3 className="text-base font-bold">{MONTHS[currentMonth]} {currentYear}</h3>
                            <button onClick={nextMonth} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                                <ChevronRight className="w-5 h-5 text-slate-600" />
                            </button>
                        </div>

                        {/* Day Headers */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                            {DAYS.map(d => (
                                <div key={d} className="text-center text-[10px] font-bold text-slate-400 uppercase py-1">{d}</div>
                            ))}
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1">
                            {calendarDays.map((day, i) => {
                                const valid = isDateValid(day);
                                const isSelected = day === selectedDate;
                                const isToday = day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                                return (
                                    <button
                                        key={i}
                                        disabled={!valid}
                                        onClick={() => valid && setSelectedDate(day)}
                                        className={`aspect-square rounded-xl flex items-center justify-center text-sm font-semibold transition-all
                      ${!day ? '' : ''}
                      ${!valid && day ? 'text-slate-200 cursor-not-allowed' : ''}
                      ${valid && !isSelected ? 'text-slate-700 hover:bg-primary/10' : ''}
                      ${isSelected ? 'bg-primary text-white shadow-sm' : ''}
                      ${isToday && !isSelected ? 'ring-2 ring-primary/30' : ''}
                    `}
                                    >
                                        {day}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Time Slots */}
                    {selectedDate && (
                        <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                            <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" /> Available Times
                            </h3>
                            <div className="grid grid-cols-3 gap-2">
                                {timeSlots.map((slot) => (
                                    <button
                                        key={slot}
                                        onClick={() => setSelectedTime(slot)}
                                        className={`py-3 rounded-xl text-sm font-semibold transition-all ${selectedTime === slot
                                                ? 'bg-primary text-white shadow-sm'
                                                : 'bg-white border border-gray-200 text-slate-700 hover:border-primary/40'
                                            }`}
                                    >
                                        {slot}
                                    </button>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </div>

                {/* Bottom CTA */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40">
                    <div className="max-w-lg mx-auto">
                        <div className="flex justify-between text-sm mb-3">
                            <span className="text-slate-500">Consultation Fee</span>
                            <span className="font-bold text-slate-900">{doc.currency}{doc.fee.toLocaleString()}</span>
                        </div>
                        <button
                            onClick={handleContinue}
                            disabled={!selectedDate || !selectedTime}
                            className="btn-primary w-full disabled:opacity-40"
                        >
                            Continue to Payment <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
