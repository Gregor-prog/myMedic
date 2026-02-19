import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Shield, Palette, Globe, HelpCircle, LogOut, ChevronRight, Moon } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

const sections = [
    {
        title: 'Account',
        items: [
            { icon: User, label: 'Personal Information', sub: 'Name, email, phone' },
            { icon: Bell, label: 'Notifications', sub: 'Push, email, SMS' },
            { icon: Shield, label: 'Privacy & Security', sub: 'Password, 2FA, biometrics' },
        ],
    },
    {
        title: 'Preferences',
        items: [
            { icon: Palette, label: 'Appearance', sub: 'Theme, font size' },
            { icon: Globe, label: 'Language', sub: 'English (US)' },
            { icon: Moon, label: 'Dark Mode', sub: 'Off', toggle: true },
        ],
    },
    {
        title: 'Support',
        items: [
            { icon: HelpCircle, label: 'Help & FAQ', sub: 'Common questions' },
        ],
    },
];

export default function Settings() {
    const navigate = useNavigate();
    const { logout, currentUser, addToast } = useStore();

    const handleLogout = () => {
        logout();
        addToast({ type: 'info', message: 'Logged out successfully' });
        navigate('/');
    };

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                    <h1 className="text-lg font-bold">Settings</h1>
                </header>

                <div className="px-4 py-6 space-y-6">
                    {/* Profile Summary */}
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-card border border-gray-100">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-bold text-lg">{currentUser?.name?.split(' ').map(n => n[0]).join('') || 'AM'}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-slate-900">{currentUser?.name || 'Alexander Mitchell'}</h3>
                            <p className="text-sm text-slate-500">{currentUser?.email || 'alexander@example.com'}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300" />
                    </div>

                    {/* Setting Sections */}
                    {sections.map(section => (
                        <div key={section.title}>
                            <h3 className="text-xs font-bold text-slate-400 uppercase mb-2 px-1">{section.title}</h3>
                            <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden divide-y divide-gray-50">
                                {section.items.map(item => {
                                    const Icon = item.icon;
                                    return (
                                        <button key={item.label} className="w-full flex items-center gap-4 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors">
                                            <div className="p-2 bg-gray-50 rounded-lg"><Icon className="w-5 h-5 text-slate-500" /></div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-900">{item.label}</p>
                                                <p className="text-xs text-slate-400">{item.sub}</p>
                                            </div>
                                            {item.toggle ? (
                                                <div className="w-11 h-6 bg-gray-200 rounded-full relative cursor-pointer">
                                                    <div className="w-5 h-5 bg-white rounded-full shadow-sm absolute top-0.5 left-0.5 transition-transform" />
                                                </div>
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-slate-300" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}

                    {/* Logout */}
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-100 bg-red-50 text-red-600 font-bold text-sm hover:bg-red-100 transition-colors">
                        <LogOut className="w-5 h-5" /> Sign Out
                    </button>

                    <p className="text-center text-xs text-slate-400">MyMedic v1.0.0 • Build 2026.02.24</p>
                </div>
            </div>
        </PageTransition>
    );
}
