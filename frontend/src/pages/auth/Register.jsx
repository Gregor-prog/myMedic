import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, Stethoscope } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function Register() {
    const navigate = useNavigate();
    const { userRole, addToast, register } = useStore();
    const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullName, email, phone, password } = form;
        if (!fullName || !email || !phone || !password) {
            addToast({ type: 'error', message: 'Please fill in all fields.' });
            return;
        }
        if (password.length < 8) {
            addToast({ type: 'error', message: 'Password must be at least 8 characters.' });
            return;
        }
        setLoading(true);
        try {
            await register({
                email,
                password,
                full_name: fullName,
                phone_number: phone,
                role: userRole || 'patient'
            });
            addToast({ type: 'success', message: 'Account created! Verify your phone number.' });
            navigate('/verify-otp', { state: { phone, from: 'register' } });
        } catch (err) {
            addToast({ type: 'error', message: 'Registration failed. Email might be in use.' });
        } finally {
            setLoading(false);
        }
    };

    const fields = [
        { key: 'fullName', label: 'Full Name', type: 'text', placeholder: 'John Doe', icon: User },
        { key: 'email', label: 'Email Address', type: 'email', placeholder: 'name@example.com', icon: Mail },
        { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234 801 234 5678', icon: Phone },
    ];

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-white relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-[80px] -translate-y-1/3 translate-x-1/3" />

                {/* Header */}
                <div className="flex items-center gap-4 px-6 pt-6 pb-4 relative z-10">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <div className="flex items-center gap-2">
                        <div className="bg-primary/10 w-8 h-8 rounded-lg flex items-center justify-center">
                            <Stethoscope className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-bold text-sm">MyMedic</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-6 pb-8 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-1">Create Account</h1>
                        <p className="text-slate-500 text-sm mb-8">
                            {userRole === 'professional' ? 'Set up your professional profile' : 'Join our premium healthcare network'}
                        </p>
                    </motion.div>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="flex-1 h-1 rounded-full bg-primary" />
                        <div className="flex-1 h-1 rounded-full bg-slate-100" />
                        <div className="flex-1 h-1 rounded-full bg-slate-100" />
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        {fields.map((field) => {
                            const Icon = field.icon;
                            return (
                                <label key={field.key} className="flex flex-col gap-2">
                                    <span className="text-slate-700 text-sm font-medium">{field.label}</span>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <input
                                            type={field.type}
                                            value={form[field.key]}
                                            onChange={(e) => update(field.key, e.target.value)}
                                            placeholder={field.placeholder}
                                            className="input-field input-with-icon"
                                        />
                                    </div>
                                </label>
                            );
                        })}

                        {/* Password */}
                        <label className="flex flex-col gap-2">
                            <span className="text-slate-700 text-sm font-medium">Password</span>
                            <div className="relative group">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={form.password}
                                    onChange={(e) => update('password', e.target.value)}
                                    placeholder="Min. 8 characters"
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
                            <p className="text-xs text-slate-400">Must contain letters, numbers, and special characters</p>
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary mt-4 disabled:opacity-60"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>Continue <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-500 mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary font-semibold">Sign In</Link>
                    </p>
                </div>
            </div>
        </PageTransition>
    );
}
