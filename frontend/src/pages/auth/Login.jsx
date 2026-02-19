import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Stethoscope, Fingerprint, ScanFace } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function Login() {
    const navigate = useNavigate();
    const { login, userRole, addToast } = useStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            addToast({ type: 'error', message: 'Please fill in all fields.' });
            return;
        }
        setLoading(true);
        try {
            await login(email, password);
            addToast({ type: 'success', message: 'Welcome back!' });
            // Redirect based on role (fetched from backend)
            const role = useStore.getState().currentUser?.role;
            navigate(role === 'professional' ? '/professional/dashboard' : '/patient/dashboard');
        } catch (err) {
            addToast({ type: 'error', message: 'Invalid email or password.' });
        } finally {
            setLoading(false);
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

                    {/* Form */}
                    <form onSubmit={handleLogin} className="flex flex-col gap-5 px-8 pb-8">
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

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Sign In <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="relative flex py-2 items-center">
                            <div className="flex-grow border-t border-slate-100" />
                            <span className="flex-shrink mx-4 text-slate-400 text-xs">OR CONTINUE WITH</span>
                            <div className="flex-grow border-t border-slate-100" />
                        </div>

                        {/* Biometric buttons */}
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                type="button"
                                className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors bg-white"
                            >
                                <ScanFace className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-700">Face ID</span>
                            </button>
                            <button
                                type="button"
                                className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors bg-white"
                            >
                                <Fingerprint className="w-5 h-5 text-slate-600" />
                                <span className="text-sm font-medium text-slate-700">Touch ID</span>
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
