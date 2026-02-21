import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Stethoscope, Phone } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function Login() {
    const navigate = useNavigate();
    const { login, loginWithGoogle, userRole, addToast } = useStore();
    const [email, setEmail] = useState('');
    const [otpEmail, setOtpEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loginMode, setLoginMode] = useState('email'); // 'email' | 'otp'
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (loginMode === 'email') {
            if (!email || !password) {
                addToast({ type: 'error', message: 'Please fill in all fields.' });
                return;
            }
            setLoading(true);
            try {
                await login(email, password);
                addToast({ type: 'success', message: 'Welcome back!' });
                const role = useStore.getState().currentUser?.role;
                navigate(role === 'professional' ? '/professional/dashboard' : '/patient/dashboard');
            } catch (err) {
                addToast({ type: 'error', message: 'Invalid email or password.' });
            } finally {
                setLoading(false);
            }
        } else {
            if (!otpEmail) {
                addToast({ type: 'error', message: 'Please enter your email address.' });
                return;
            }
            setLoading(true);
            try {
                await loginWithOtp(otpEmail);
                addToast({ type: 'success', message: 'Verification code sent to email!' });
                navigate('/verify-otp', { state: { email: otpEmail, from: 'login' } });
            } catch (err) {
                addToast({ type: 'error', message: 'Failed to send OTP code.' });
            } finally {
                setLoading(false);
            }
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle();
        } catch (err) {
            addToast({ type: 'error', message: 'Google login failed.' });
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background-light relative">
                {/* Background blobs */}
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px]" />

                {/* Card */}
                <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-elevated overflow-hidden relative z-10">
                    {/* Logo */}
                    <div className="flex flex-col items-center pt-10 pb-2 px-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                            <Stethoscope className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-slate-900 text-2xl font-bold leading-tight tracking-tight text-center">MyMedic</h1>
                    </div>

                    {/* Header */}
                    <div className="px-8 pb-6 text-center">
                        <h2 className="text-slate-900 text-xl font-semibold leading-tight mb-2">Welcome Back</h2>
                        <p className="text-slate-500 text-sm">Secure Portal Access</p>
                    </div>

                    {/* Login Mode Toggle */}
                    <div className="px-8 pb-4">
                        <div className="flex bg-slate-100 p-1 rounded-xl">
                            <button
                                onClick={() => setLoginMode('email')}
                                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${loginMode === 'email' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Email Access
                            </button>
                            <button
                                onClick={() => setLoginMode('otp')}
                                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${loginMode === 'otp' ? 'bg-white text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Email OTP
                            </button>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleLogin} className="flex flex-col gap-5 px-8 pb-8">
                        {loginMode === 'email' ? (
                            <>
                                {/* Email */}
                                <label className="flex flex-col gap-2">
                                    <span className="text-slate-700 text-sm font-medium">Email Address</span>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="name@example.com"
                                            className="input-field input-with-icon"
                                        />
                                    </div>
                                </label>

                                {/* Password */}
                                <label className="flex flex-col gap-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-700 text-sm font-medium">Password</span>
                                        <a href="#" className="text-primary text-xs font-medium hover:text-primary/80 transition-colors">Forgot Password?</a>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="input-field input-with-icon pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </label>
                            </>
                        ) : (
                            <label className="flex flex-col gap-2">
                                <span className="text-slate-700 text-sm font-medium">Email Address (for Code)</span>
                                <div className="relative group">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="email"
                                        value={otpEmail}
                                        onChange={(e) => setOtpEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="input-field input-with-icon"
                                    />
                                </div>
                                <p className="text-[11px] text-slate-400">We'll send a 6-digit verification code to this email.</p>
                            </label>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>{loginMode === 'email' ? 'Sign In' : 'Send Code'} <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-100" />
                            <span className="flex-shrink mx-4 text-slate-400 text-xs">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t border-slate-100" />
                        </div>

                        {/* Alternative Login buttons */}
                        <div className="grid grid-cols-1">
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors bg-white w-full"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                </svg>
                                <span className="text-sm font-medium text-slate-700">Sign in with Google</span>
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="bg-slate-50 py-5 px-8 text-center border-t border-slate-100">
                        <p className="text-slate-600 text-sm">
                            New to MyMedic?{' '}
                            <Link to="/register" className="text-primary font-semibold hover:text-primary/80 transition-colors">
                                Create an Account
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Trust Badge */}
                <div className="mt-8 flex items-center gap-2 opacity-60">
                    <Lock className="w-4 h-4 text-slate-500" />
                    <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">HIPAA Compliant Secure System</span>
                </div>
            </div>
        </PageTransition>
    );
}
