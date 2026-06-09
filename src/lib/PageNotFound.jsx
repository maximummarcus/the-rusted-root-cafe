import { Link, useLocation } from 'react-router-dom';
import { WORDMARK_URL } from '@/lib/cafeData';

export default function PageNotFound() {
    const location = useLocation();
    const pageName = location.pathname.substring(1);

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background paper-texture">
            <div className="max-w-md w-full text-center space-y-6">
                <Link to="/" className="inline-block">
                    <img src={WORDMARK_URL} alt="The Rusted Root Cafe" className="w-56 max-w-full h-auto mx-auto" />
                </Link>

                {/* 404 Error Code */}
                <div className="space-y-2">
                    <h1 className="font-heading text-7xl text-primary">404</h1>
                    <div className="h-0.5 w-16 bg-border mx-auto"></div>
                </div>

                {/* Main Message */}
                <div className="space-y-3">
                    <h2 className="font-heading text-2xl text-foreground">
                        Page Not Found
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                        We couldn&apos;t find a page called{' '}
                        <span className="font-medium text-foreground">&quot;{pageName}&quot;</span>.
                        Let&apos;s get you back to the café.
                    </p>
                </div>

                {/* Action Button */}
                <div className="pt-4">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 rounded-full bg-primary text-primary-foreground font-semibold shadow hover:opacity-90 transition"
                    >
                        Back Home
                    </Link>
                </div>
            </div>
        </div>
    )
}
