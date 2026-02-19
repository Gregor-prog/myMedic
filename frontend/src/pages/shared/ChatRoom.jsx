import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Phone, Video, MoreVertical } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function ChatRoom() {
    const { threadId } = useParams();
    const navigate = useNavigate();
    const { chatThreads, sendMessage, currentUser } = useStore();
    const thread = chatThreads.find(t => t.id === threadId);
    const [input, setInput] = useState('');
    const scrollRef = useRef(null);
    const userId = currentUser?.id || 'patient-001';

    useEffect(() => {
        scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
    }, [thread?.messages]);

    if (!thread) return <div className="page flex items-center justify-center"><p className="text-slate-500">Conversation not found.</p></div>;

    const handleSend = () => {
        if (!input.trim()) return;
        sendMessage(threadId, input.trim());
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <PageTransition className="h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold text-xs">{thread.name.split(' ').map(n => n[0]).join('')}</span>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{thread.name}</h3>
                    <p className="text-xs text-emerald-500">{thread.online ? 'Online' : 'Offline'}</p>
                </div>
                <div className="flex gap-1">
                    <button className="p-2 hover:bg-gray-50 rounded-lg"><Phone className="w-5 h-5 text-slate-400" /></button>
                    <button className="p-2 hover:bg-gray-50 rounded-lg"><Video className="w-5 h-5 text-slate-400" /></button>
                </div>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
                {thread.messages.map((msg) => {
                    const isMe = msg.senderId === userId;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isMe
                                    ? 'bg-primary text-white rounded-br-md'
                                    : 'bg-white text-slate-700 shadow-sm border border-gray-100 rounded-bl-md'
                                }`}>
                                {msg.text}
                                <p className={`text-[10px] mt-1 ${isMe ? 'text-white/60' : 'text-slate-400'}`}>
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3 flex-shrink-0 pb-safe">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/20 border-none"
                />
                <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="p-3 bg-primary text-white rounded-full disabled:opacity-40 hover:bg-primary-dark transition-colors flex-shrink-0"
                >
                    <Send className="w-5 h-5" />
                </button>
            </div>
        </PageTransition>
    );
}
