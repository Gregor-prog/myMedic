import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, DollarSign, ArrowUpRight, Calendar, CreditCard, Download } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';

const transactions = [
    { id: 1, patient: 'Alexander Mitchell', amount: 15000, type: 'consultation', date: '2026-02-24', status: 'completed' },
    { id: 2, patient: 'Maria Santos', amount: 25000, type: 'follow-up', date: '2026-02-23', status: 'completed' },
    { id: 3, patient: 'James Adeoye', amount: 15000, type: 'consultation', date: '2026-02-22', status: 'pending' },
    { id: 4, patient: 'Linda Johnson', amount: 35000, type: 'procedure', date: '2026-02-21', status: 'completed' },
];

export default function Earnings() {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <div className="page">
                <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 hover:bg-slate-50 rounded-xl"><ArrowLeft className="w-5 h-5 text-slate-600" /></button>
                    <h1 className="text-lg font-bold">Earnings</h1>
                </header>

                <div className="px-4 py-6 space-y-6">
                    {/* Overview Card */}
                    <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                        <p className="text-sm opacity-80 font-medium mb-1">Total Earnings</p>
                        <h2 className="text-3xl font-extrabold mb-2">₦2,450,000</h2>
                        <div className="flex items-center gap-1 text-sm">
                            <ArrowUpRight className="w-4 h-4" />
                            <span className="font-medium">+12.5% from last month</span>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-4 rounded-xl shadow-card border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="p-1.5 rounded-lg bg-emerald-50"><TrendingUp className="w-4 h-4 text-emerald-500" /></span>
                            </div>
                            <p className="text-lg font-extrabold">₦240K</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">This Week</p>
                        </div>
                        <div className="bg-white p-4 rounded-xl shadow-card border border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="p-1.5 rounded-lg bg-amber-50"><DollarSign className="w-4 h-4 text-amber-500" /></span>
                            </div>
                            <p className="text-lg font-extrabold">₦120K</p>
                            <p className="text-[10px] text-slate-400 uppercase font-bold">Pending</p>
                        </div>
                    </div>

                    {/* Transactions */}
                    <section>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-base font-bold text-slate-900">Recent Transactions</h3>
                            <button className="text-primary text-sm font-bold flex items-center gap-1"><Download className="w-4 h-4" />Export</button>
                        </div>
                        <div className="space-y-2">
                            {transactions.map(tx => (
                                <div key={tx.id} className="bg-white rounded-xl p-4 shadow-card border border-gray-100 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${tx.status === 'completed' ? 'bg-emerald-50' : 'bg-amber-50'}`}>
                                        <CreditCard className={`w-5 h-5 ${tx.status === 'completed' ? 'text-emerald-500' : 'text-amber-500'}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-slate-900 truncate">{tx.patient}</h4>
                                        <p className="text-xs text-slate-400 capitalize">{tx.type} • {tx.date}</p>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                        <p className="text-sm font-bold text-slate-900">₦{tx.amount.toLocaleString()}</p>
                                        <span className={`text-[10px] font-bold ${tx.status === 'completed' ? 'text-emerald-500' : 'text-amber-500'}`}>{tx.status}</span>
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
