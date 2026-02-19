// ─────────────────────────────────────────────────────────────
// PWA Install Prompt Component
// Captures the beforeinstallprompt event and shows a custom UI
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, X, Stethoscope, Smartphone, Wifi, BatteryCharging } from 'lucide-react';

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isInstalled, setIsInstalled] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia('(display-mode: standalone)').matches) {
            setIsInstalled(true);
            return;
        }

        const handler = (e) => {
            // Prevent Chrome's default install banner
            e.preventDefault();
            setDeferredPrompt(e);

            // Show custom prompt after a short delay (let user explore first)
            const dismissed = localStorage.getItem('mymedic-install-dismissed');
            const dismissedAt = dismissed ? parseInt(dismissed, 10) : 0;
            const daysSinceDismissed = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);

            // Show prompt if never dismissed, or dismissed > 7 days ago
            if (!dismissed || daysSinceDismissed > 7) {
                setTimeout(() => setShowPrompt(true), 5000); // 5s delay
            }
        };

        window.addEventListener('beforeinstallprompt', handler);

        // Listen for successful installation
        window.addEventListener('appinstalled', () => {
            setIsInstalled(true);
            setShowPrompt(false);
            setDeferredPrompt(null);
        });

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setIsInstalled(true);
        }

        setDeferredPrompt(null);
        setShowPrompt(false);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        localStorage.setItem('mymedic-install-dismissed', String(Date.now()));
    };

    if (isInstalled) return null;

    return (
        <AnimatePresence>
            {showPrompt && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleDismiss}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120]"
                    />

                    {/* Bottom Sheet */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 z-[130] bg-white rounded-t-3xl shadow-2xl overflow-hidden"
                    >
                        {/* Handle bar */}
                        <div className="flex justify-center pt-3 pb-1">
                            <div className="w-10 h-1.5 rounded-full bg-slate-200" />
                        </div>

                        <div className="px-6 pb-8 pt-2">
                            {/* Close button */}
                            <button
                                onClick={handleDismiss}
                                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-slate-400" />
                            </button>

                            {/* Header */}
                            <div className="flex flex-col items-center text-center mb-6">
                                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                                    <Stethoscope className="w-8 h-8 text-primary" />
                                </div>
                                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                                    Install MyMedic
                                </h2>
                                <p className="text-sm text-slate-500 mt-1 max-w-xs">
                                    Get the full app experience on your home screen
                                </p>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3 mb-6">
                                {[
                                    { icon: Smartphone, text: 'Access from your home screen instantly' },
                                    { icon: Wifi, text: 'Works offline — view records anytime' },
                                    { icon: BatteryCharging, text: 'Faster loading & less battery usage' },
                                ].map((benefit, i) => {
                                    const Icon = benefit.icon;
                                    return (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <p className="text-sm font-medium text-slate-700">{benefit.text}</p>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleInstall}
                                    className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold rounded-xl py-3.5 hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm"
                                >
                                    <Download className="w-5 h-5" />
                                    Install App
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="w-full text-sm font-medium text-slate-400 py-2 hover:text-slate-600 transition-colors"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
