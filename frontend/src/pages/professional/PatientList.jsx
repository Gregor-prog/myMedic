import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, ChevronRight, Phone, Video, Filter } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function PatientList() {
    const navigate = useNavigate();
    const { patients } = useStore();

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3 mb-3">
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                        <h1 className="text-lg font-bold">My Patients</h1>
                        <span className="ml-auto bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full">{patients.length}</span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" placeholder="Search patients..." className="input-field input-with-icon" />
                    </div>
                </header>

                <div className="px-4 py-4 space-y-2">
                    {patients.map((patient, i) => (
                        <motion.button
                            key={patient.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => navigate(`/professional/patient/${patient.id}`)}
                            className="w-full bg-white rounded-xl p-4 shadow-card border border-gray-100 flex items-center gap-4 text-left hover:shadow-soft transition-all group"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                <span className="text-primary font-bold text-sm">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold text-slate-900 truncate">{patient.name}</h4>
                                <p className="text-xs text-slate-400">{patient.age} yrs • {patient.gender} • {patient.bloodType}</p>
                                <p className="text-xs text-slate-500 mt-0.5">Last visit: {patient.lastVisit}</p>
                            </div>
                            <div className="flex gap-1.5 flex-shrink-0">
                                <button className="p-2 bg-gray-50 rounded-lg hover:bg-primary/10 transition-colors"><Phone className="w-4 h-4 text-slate-400" /></button>
                                <button className="p-2 bg-gray-50 rounded-lg hover:bg-primary/10 transition-colors"><Video className="w-4 h-4 text-slate-400" /></button>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>
        </PageTransition>
    );
}
