import { Cross, Stethoscope } from 'lucide-react';

export default function LoadingScreen() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-light">
            <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse-slow">
                    <Stethoscope className="w-8 h-8 text-primary" />
                </div>
            </div>
            <div className="mt-6 flex flex-col items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">MyMedic</h2>
                <div className="w-32 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full w-1/3 animate-[pulse_1.5s_ease-in-out_infinite]" />
                </div>
            </div>
        </div>
    );
}
