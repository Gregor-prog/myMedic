import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, ChevronRight, ArrowLeft, Filter, BadgeCheck } from 'lucide-react';
import useStore from '../../store/useStore';
import { specialties } from '../../data/mockData';
import PageTransition from '../../components/ui/PageTransition';

export default function Marketplace() {
    const navigate = useNavigate();
    const { doctors } = useStore();
    const [search, setSearch] = useState('');
    const [activeSpecialty, setActiveSpecialty] = useState('all');

    const filtered = doctors.filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
            doc.specialty.toLowerCase().includes(search.toLowerCase());
        const matchesSpec = activeSpecialty === 'all' ||
            doc.specialty.toLowerCase().includes(activeSpecialty.toLowerCase());
        return matchesSearch && matchesSpec;
    });

    return (
        <PageTransition>
            <div className="page">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3">
                    <div className="flex items-center gap-3 mb-3">
                        <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors">
                            <ArrowLeft className="w-5 h-5 text-slate-600" />
                        </button>
                        <h1 className="text-lg font-bold">Find a Doctor</h1>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search doctors, specialties..."
                            className="input-field input-with-icon pr-12"
                        />
                        <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 bg-primary/10 rounded-lg">
                            <Filter className="w-4 h-4 text-primary" />
                        </button>
                    </div>

                    {/* Specialty Chips */}
                    <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide -mx-4 px-4 pb-1">
                        {specialties.slice(0, 7).map((spec) => (
                            <button
                                key={spec.id}
                                onClick={() => setActiveSpecialty(spec.id)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeSpecialty === spec.id
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                                    }`}
                            >
                                {spec.name}
                            </button>
                        ))}
                    </div>
                </header>

                {/* Results */}
                <div className="px-4 py-4 space-y-3">
                    <p className="text-sm text-slate-500">{filtered.length} doctors found</p>

                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <Search className="w-12 h-12 text-slate-300 mb-4" />
                            <h3 className="text-lg font-bold text-slate-700 mb-1">No Doctors Found</h3>
                            <p className="text-sm text-slate-400">Try adjusting your search or filters</p>
                        </div>
                    ) : (
                        filtered.map((doc, index) => (
                            <motion.button
                                key={doc.id}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                onClick={() => navigate(`/patient/doctor/${doc.id}`)}
                                className="w-full bg-white rounded-2xl p-4 shadow-card border border-gray-100 flex gap-4 text-left hover:shadow-soft transition-all group"
                            >
                                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    {doc.avatar ? (
                                        <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover rounded-xl" />
                                    ) : (
                                        <span className="text-primary text-xl font-bold">{doc.name.split(' ').map(n => n[0]).join('')}</span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-1.5 mb-0.5">
                                        <h3 className="text-base font-bold text-slate-900 truncate">{doc.name}</h3>
                                        {doc.verified && <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />}
                                    </div>
                                    <p className="text-sm text-primary font-medium">{doc.specialty}</p>
                                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {doc.rating}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {doc.location}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-sm font-bold text-slate-900">{doc.currency}{doc.fee.toLocaleString()}</span>
                                        {doc.available && <span className="badge-success text-[10px]">Available</span>}
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300 self-center group-hover:text-primary transition-colors" />
                            </motion.button>
                        ))
                    )}
                </div>
            </div>
        </PageTransition>
    );
}
