// ─────────────────────────────────────────────────────────────
// PWA Update Prompt Component
// Shows a toast when a new version of the app is available
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function UpdatePrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisteredSW(swUrl, r) {
            // Check for updates every hour
            if (r) {
                setInterval(() => {
                    r.update();
                }, 60 * 60 * 1000);
            }
        },
        onRegisterError(error) {
            console.error('SW registration error:', error);
        },
    });

    const handleUpdate = () => {
        updateServiceWorker(true);
    };

    const handleDismiss = () => {
        setNeedRefresh(false);
    };

    return (
        <AnimatePresence>
            {needRefresh && (
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 60 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="fixed bottom-20 left-4 right-4 z-[110] max-w-sm mx-auto"
                >
                    <div className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-xl flex-shrink-0">
                            <RefreshCw className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold">Update Available</p>
                            <p className="text-xs text-slate-400">A new version of MyMedic is ready</p>
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="bg-primary text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors flex-shrink-0"
                        >
                            Update
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="p-1 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
                        >
                            <X className="w-4 h-4 text-slate-400" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
