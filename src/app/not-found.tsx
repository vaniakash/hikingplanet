import Link from 'next/link';
import { Mountain, Home, Compass, Users, Mail, ArrowLeft, MessageCircle, Map } from 'lucide-react';
import { Plus_Jakarta_Sans } from 'next/font/google';

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-plus-jakarta',
});

export default function NotFound() {
    return (
        <div className={`${plusJakartaSans.variable} font-sans min-h-screen flex flex-col bg-[#f6f8f6] dark:bg-[#102213] text-[#022c22] dark:text-[#ecfdf5]`}>

            {/* Navigation Header */}
            <header className="w-full px-6 py-8 max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-[#12e235] p-2 rounded-lg">
                        <Mountain className="text-white w-6 h-6" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-[#064e3b] dark:text-white uppercase font-display">HikingPlanet</span>
                </div>
                <nav className="hidden md:flex gap-8 items-center font-medium">
                    <Link href="#" className="hover:text-[#12e235] transition-colors">Find a Trek</Link>
                    <Link href="#" className="hover:text-[#12e235] transition-colors">Equipment</Link>
                    <Link href="#" className="hover:text-[#12e235] transition-colors">Community</Link>
                    <Link href="#" className="bg-[#12e235]/10 dark:bg-[#12e235]/20 text-[#12e235] px-5 py-2 rounded-full hover:bg-[#12e235] hover:text-white transition-all">
                        Join the Club
                    </Link>
                </nav>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">

                {/* Abstract Mountain Background Decorative Elements */}
                <div className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10 overflow-hidden">
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#12e235] rounded-full blur-[120px]"></div>
                    <div className="absolute top-1/2 -right-24 w-64 h-64 bg-[#059669] rounded-full blur-[100px]"></div>
                </div>

                <div className="max-w-4xl w-full text-center relative z-10">

                    {/* Hero Illustration Container */}
                    <div className="relative mb-12 flex justify-center">
                        {/* Illustration Frame */}
                        <div className="relative w-full max-w-lg aspect-square md:aspect-video bg-white dark:bg-[#064e3b]/20 rounded-xl shadow-2xl shadow-[#12e235]/5 p-8 flex items-center justify-center overflow-hidden border border-[#d1fae5] dark:border-[#065f46]/50">

                            {/* SVG/CSS Based Illustration */}
                            <div className="relative w-full h-full flex flex-col items-center justify-end">

                                {/* Background Peaks */}
                                <div className="absolute bottom-12 w-full flex justify-around opacity-30 dark:opacity-20 pointer-events-none">
                                    <div className="w-0 h-0 border-l-[100px] border-l-transparent border-r-[100px] border-r-transparent border-b-[150px] border-b-[#064e3b] dark:border-b-white"></div>
                                    <div className="w-0 h-0 border-l-[150px] border-l-transparent border-r-[150px] border-r-transparent border-b-[220px] border-b-[#065f46] dark:border-b-white translate-y-4"></div>
                                    <div className="w-0 h-0 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent border-b-[180px] border-b-[#022c22] dark:border-b-white -translate-x-12"></div>
                                </div>

                                {/* Central Signpost */}
                                <div className="relative flex flex-col items-center z-20 translate-y-8">
                                    {/* Top Sign - Points Left */}
                                    <div className="bg-[#065f46] dark:bg-[#047857] text-white py-3 px-8 rounded-sm rotate-[-4deg] relative shadow-lg mb-2 -translate-x-6 border-b-4 border-[#022c22]">
                                        <span className="font-bold text-lg">LOST WAY</span>
                                        <div className="absolute right-[-15px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-l-[15px] border-l-[#065f46] dark:border-l-[#047857]"></div>
                                    </div>

                                    {/* Middle Sign - The 404 Sign */}
                                    <div className="bg-[#12e235] text-[#064e3b] py-4 px-12 rounded-sm rotate-[3deg] relative shadow-xl z-30 mb-2 border-b-4 border-[#059669]">
                                        <span className="font-extrabold text-5xl tracking-tighter">404</span>
                                        <div className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[25px] border-t-transparent border-b-[25px] border-b-transparent border-r-[20px] border-r-[#12e235]"></div>
                                    </div>

                                    {/* Bottom Sign - Points Right */}
                                    <div className="bg-[#047857] dark:bg-[#059669] text-white py-3 px-10 rounded-sm rotate-[-2deg] relative shadow-lg translate-x-4 border-b-4 border-[#064e3b]">
                                        <span className="font-bold text-lg">NOWHERE</span>
                                        <div className="absolute left-[-15px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[18px] border-t-transparent border-b-[18px] border-b-transparent border-r-[15px] border-r-[#047857] dark:border-r-[#059669]"></div>
                                    </div>

                                    {/* Post */}
                                    <div className="w-6 h-48 bg-[#064e3b] dark:bg-[#022c22] rounded-b-full"></div>
                                </div>

                                {/* Foreground Elements - Using divs instead of images for reliability/placeholder representation or simple CSS shapes */}
                                <div className="absolute bottom-0 w-full flex justify-between items-end px-4 pointer-events-none">
                                    {/* Simplified tree shapes since we don't have the exact image assets locally */}
                                    <div className="w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[100px] border-b-[#065f46]/40 dark:border-b-[#d1fae5]/40 opacity-60"></div>
                                    <div className="w-0 h-0 border-l-[30px] border-l-transparent border-r-[30px] border-r-transparent border-b-[80px] border-b-[#065f46]/40 dark:border-b-[#d1fae5]/40 opacity-60 -scale-x-100"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Message */}
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#064e3b] dark:text-white mb-4 leading-tight font-display">
                        Even the best explorers take a <span className="text-[#12e235] italic">wrong turn.</span>
                    </h1>
                    <p className="text-lg text-[#047857] dark:text-[#6ee7b7] max-w-xl mx-auto mb-10">
                        It seems you've wandered off the trail. Don't worry, even a mountain goat loses its footing sometimes. Let's get you back to base camp.
                    </p>

                    {/* Navigation recovery */}
                    <div className="bg-white/50 dark:bg-[#064e3b]/40 backdrop-blur-md rounded-xl p-8 border border-[#d1fae5] dark:border-[#065f46] shadow-sm max-w-2xl mx-auto">
                        <p className="text-sm font-bold uppercase tracking-widest text-[#059669] dark:text-[#34d399] mb-6 flex items-center justify-center gap-2">
                            <Map className="w-4 h-4" />
                            Looking for your group? Try these helpful trails:
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Link href="/" className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white dark:hover:bg-[#065f46] transition-all border border-transparent hover:border-[#a7f3d0] dark:hover:border-[#047857]">
                                <Home className="text-[#10b981] group-hover:text-[#12e235] transition-colors w-6 h-6" />
                                <span className="text-sm font-semibold">Home</span>
                            </Link>
                            <Link href="/upcoming-treks" className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white dark:hover:bg-[#065f46] transition-all border border-transparent hover:border-[#a7f3d0] dark:hover:border-[#047857]">
                                <Compass className="text-[#10b981] group-hover:text-[#12e235] transition-colors w-6 h-6" />
                                <span className="text-sm font-semibold">Treks</span>
                            </Link>
                            <Link href="/about" className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white dark:hover:bg-[#065f46] transition-all border border-transparent hover:border-[#a7f3d0] dark:hover:border-[#047857]">
                                <Users className="text-[#10b981] group-hover:text-[#12e235] transition-colors w-6 h-6" />
                                <span className="text-sm font-semibold">About Us</span>
                            </Link>
                            <Link href="/contact" className="group flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white dark:hover:bg-[#065f46] transition-all border border-transparent hover:border-[#a7f3d0] dark:hover:border-[#047857]">
                                <Mail className="text-[#10b981] group-hover:text-[#12e235] transition-colors w-6 h-6" />
                                <span className="text-sm font-semibold">Contact</span>
                            </Link>
                        </div>
                    </div>

                    {/* Primary CTA */}
                    <div className="mt-10">
                        <Link href="/" className="inline-flex items-center gap-3 bg-[#12e235] text-[#022c22] font-bold px-10 py-4 rounded-full shadow-lg shadow-[#12e235]/20 hover:shadow-[#12e235]/40 hover:-translate-y-0.5 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Base Camp
                        </Link>
                    </div>

                    {/* Footer Help */}
                    <div className="mt-12 text-sm text-[#059669]/70 dark:text-[#34d399]/50 flex items-center justify-center gap-1">
                        Need immediate rescue?
                        <Link href="/contact" className="text-[#064e3b] dark:text-[#d1fae5] font-bold border-b border-[#12e235]/40 hover:border-[#12e235] transition-colors">Chat with Support</Link>
                    </div>

                </div>
            </main>

            {/* Simple Footer */}
            <footer className="w-full py-8 text-center text-xs text-[#059669]/40 dark:text-[#34d399]/20">
                © 2026 HikingPlanet Adventure Co. All rights reserved.
            </footer>
        </div>
    );
}
