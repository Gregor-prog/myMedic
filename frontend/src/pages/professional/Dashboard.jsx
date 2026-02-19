import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutGrid, Users, Calendar, Settings as SettingsIcon, Bell,
    Stethoscope, TrendingUp, Clock, CheckCircle, XCircle,
    DollarSign, UserPlus, ArrowRight, Video, MessageSquare, FileText,
} from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

const navItems = [
    { icon: LayoutGrid, label: 'Home', path: '/professional/dashboard', active: true },
    { icon: Calendar, label: 'Schedule', path: '/professional/schedule' },
    { icon: Users, label: 'Patients', path: '/professional/patients' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings' },
];

export default function ProfessionalDashboard() {
    const navigate = useNavigate();
    const { currentUser, appointments, getUnreadCount } = useStore();
    const unread = getUnreadCount();
    const todayAppts = appointments.filter(a => a.status === 'upcoming').slice(0, 3);
    const completedToday = appointments.filter(a => a.status === 'completed').length;

    const stats = [
        { icon: Users, label: 'Total Patients', value: '1,284', change: '+12%', color: 'bg-blue-50 text-primary' },
        { icon: CheckCircle, label: 'Completed', value: String(completedToday), change: 'today', color: 'bg-emerald-50 text-emerald-500' },
        { icon: Clock, label: 'Pending', value: String(todayAppts.length), change: 'upcoming', color: 'bg-amber-50 text-amber-500' },
        { icon: DollarSign, label: 'Revenue', value: '₦2.4M', change: '+8%', color: 'bg-purple-50 text-purple-500' },
    ];

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-emerald-100 flex items-center justify-center rounded-lg w-8 h-8">
                            <Stethoscope className="w-4 h-4 text-emerald-600" />
                        </div>
                        <span className="font-bold text-lg">MyMedic <span className="text-xs text-emerald-500 font-medium">Pro</span></span>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => navigate('/notifications')} className="relative w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-slate-500 shadow-sm">
                            <Bell className="w-5 h-5" />
                            {unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
                        </button>
                    </div>
                </header>

                <div className="px-4 py-6 space-y-6">
                    {/* Welcome */}
                    <section>
                        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                            Good morning, Dr. {currentUser?.name?.split(' ').pop() || 'Jennings'}
                        </h2>
                        <p className="text-slate-500 mt-1">You have {todayAppts.length} appointments today.</p>
                    </section>

                    {/* Stats Grid */}
                    <section className="grid grid-cols-2 gap-3">
                        {stats.map((stat) => {
                            const Icon = stat.icon;
                            return (
                                <div key={stat.label} className="bg-white p-4 rounded-2xl shadow-card border border-gray-100">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className={`p-1.5 rounded-lg ${stat.color}`}><Icon className="w-4 h-4" /></span>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</span>
                                    </div>
                                    <p className="text-2xl font-extrabold">{stat.value}</p>
                                    <span className="text-[10px] text-emerald-500 font-medium">{stat.change}</span>
                                </div>
                            );
                        })}
                    </section>

                    {/* Today's Schedule */}
                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-lg font-bold text-slate-900">Today's Schedule</h3>
                            <button onClick={() => navigate('/professional/schedule')} className="text-primary text-sm font-bold">View All</button>
                        </div>
                        <div className="space-y-3">
                            {todayAppts.length === 0 ? (
                                <div className="text-center py-8 bg-white rounded-2xl shadow-card border border-gray-100">
                                    <Calendar className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                                    <p className="text-slate-400 text-sm">No appointments scheduled</p>
                                </div>
                            ) : (
                                todayAppts.map((appt) => (
                                    <div key={appt.id} className="bg-white rounded-xl p-4 shadow-card border border-gray-100 flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Clock className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-bold text-slate-900">Patient #{appt.patientId.slice(-3)}</h4>
                                            <p className="text-xs text-slate-500">{appt.time} • {appt.type}</p>
                                        </div>
                                        <button className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                                            <Video className="w-4 h-4 text-primary" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </section>

                    {/* Quick Actions */}
                    <section>
                        <h3 className="text-lg font-bold text-slate-900 mb-3">Quick Actions</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { icon: FileText, label: 'Prescriptions', path: '/professional/prescriptions' },
                                { icon: MessageSquare, label: 'Messages', path: '/chat' },
                                { icon: TrendingUp, label: 'Earnings', path: '/professional/earnings' },
                            ].map((action) => {
                                const Icon = action.icon;
                                return (
                                    <button
                                        key={action.label}
                                        onClick={() => navigate(action.path)}
                                        className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white shadow-card border border-gray-100 hover:shadow-soft transition group"
                                    >
                                        <span className="p-2 bg-gray-50 rounded-full group-hover:bg-primary/10 transition-colors">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </span>
                                        <span className="text-xs font-bold">{action.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    <div className="h-20" />
                </div>

                {/* Bottom Nav */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-40 pb-safe">
                    <div className="max-w-lg mx-auto flex justify-around items-center py-2">
                        {navItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <button key={item.label} onClick={() => navigate(item.path)} className={`flex flex-col items-center gap-1 p-2 ${item.active ? 'text-primary' : 'text-slate-400'}`}>
                                    <Icon className="w-5 h-5" /><span className="text-[10px] font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
