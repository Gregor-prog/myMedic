import { useNavigate } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import PageTransition from '../../components/ui/PageTransition';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <PageTransition>
            <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white text-center">
                <div className="text-8xl font-extrabold text-primary/10 mb-4">404</div>
                <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Page Not Found</h1>
                <p className="text-slate-500 text-sm mb-8 max-w-xs">
                    The page you're looking for doesn't exist or has been moved.
                </p>
                <div className="flex gap-3">
                    <button onClick={() => navigate('/')} className="btn-primary text-sm py-2.5 px-5">
                        <Home className="w-4 h-4" /> Go Home
                    </button>
                    <button onClick={() => navigate(-1)} className="btn-ghost text-sm py-2.5 px-5 bg-gray-50">
                        Go Back
                    </button>
                </div>
            </div>
        </PageTransition>
    );
}
