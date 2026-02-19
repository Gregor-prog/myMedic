import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutGrid, Users, FileText, CreditCard, Settings, Bell, Search,
    Stethoscope, Calendar, Clock, CheckCircle, Heart, Droplets,
    Thermometer, PlusCircle, Pill, FlaskConical, MessageSquare,
    History, ArrowRight, Video, ShoppingBag, ChevronRight,
} from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

const navItems = [
    { icon: LayoutGrid, label: 'Home', path: '/patient/dashboard', active: true },
    { icon: Calendar, label: 'Schedule', path: '/patient/marketplace' },
    { icon: FileText, label: 'Records', path: '/patient/records' },
    { icon: Users, label: 'Profile', path: '/settings' },
];

export default function PatientDashboard() {
    const navigate = useNavigate();
    const { currentUser, doctors, appointments, vitals, getUnreadCount } = useStore();
    const upcoming = appointments.filter(a => a.status === 'upcoming');
    const nextAppt = upcoming[0];
    const nextDoc = nextAppt ? doctors.find(d => d.id === nextAppt.doctorId) : null;
    const unread = getUnreadCount();

    return (
        <PageTransition>
            <div className="page">
                {/* Mobile Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 flex items-center justify-center rounded-lg w-8 h-8">
                            <Stethoscope className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-bold text-lg">MyMedic</span>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => navigate('/notifications')} className="relative w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-500 hover:text-primary transition shadow-sm">
                            <Bell className="w-5 h-5" />
                            {unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
                        </button>
                        <button onClick={() => navigate('/patient/marketplace')} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-500 hover:text-primary transition shadow-sm">
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                </header>

                <div className="px-4 py-6 space-y-6">
                    {/* Welcome */}
                    <section>
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                            Good morning, {currentUser?.name?.split(' ')[0] || 'Alexander'}
                        </h2>
                        <p className="text-slate-500 mt-1">Your health journey continues here.</p>
                    </section>

                    {/* Hero CTA */}
                    <section className="relative overflow-hidden rounded-2xl bg-white shadow-card border border-gray-100 p-6">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-light/50 to-transparent pointer-events-none" />
                        <div className="relative z-10">
                            <div className="badge-primary mb-3 w-fit">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                Quarterly Check-up
                            </div>
                            <h3 className="text-xl font-bold leading-tight text-slate-900 mb-2">
                                Your health is our priority.
                            </h3>
                            <p className="text-slate-500 text-sm mb-5 leading-relaxed">
                                Schedule your comprehensive quarterly check-up with our specialists today.
                            </p>
                            <button onClick={() => navigate('/patient/marketplace')} className="btn-primary text-sm py-3 px-5">
                                Book Appointment <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </section>

                    {/* Upcoming Appointment */}
                    {nextAppt && nextDoc && (
                        <section>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-lg font-bold text-slate-900">Upcoming Appointment</h3>
                                <Link to="/patient/marketplace" className="text-primary text-sm font-bold">View All</Link>
                            </div>
                            <div className="bg-white rounded-2xl p-4 shadow-card border border-gray-100">
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <Stethoscope className="w-7 h-7 text-primary" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-wrap gap-2 mb-1.5 text-xs text-slate-500">
                                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg">
                                                <Calendar className="w-3 h-3" /> {nextAppt.date}
                                            </span>
                                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-lg">
                                                <Clock className="w-3 h-3" /> {nextAppt.time}
                                            </span>
                                        </div>
                                        <h4 className="text-base font-bold text-slate-900">{nextDoc.name}</h4>
                                        <p className="text-primary text-sm font-medium">{nextDoc.specialty}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                                    <button className="flex-1 btn-secondary text-sm py-2.5">
                                        <Video className="w-4 h-4" /> Start Call
                                    </button>
                                    <button
                                        onClick={() => navigate(`/patient/doctor/${nextDoc.id}`)}
                                        className="flex-1 btn-ghost text-sm py-2.5 bg-gray-50"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}

                    {/* Quick Vitals */}
                    <section>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white p-4 rounded-2xl shadow-card border border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="p-1.5 rounded-lg bg-red-50"><Heart className="w-4 h-4 text-red-500" /></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Heart Rate</span>
                                </div>
                                <p className="text-2xl font-extrabold">{vitals.heartRate.value} <span className="text-xs font-medium text-slate-400">{vitals.heartRate.unit}</span></p>
                                <p className="text-[10px] text-green-500 font-medium mt-1 flex items-center gap-0.5">
                                    <CheckCircle className="w-3 h-3" /> Normal
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-card border border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="p-1.5 rounded-lg bg-blue-50"><Droplets className="w-4 h-4 text-blue-500" /></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Blood Pressure</span>
                                </div>
                                <p className="text-2xl font-extrabold">{vitals.bloodPressure.value}</p>
                                <p className="text-[10px] text-green-500 font-medium mt-1 flex items-center gap-0.5">
                                    <CheckCircle className="w-3 h-3" /> Optimal
                                </p>
                            </div>
                            <div className="bg-white p-4 rounded-2xl shadow-card border border-gray-100">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="p-1.5 rounded-lg bg-orange-50"><Thermometer className="w-4 h-4 text-orange-500" /></span>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase">Temp</span>
                                </div>
                                <p className="text-2xl font-extrabold">{vitals.temperature.value} <span className="text-xs font-medium text-slate-400">{vitals.temperature.unit}</span></p>
                                <p className="text-[10px] text-slate-400 font-medium mt-1">Last: 2 days ago</p>
                            </div>
                            <button
                                onClick={() => { }}
                                className="bg-white p-4 rounded-2xl shadow-card border border-gray-100 flex flex-col items-center justify-center gap-1 hover:bg-gray-50 transition"
                            >
                                <PlusCircle className="w-7 h-7 text-primary" />
                                <span className="text-xs font-bold text-primary">Log Vitals</span>
                            </button>
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { icon: Pill, label: 'Refill Rx', path: '/patient/records' },
                                { icon: FlaskConical, label: 'Lab Results', path: '/patient/records' },
                                { icon: MessageSquare, label: 'Chat', path: '/chat' },
                                { icon: ShoppingBag, label: 'Market', path: '/patient/marketplace' },
                            ].map((action) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={action.label}
                                        onClick={() => navigate(action.path)}
                                        className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white shadow-card border border-gray-100 hover:bg-primary-light hover:text-primary transition-colors group"
                                    >
                                        <span className="bg-gray-50 group-hover:bg-white p-2 rounded-full shadow-sm">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </span>
                                        <span className="text-[10px] font-bold">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>

                {/* Bottom Navigation */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 pb-safe">
                    <div className="max-w-lg mx-auto flex justify-around items-center py-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => navigate(item.path)}
                                    className={`flex flex-col items-center gap-1 p-2 ${item.active ? 'text-primary' : 'text-slate-400'}`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
