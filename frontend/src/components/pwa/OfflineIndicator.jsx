// ─────────────────────────────────────────────────────────────
// Offline Indicator Component
// Shows a subtle banner when the user loses network connectivity
// ─────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineIndicator() {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [showReconnected, setShowReconnected] = useState(false);

    useEffect(() => {
        const handleOnline = () => {
            setIsOnline(true);
            setShowReconnected(true);
            setTimeout(() => setShowReconnected(false), 3000);
        };

        const handleOffline = () => {
            setIsOnline(false);
            setShowReconnected(false);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <AnimatePresence>
            {/* Offline Banner */}
            {!isOnline && (
                <motion.div
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="fixed top-0 left-0 right-0 z-[150] bg-amber-500 text-white px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-bold shadow-lg"
                >
                    <WifiOff className="w-4 h-4" />
                    You're offline — Some features may be limited
                </motion.div>
            )}

            {/* Reconnected Toast */}
            {showReconnected && (
                <motion.div
                    initial={{ y: -60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="fixed top-0 left-0 right-0 z-[150] bg-emerald-500 text-white px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-bold shadow-lg"
                >
                    <Wifi className="w-4 h-4" />
                    Back online!
                </motion.div>
            )}
        </AnimatePresence>
    );
}
