import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Clock, Video, Users } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const HOURS = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

export default function WeeklySchedule() {
    const navigate = useNavigate();
    const { appointments } = useStore();
    const upcoming = appointments.filter(a => a.status === 'upcoming');

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                    <h1 className="text-lg font-bold">Weekly Schedule</h1>
                </header>

                <div className="px-4 py-4">
                    {/* Week Nav */}
                    <div className="flex items-center justify-between mb-4">
                        <button className="p-2 hover:bg-slate-50 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
                        <h3 className="text-base font-bold">Feb 24 — Mar 1, 2026</h3>
                        <button className="p-2 hover:bg-slate-50 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
                    </div>

                    {/* Schedule Grid */}
                    <div className="space-y-3">
                        {DAYS.map(day => {
                            const dayAppts = upcoming.filter((_, i) => i % 6 === DAYS.indexOf(day));
                            return (
                                <div key={day} className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
                                    <div className="bg-gray-50 px-4 py-2 flex items-center justify-between border-b border-gray-100">
                                        <h4 className="text-sm font-bold text-slate-900">{day}</h4>
                                        <span className="text-xs text-slate-400">{dayAppts.length} appointments</span>
                                    </div>
                                    {dayAppts.length === 0 ? (
                                        <div className="px-4 py-6 text-center">
                                            <p className="text-xs text-slate-300">No appointments</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-gray-50">
                                            {dayAppts.slice(0, 2).map(appt => (
                                                <div key={appt.id} className="px-4 py-3 flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                        <Clock className="w-4 h-4 text-primary" />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-slate-900">{appt.time}</p>
                                                        <p className="text-xs text-slate-500 capitalize">{appt.type} • Patient #{appt.patientId.slice(-3)}</p>
                                                    </div>
                                                    <button className="p-2 bg-primary/10 rounded-lg"><Video className="w-4 h-4 text-primary" /></button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
