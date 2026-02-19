import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, MapPin, BadgeCheck, Calendar, Clock, Award, Languages, MessageSquare, Video, ArrowRight } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function DoctorDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getDoctorById } = useStore();
    const doc = getDoctorById(id);

    if (!doc) {
        return (
            <div className="page flex items-center justify-center">
                <p className="text-slate-500">Doctor not found.</p>
            </div>
        );
    }

    return (
        <PageTransition>
            <div className="page pb-32">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl transition-colors">
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <h1 className="text-lg font-bold">Doctor Profile</h1>
                </header>

                <div className="px-4 py-6 space-y-6">
                    {/* Profile Card */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 text-center">
                        <div className="w-24 h-24 rounded-2xl bg-primary/10 mx-auto mb-4 flex items-center justify-center overflow-hidden">
                            {doc.avatar ? (
                                <img src={doc.avatar} alt={doc.name} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-primary text-3xl font-bold">{doc.name.split(' ').map(n => n[0]).join('')}</span>
                            )}
                        </div>
                        <div className="flex items-center justify-center gap-1.5 mb-1">
                            <h2 className="text-xl font-bold text-slate-900">{doc.name}</h2>
                            {doc.verified && <BadgeCheck className="w-5 h-5 text-primary" />}
                        </div>
                        <p className="text-primary font-semibold mb-2">{doc.specialty}</p>
                        <p className="text-sm text-slate-500 flex items-center justify-center gap-1">
                            <MapPin className="w-4 h-4" /> {doc.hospital}
                        </p>

                        <div className="flex justify-center gap-6 mt-5 pt-5 border-t border-gray-100">
                            <div className="text-center">
                                <div className="flex items-center gap-1 justify-center">
                                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                    <span className="text-lg font-bold">{doc.rating}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">{doc.reviews} Reviews</span>
                            </div>
                            <div className="w-px bg-gray-100" />
                            <div className="text-center">
                                <span className="text-lg font-bold">{doc.experience}</span>
                                <span className="text-[10px] text-slate-400 font-medium block">Experience</span>
                            </div>
                            <div className="w-px bg-gray-100" />
                            <div className="text-center">
                                <span className="text-lg font-bold">{doc.currency}{doc.fee.toLocaleString()}</span>
                                <span className="text-[10px] text-slate-400 font-medium block">Per Visit</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* About */}
                    <section>
                        <h3 className="text-base font-bold text-slate-900 mb-2">About</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{doc.bio}</p>
                    </section>

                    {/* Qualifications */}
                    <section>
                        <h3 className="text-base font-bold text-slate-900 mb-3">Qualifications</h3>
                        <div className="flex flex-wrap gap-2">
                            {doc.qualifications.map((q) => (
                                <span key={q} className="flex items-center gap-1.5 bg-primary-light text-primary text-xs font-bold px-3 py-1.5 rounded-full">
                                    <Award className="w-3 h-3" /> {q}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Languages */}
                    <section>
                        <h3 className="text-base font-bold text-slate-900 mb-3">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                            {doc.languages.map((l) => (
                                <span key={l} className="flex items-center gap-1.5 bg-gray-100 text-slate-600 text-xs font-medium px-3 py-1.5 rounded-full">
                                    <Languages className="w-3 h-3" /> {l}
                                </span>
                            ))}
                        </div>
                    </section>

                    {/* Availability */}
                    <section>
                        <h3 className="text-base font-bold text-slate-900 mb-3">Available Days</h3>
                        <div className="flex gap-2">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                                <span
                                    key={day}
                                    className={`w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold ${doc.availability.includes(day)
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-100 text-slate-300'
                                        }`}
                                >
                                    {day}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Fixed Bottom Actions */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 pb-safe z-40">
                    <div className="max-w-lg mx-auto flex gap-3">
                        <button
                            onClick={() => navigate('/chat')}
                            className="btn-secondary flex-shrink-0 py-3 px-4"
                        >
                            <MessageSquare className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => navigate(`/patient/booking/${doc.id}`)}
                            disabled={!doc.available}
                            className="btn-primary flex-1 disabled:opacity-40"
                        >
                            {doc.available ? (
                                <>Book Appointment <ArrowRight className="w-5 h-5" /></>
                            ) : 'Currently Unavailable'}
                        </button>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
