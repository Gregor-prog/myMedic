import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, MessageSquare } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function ChatDirectory() {
    const navigate = useNavigate();
    const { chatThreads } = useStore();

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3 mb-3">
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                        <h1 className="text-lg font-bold">Messages</h1>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder="Search conversations..." className="input-field input-with-icon" />
                    </div>
                </header>

                <div className="divide-y divide-gray-50">
                    {chatThreads.map((thread, i) => (
                        <motion.button
                            key={thread.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => navigate(`/chat/${thread.id}`)}
                            className="w-full flex items-center gap-3 px-4 py-4 hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                    <span className="text-primary font-bold text-sm">{thread.name.split(' ').map(n => n[0]).join('')}</span>
                                </div>
                                {thread.online && (
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <h4 className="text-sm font-bold text-slate-900 truncate">{thread.name}</h4>
                                    <span className="text-[10px] text-slate-400 flex-shrink-0">{new Date(thread.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                                <p className="text-xs text-slate-500 truncate">{thread.lastMessage}</p>
                            </div>
                            {thread.unreadCount > 0 && (
                                <span className="w-5 h-5 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center flex-shrink-0">{thread.unreadCount}</span>
                            )}
                        </motion.button>
                    ))}
                </div>

                {chatThreads.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
                        <MessageSquare className="w-12 h-12 text-slate-200 mb-4" />
                        <h3 className="text-lg font-bold text-slate-700">No Messages</h3>
                        <p className="text-sm text-slate-400 mt-1">Start a conversation with your healthcare provider</p>
                    </div>
                )}
            </div>
        </PageTransition>
    );
}
