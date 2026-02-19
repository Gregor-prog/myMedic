import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Download, Eye, Search, Filter, Calendar, Pill, FlaskConical, Stethoscope } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

const typeIcons = { prescription: Pill, lab_result: FlaskConical, report: FileText, consultation: Stethoscope };
const typeColors = { prescription: 'bg-purple-50 text-purple-500', lab_result: 'bg-amber-50 text-amber-500', report: 'bg-blue-50 text-blue-500', consultation: 'bg-green-50 text-green-500' };

export default function MedicalRecords() {
    const navigate = useNavigate();
    const { medicalRecords } = useStore();
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');

    const categories = ['all', 'prescription', 'lab_result', 'report', 'consultation'];

    const filtered = medicalRecords.filter(r => {
        const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
        const matchFilter = filter === 'all' || r.type === filter;
        return matchSearch && matchFilter;
    });

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3 mb-3">
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <h1 className="text-lg font-bold">Medical Records</h1>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search records..." className="input-field input-with-icon" />
                    </div>
                    <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide -mx-4 px-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${filter === cat ? 'bg-primary text-white' : 'bg-gray-100 text-slate-600'
                                    }`}
                            >
                                {cat.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </header>

                <div className="px-4 py-4 space-y-3">
                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center py-20 text-center">
                            <FileText className="w-12 h-12 text-slate-200 mb-4" />
                            <h3 className="text-lg font-bold text-slate-700">No Records Found</h3>
                            <p className="text-sm text-slate-400 mt-1">Try a different search or filter</p>
                        </div>
                    ) : (
                        filtered.map((record, i) => {
                            const Icon = typeIcons[record.type] || FileText;
                            const color = typeColors[record.type] || 'bg-gray-50 text-gray-500';
                            return (
                                <motion.div
                                    key={record.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.04 }}
                                    className="bg-white rounded-xl p-4 shadow-card border border-gray-100 flex items-center gap-4"
                                >
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-slate-900 truncate">{record.title}</h4>
                                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" /> {record.date}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-0.5">{record.doctor}</p>
                                    </div>
                                    <div className="flex gap-2 flex-shrink-0">
                                        <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><Eye className="w-4 h-4 text-slate-400" /></button>
                                        <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors"><Download className="w-4 h-4 text-slate-400" /></button>
                                    </div>
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </div>
        </PageTransition>
    );
}
