import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CreditCard, Wallet, Building2, Shield, ArrowRight, Lock } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';
import { useState } from 'react';

const paymentMethods = [
    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard, sub: 'Visa, Mastercard, Verve' },
    { id: 'wallet', label: 'Digital Wallet', icon: Wallet, sub: 'PayPal, Apple Pay' },
    { id: 'bank', label: 'Bank Transfer', icon: Building2, sub: 'Direct bank payment' },
];

export default function BookingPayment() {
    const navigate = useNavigate();
    const { bookingDraft, getDoctorById, confirmBooking, addToast } = useStore();
    const [method, setMethod] = useState('card');
    const [processing, setProcessing] = useState(false);

    if (!bookingDraft) {
        return <div className="page flex items-center justify-center"><p className="text-slate-500">No booking found. <button onClick={() => navigate('/patient/marketplace')} className="text-primary font-bold">Browse Doctors</button></p></div>;
    }

    const doc = getDoctorById(bookingDraft.doctorId);
    const serviceFee = Math.round(bookingDraft.fee * 0.05);
    const total = bookingDraft.fee + serviceFee;

    const handlePay = async () => {
        setProcessing(true);
        await new Promise(r => setTimeout(r, 2000));
        confirmBooking();
        navigate('/patient/booking/success');
    };

    return (
        <PageTransition>
            <div className="page pb-40">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <h1 className="text-lg font-bold">Payment</h1>
                </header>

                <div className="px-4 py-6 space-y-6">
                    {/* Summary */}
                    <section className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
                        <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Booking Summary</h3>
                        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-100">
                            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-bold">{doc?.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900">{doc?.name}</h4>
                                <p className="text-sm text-primary">{doc?.specialty}</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-slate-500">Date</span><span className="font-medium">{bookingDraft.date}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Time</span><span className="font-medium">{bookingDraft.time}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Type</span><span className="font-medium capitalize">{bookingDraft.type}</span></div>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section>
                        <h3 className="text-base font-bold text-slate-900 mb-3">Payment Method</h3>
                        <div className="space-y-2">
                            {paymentMethods.map((pm) => {
                                const Icon = pm.icon;
                                return (
                                    <button
                                        key={pm.id}
                                        onClick={() => setMethod(pm.id)}
                                        className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${method === pm.id
                                                ? 'border-primary bg-primary-light/50'
                                                : 'border-gray-100 bg-white hover:border-gray-200'
                                            }`}
                                    >
                                        <div className={`p-2 rounded-lg ${method === pm.id ? 'bg-primary/10' : 'bg-gray-100'}`}>
                                            <Icon className={`w-5 h-5 ${method === pm.id ? 'text-primary' : 'text-slate-400'}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="text-sm font-bold text-slate-900">{pm.label}</h4>
                                            <p className="text-xs text-slate-400">{pm.sub}</p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === pm.id ? 'border-primary' : 'border-gray-300'
                                            }`}>
                                            {method === pm.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Price Breakdown */}
                    <section className="bg-white rounded-2xl p-5 shadow-card border border-gray-100">
                        <h3 className="text-sm font-bold text-slate-400 uppercase mb-3">Price Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between"><span className="text-slate-500">Consultation Fee</span><span className="font-medium">₦{bookingDraft.fee.toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Service Fee</span><span className="font-medium">₦{serviceFee.toLocaleString()}</span></div>
                            <div className="flex justify-between pt-3 border-t border-gray-100">
                                <span className="font-bold text-slate-900">Total</span>
                                <span className="font-extrabold text-primary text-lg">₦{total.toLocaleString()}</span>
                            </div>
                        </div>
                    </section>

                    {/* Security */}
                    <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span>Your payment is secured with 256-bit encryption</span>
                    </div>
                </div>

                {/* Fixed Bottom */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40">
                    <div className="max-w-lg mx-auto">
                        <button
                            onClick={handlePay}
                            disabled={processing}
                            className="btn-primary w-full disabled:opacity-60"
                        >
                            {processing ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Processing...
                                </div>
                            ) : (
                                <><Lock className="w-4 h-4" /> Pay ₦{total.toLocaleString()} <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
