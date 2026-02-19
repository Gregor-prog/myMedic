import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MessageSquare, Heart, Droplets, Thermometer, FileText, Calendar, Pill } from 'lucide-react';
import useStore from '../../store/useStore';
import PageTransition from '../../components/ui/PageTransition';

export default function PatientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPatientById, vitals, medicalRecords } = useStore();
    const patient = getPatientById(id);

    if (!patient) return <div className="page flex items-center justify-center"><p>Patient not found.</p></div>;

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                    <h1 className="text-lg font-bold">Patient Detail</h1>
                </header>

                <div className="px-4 py-6 space-y-6">
                    {/* Profile */}
                    <div className="bg-white rounded-2xl p-5 shadow-card border border-gray-100 text-center">
                        <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                            <span className="text-primary text-2xl font-bold">{patient.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <h2 className="text-lg font-bold">{patient.name}</h2>
                        <p className="text-sm text-slate-500">{patient.age} yrs • {patient.gender} • Blood: {patient.bloodType}</p>
                        <div className="flex justify-center gap-3 mt-4">
                            <button className="btn-secondary text-sm py-2 px-4"><Phone className="w-4 h-4" /> Call</button>
                            <button onClick={() => navigate('/chat')} className="btn-secondary text-sm py-2 px-4"><MessageSquare className="w-4 h-4" /> Chat</button>
                        </div>
                    </div>

                    {/* Vitals */}
                    <section>
                        <h3 className="text-base font-bold text-slate-900 mb-3">Current Vitals</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-white p-3 rounded-xl shadow-card border border-gray-100 text-center">
                                <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                                <p className="text-lg font-bold">{vitals.heartRate.value}</p>
                                <p className="text-[10px] text-slate-400">{vitals.heartRate.unit}</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow-card border border-gray-100 text-center">
                                <Droplets className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                                <p className="text-lg font-bold">{vitals.bloodPressure.value}</p>
                                <p className="text-[10px] text-slate-400">mmHg</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl shadow-card border border-gray-100 text-center">
                                <Thermometer className="w-5 h-5 text-orange-500 mx-auto mb-1" />
                                <p className="text-lg font-bold">{vitals.temperature.value}</p>
                                <p className="text-[10px] text-slate-400">{vitals.temperature.unit}</p>
                            </div>
                        </div>
                    </section>

                    {/* Recent Records */}
                    <section>
                        <h3 className="text-base font-bold text-slate-900 mb-3">Recent Records</h3>
                        <div className="space-y-2">
                            {medicalRecords.slice(0, 3).map(r => (
                                <div key={r.id} className="bg-white rounded-xl p-3 shadow-card border border-gray-100 flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-900 truncate">{r.title}</p>
                                        <p className="text-xs text-slate-400">{r.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </PageTransition>
    );
}
