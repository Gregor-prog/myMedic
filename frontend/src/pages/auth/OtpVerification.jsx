import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, RotateCw } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function OtpVerification() {
    const navigate = useNavigate();
    const location = useLocation();
    const { login, userRole, addToast } = useStore();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(30);
    const inputRefs = useRef([]);
    const phone = location.state?.phone || '+234 *** **** 5678';

    useEffect(() => {
        inputRefs.current[0]?.focus();
        const interval = setInterval(() => {
            setResendTimer(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }

        // Auto-submit when all filled
        if (newOtp.every(d => d !== '')) {
            handleVerify(newOtp.join(''));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = async (code) => {
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        login(userRole || 'patient', 'patient-001');
        addToast({ type: 'success', message: 'Phone verified successfully!' });
        navigate(userRole === 'professional' ? '/professional/dashboard' : '/patient/dashboard');
    };

    const handleResend = () => {
        setResendTimer(30);
        addToast({ type: 'info', message: 'New verification code sent!' });
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-white px-6 py-6">
                {/* Back button */}
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors w-fit">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck className="w-10 h-10 text-primary" />
                        </div>
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">Verify Your Number</h1>
                        <p className="text-slate-500 text-sm">
                            We've sent a 6-digit code to<br />
                            <span className="font-semibold text-slate-700">{phone}</span>
                        </p>
                    </motion.div>

                    {/* OTP Inputs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="flex gap-3 justify-center mb-8"
                    >
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => inputRefs.current[index] = el}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className={`w-12 h-14 text-center text-xl font-bold rounded-xl border-2 transition-all duration-200 outline-none
                  ${digit ? 'border-primary bg-primary/5 text-primary' : 'border-slate-200 bg-white text-slate-900'}
                  focus:border-primary focus:ring-2 focus:ring-primary/20`}
                            />
                        ))}
                    </motion.div>

                    {/* Loading state */}
                    {loading && (
                        <div className="flex justify-center mb-6">
                            <div className="w-8 h-8 border-3 border-primary/20 border-t-primary rounded-full animate-spin" />
                        </div>
                    )}

                    {/* Resend */}
                    <div className="text-center">
                        {resendTimer > 0 ? (
                            <p className="text-sm text-slate-400">
                                Resend code in <span className="font-semibold text-slate-600">{resendTimer}s</span>
                            </p>
                        ) : (
                            <button
                                onClick={handleResend}
                                className="text-sm text-primary font-semibold flex items-center gap-1.5 mx-auto hover:text-primary/80 transition-colors"
                            >
                                <RotateCw className="w-4 h-4" />
                                Resend Code
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
