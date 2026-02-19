import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Stethoscope, Shield } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';

export default function Splash() {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => navigate('/role'), 2500);
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] -translate-y-1/4 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] translate-y-1/4 -translate-x-1/4" />

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex flex-col items-center justify-center relative z-10"
                >
                    <div className="mb-6 p-5 rounded-3xl bg-primary/5 shadow-sm">
                        <Stethoscope className="w-16 h-16 text-primary" strokeWidth={1.5} />
                    </div>

                    <h1 className="text-primary tracking-tight text-4xl font-extrabold leading-tight text-center mb-4">
                        MyMedic
                    </h1>

                    <div className="max-w-xs mx-auto">
                        <p className="text-slate-500 font-light text-sm leading-relaxed text-center tracking-wide">
                            Excellence in Private Healthcare.<br />
                            <span className="font-medium text-slate-800">Discreet. Secure. Professional.</span>
                        </p>
                    </div>
                </motion.div>

                {/* Loading bar */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-16 w-48"
                >
                    <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2, ease: 'easeInOut' }}
                            className="h-full bg-primary rounded-full"
                        />
                    </div>
                </motion.div>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary-light/30 via-primary-50/10 to-transparent pointer-events-none" />

                {/* Decorative icons */}
                <div className="absolute top-12 right-12 opacity-5 pointer-events-none">
                    <Shield className="w-24 h-24 text-primary rotate-12" />
                </div>
            </div>
        </PageTransition>
    );
}
