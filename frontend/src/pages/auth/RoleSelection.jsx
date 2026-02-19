import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Briefcase, ArrowRight, Stethoscope } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

const roles = [
    {
        id: 'patient',
        title: 'I\'m a Patient',
        description: 'Book appointments, manage health records, and connect with top specialists.',
        icon: User,
        color: 'bg-blue-50 text-primary',
    },
    {
        id: 'professional',
        title: 'I\'m a Professional',
        description: 'Manage your practice, schedule appointments, and care for your patients.',
        icon: Briefcase,
        color: 'bg-emerald-50 text-emerald-600',
    },
];

export default function RoleSelection() {
    const navigate = useNavigate();
    const setUserRole = useStore(s => s.setUserRole);

    const handleSelect = (role) => {
        setUserRole(role);
        navigate('/login');
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-white px-6 py-12 relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] -translate-y-1/3 translate-x-1/3" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-12">
                    <div className="bg-primary/10 flex items-center justify-center rounded-xl w-10 h-10">
                        <Stethoscope className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-lg font-bold tracking-tight">MyMedic</span>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
                            How will you use<br />MyMedic?
                        </h1>
                        <p className="text-slate-500 text-base mb-10">
                            Select your role to get started with a personalized experience.
                        </p>
                    </motion.div>

                    <div className="flex flex-col gap-4">
                        {roles.map((role, index) => {
                            const Icon = role.icon;
                            return (
                                <motion.button
                                    key={role.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    onClick={() => handleSelect(role.id)}
                                    className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-white hover:border-primary/30 hover:shadow-glow transition-all duration-300 group text-left"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${role.color} flex-shrink-0`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-bold text-slate-900 mb-1">{role.title}</h3>
                                        <p className="text-sm text-slate-500 leading-snug">{role.description}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-xs text-slate-400 mt-8">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </PageTransition>
    );
}
