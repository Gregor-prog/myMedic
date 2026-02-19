import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Pill, PlusCircle, Search, Clock, CheckCircle } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';

const prescriptions = [
    { id: 1, patient: 'Alexander Mitchell', medication: 'Amoxicillin 500mg', dosage: '3x daily', duration: '7 days', status: 'active', date: '2026-02-24' },
    { id: 2, patient: 'Maria Santos', medication: 'Ibuprofen 400mg', dosage: '2x daily', duration: '5 days', status: 'active', date: '2026-02-23' },
    { id: 3, patient: 'James Adeoye', medication: 'Metformin 850mg', dosage: '2x daily', duration: '30 days', status: 'completed', date: '2026-02-20' },
    { id: 4, patient: 'Linda Johnson', medication: 'Lisinopril 10mg', dosage: '1x daily', duration: '90 days', status: 'active', date: '2026-02-22' },
];

export default function PrescriptionManagement() {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3 mb-3">
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                        <h1 className="text-lg font-bold">Prescriptions</h1>
                        <button className="ml-auto flex items-center gap-1.5 bg-primary text-white text-sm font-bold px-3 py-2 rounded-xl">
                            <PlusCircle className="w-4 h-4" /> New
                        </button>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder="Search prescriptions..." className="input-field input-with-icon" />
                    </div>
                </header>

                <div className="px-4 py-4 space-y-3">
                    {prescriptions.map(rx => (
                        <div key={rx.id} className="bg-white rounded-xl p-4 shadow-card border border-gray-100">
                            <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${rx.status === 'active' ? 'bg-emerald-50' : 'bg-gray-100'}`}>
                                    <Pill className={`w-5 h-5 ${rx.status === 'active' ? 'text-emerald-500' : 'text-slate-400'}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-900">{rx.medication}</h4>
                                    <p className="text-xs text-primary font-medium">{rx.patient}</p>
                                    <div className="flex gap-3 mt-1.5 text-xs text-slate-500">
                                        <span>{rx.dosage}</span>
                                        <span>•</span>
                                        <span>{rx.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{rx.date}</span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${rx.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-slate-400'}`}>
                                            {rx.status === 'active' ? <CheckCircle className="w-3 h-3 inline mr-0.5" /> : null}{rx.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}
