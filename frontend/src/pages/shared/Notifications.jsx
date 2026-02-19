import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, Calendar, CreditCard, Pill, MessageSquare, CheckCheck, Trash2 } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

const typeIcons = { appointment: Calendar, payment: CreditCard, medication: Pill, message: MessageSquare, system: Bell };
const typeColors = { appointment: 'bg-blue-50 text-blue-500', payment: 'bg-emerald-50 text-emerald-500', medication: 'bg-purple-50 text-purple-500', message: 'bg-amber-50 text-amber-500', system: 'bg-gray-100 text-gray-500' };

export default function Notifications() {
    const navigate = useNavigate();
    const { notifications, markNotificationRead, markAllNotificationsRead, getUnreadCount } = useStore();
    const unread = getUnreadCount();

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3">
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                        <h1 className="text-lg font-bold flex-1">Notifications</h1>
                        {unread > 0 && (
                            <button onClick={markAllNotificationsRead} className="text-primary text-xs font-bold flex items-center gap-1">
                                <CheckCheck className="w-4 h-4" /> Mark all read
                            </button>
                        )}
                    </div>
                </header>

                <div className="divide-y divide-gray-50">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center py-20 text-center px-4">
                            <Bell className="w-12 h-12 text-slate-200 mb-4" />
                            <h3 className="text-lg font-bold text-slate-700">All Caught Up!</h3>
                            <p className="text-sm text-slate-400 mt-1">No new notifications</p>
                        </div>
                    ) : (
                        notifications.map((notif, i) => {
                            const Icon = typeIcons[notif.type] || Bell;
                            const color = typeColors[notif.type] || typeColors.system;
                            return (
                                <motion.div
                                    key={notif.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    onClick={() => markNotificationRead(notif.id)}
                                    className={`flex items-start gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-primary/[0.02]' : ''}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className={`text-sm font-bold truncate ${!notif.read ? 'text-slate-900' : 'text-slate-600'}`}>{notif.title}</h4>
                                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{notif.message}</p>
                                        <p className="text-[10px] text-slate-400 mt-1">{notif.time}</p>
                                    </div>
                                    {!notif.read && <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />}
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </PageTransition>
    );
}
