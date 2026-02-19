import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, Camera, FileText, CheckCircle, ArrowRight } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function KycVerification() {
    const navigate = useNavigate();
    const { addToast } = useStore();
    const [idType, setIdType] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [loading, setLoading] = useState(false);

    const idTypes = [
        { value: 'nin', label: 'National ID (NIN)' },
        { value: 'passport', label: 'International Passport' },
        { value: 'drivers', label: "Driver's License" },
        { value: 'voters', label: "Voter's Card" },
    ];

    const handleUpload = () => {
        setUploaded(true);
        addToast({ type: 'success', message: 'Document uploaded successfully!' });
    };

    const handleSubmit = async () => {
        if (!idType || !uploaded) {
            addToast({ type: 'error', message: 'Please select ID type and upload document.' });
            return;
        }
        setLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        addToast({ type: 'success', message: 'KYC verification submitted!' });
        navigate('/patient/dashboard');
    };

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col bg-white px-6 py-6">
                <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors w-fit">
                    <ArrowLeft className="w-5 h-5 text-slate-600" />
                </button>

                <div className="flex-1 max-w-md mx-auto w-full mt-6">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-2">Identity Verification</h1>
                        <p className="text-slate-500 text-sm mb-8">
                            Verify your identity to access premium healthcare services securely.
                        </p>
                    </motion.div>

                    {/* Step Indicator */}
                    <div className="flex items-center gap-2 mb-8">
                        <div className="flex-1 h-1 rounded-full bg-primary" />
                        <div className="flex-1 h-1 rounded-full bg-primary" />
                        <div className="flex-1 h-1 rounded-full bg-primary/30" />
                    </div>

                    {/* ID Type Selection */}
                    <div className="mb-6">
                        <label className="text-sm font-medium text-slate-700 mb-3 block">Select ID Type</label>
                        <div className="grid grid-cols-2 gap-3">
                            {idTypes.map((type) => (
                                <button
                                    key={type.value}
                                    onClick={() => setIdType(type.value)}
                                    className={`p-3 rounded-xl border text-sm font-medium text-left transition-all ${idType === type.value
                                            ? 'border-primary bg-primary-light text-primary'
                                            : 'border-slate-200 text-slate-600 hover:border-slate-300'
                                        }`}
                                >
                                    {type.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Upload Area */}
                    <div className="mb-8">
                        <label className="text-sm font-medium text-slate-700 mb-3 block">Upload Document</label>
                        {uploaded ? (
                            <div className="p-6 rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 flex flex-col items-center gap-3">
                                <CheckCircle className="w-12 h-12 text-emerald-500" />
                                <p className="text-sm font-medium text-emerald-700">Document uploaded successfully</p>
                                <button onClick={() => setUploaded(false)} className="text-xs text-emerald-600 underline">Replace</button>
                            </div>
                        ) : (
                            <button
                                onClick={handleUpload}
                                className="w-full p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-primary/40 hover:bg-primary/5 transition-all flex flex-col items-center gap-3"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
                                    <Upload className="w-7 h-7 text-slate-400" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-700">Tap to upload</p>
                                    <p className="text-xs text-slate-400 mt-1">JPG, PNG, or PDF (max 5MB)</p>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                        <Camera className="w-3 h-3" /> Camera
                                    </span>
                                    <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                                        <FileText className="w-3 h-3" /> Gallery
                                    </span>
                                </div>
                            </button>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={loading || !idType || !uploaded}
                        className="btn-primary w-full disabled:opacity-40"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>Submit Verification <ArrowRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </div>
        </PageTransition>
    );
}
