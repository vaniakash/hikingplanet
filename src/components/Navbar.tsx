'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, CaretDown, CaretUp, Megaphone, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import Image from 'next/image';

export default function Navbar({ treks = [] }: { treks?: any[] }) {
    const [announcementOpen, setAnnouncementOpen] = useState(true);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeMobileTab, setActiveMobileTab] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Close dropdowns on route change
        setActiveDropdown(null);
        setMobileMenuOpen(false);
    }, [pathname]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setActiveDropdown(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    }, [mobileMenuOpen]);

    if (pathname.startsWith('/admin')) return null;

    // Derived Trek Groups for All Treks Dropdown
    const byName = [...treks].sort((a, b) => a.title.localeCompare(b.title));
    const byDifficulty: Record<string, any[]> = { 'Easy': [], 'Moderate': [], 'Difficult': [], 'Expert': [] };
    treks.forEach(t => { if (byDifficulty[t.difficulty]) byDifficulty[t.difficulty].push(t); });

    const toggleDropdown = (name: string) => {
        setActiveDropdown(activeDropdown === name ? null : name);
    };

    const toggleMobileTab = (name: string) => {
        setActiveMobileTab(activeMobileTab === name ? null : name);
    };

    // Submenu structures
    const submenus = {
        themed: [
            { name: 'Winter Treks', href: '/treks?category=winter', desc: 'Snow-covered trails & frozen alpine lakes' },
            { name: 'Monsoon Treks', href: '/treks?category=monsoon', desc: 'Lush green bugyals & vibrant rain-shadow valleys' },
            { name: 'Autumn Treks', href: '/treks?category=autumn', desc: 'Crisp mountain air & crystal clear Himalayan views' },
            { name: 'Summer Treks', href: '/treks?category=summer', desc: 'High altitude passes & pleasant meadow camping' },
            { name: 'High Altitude Treks', href: '/treks?category=high-altitude', desc: 'Challenging expeditions above 14,000 ft' },
            { name: 'Weekend Treks', href: '/treks?category=weekend', desc: 'Quick 2-4 day getaways into the wild' },
        ],
        outdoor: [
            { name: 'Experiential Learning for Schools', href: '/treks', desc: 'Curriculum-integrated outdoor leadership for students' },
            { name: 'College Adventure Programmes', href: '/treks', desc: 'Character building & wilderness survival for youth' },
            { name: 'Leadership Treks for Organizations', href: '/treks', desc: 'High-impact team building & corporate retreats' },
            { name: 'Family Outdoor Bootcamps', href: '/treks', desc: 'Safe, educational, and fun camping for families' },
        ],
        articles: [
            { name: 'Expert Trek Guides', href: '/blog', desc: 'Complete breakdown of trails, itineraries & difficulty' },
            { name: 'Gear & Equipment Tips', href: '/blog', desc: 'How to choose backpacks, shoes, and layering systems' },
            { name: 'Fitness & Training', href: '/blog', desc: 'Physical preparation & altitude acclimation guides' },
            { name: 'Himalayan Lore & Culture', href: '/blog', desc: 'Stories, history, and traditions of indigenous mountain communities' },
        ],
        documented: [
            { name: 'Uttarakhand Treks', href: '/treks?region=uttarakhand', desc: 'Explore Kedarkantha, Har Ki Dun, Dayara Bugyal & more' },
            { name: 'Himachal Treks', href: '/treks?region=himachal', desc: 'Hampta Pass, Bhrigu Lake, Pin Bhaba & scenic valleys' },
            { name: 'Kashmir Treks', href: '/treks?region=kashmir', desc: 'Kashmir Great Lakes, Tarsar Marsar & alpine paradise' },
            { name: 'Sikkim & West Bengal Treks', href: '/treks?region=sikkim', desc: 'Goechala, Sandakphu & majestic Kangchenjunga views' },
            { name: 'Nepal Treks', href: '/treks?region=nepal', desc: 'Everest Base Camp, Annapurna Circuit & legendary trails' },
        ],
        story: [
            { name: 'Who We Are', href: '/about', desc: 'Our mission, vision, and origins in Uttarkashi' },
            { name: 'The HikingPlanet Impact', href: '/about', desc: 'How we transform lives through mindful adventure' },
            { name: 'Green Trails Initiative', href: '/about', desc: 'Our commitment to sustainable & zero-waste trekking' },
            { name: 'Meet The Team', href: '/about', desc: 'Get to know our certified trek leaders & local experts' },
        ],
    };

    return (
        <header ref={navRef} className="sticky top-0 z-50 w-full flex flex-col bg-white shadow-md select-none">
            {/* ── Top Announcement Banner ── */}
            <AnimatePresence>
                {announcementOpen && (
                    <motion.div
                        initial={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-[#1C2B39] text-white px-4 py-2 flex items-center justify-between text-xs sm:text-sm overflow-hidden"
                    >
                        <div className="flex items-center gap-2 overflow-hidden max-w-[80%] md:max-w-[70%]">
                            <Megaphone weight="fill" className="text-[#e30613] w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                            <span className="truncate font-medium text-slate-100">
                                Just launched: A New 4-Day Unexplored India Travel Programme. This time, it's Unexplored Konkan
                            </span>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                            <Link
                                href="/treks"
                                className="bg-[#2B4C6F] hover:bg-[#355c85] text-white text-[11px] sm:text-xs font-bold px-3 py-1.5 rounded transition-colors whitespace-nowrap"
                            >
                                View Unexploration
                            </Link>
                            <button
                                onClick={() => setAnnouncementOpen(false)}
                                className="text-white/80 hover:text-white p-1 focus:outline-none"
                                aria-label="Close announcement"
                            >
                                <X size={16} weight="bold" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Main Navigation Bar (White) ── */}
            <div className="bg-white border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0 focus:outline-none" onClick={() => setActiveDropdown(null)}>
                    <Image
                        src="/weblogo.svg"
                        alt="HikingPlanet Logo"
                        width={264}
                        height={72}
                        className="h-10 sm:h-12 md:h-14 w-auto object-contain"
                        priority
                    />
                </Link>

                {/* Desktop Links */}
                <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-slate-900 text-xs xl:text-sm font-extrabold uppercase tracking-tight">
                    <Link href="/about" className="hover:text-[#C25E44] transition-colors py-1">Careers</Link>
                    <Link href="/contact" className="hover:text-[#C25E44] transition-colors py-1">Contact Us</Link>
                    <Link href="/treks" className="hover:text-[#C25E44] transition-colors py-1">Shop</Link>
                    <Link href="/treks" className="hover:text-[#C25E44] transition-colors py-1">Rent</Link>
                    <Link href="/about" className="hover:text-[#C25E44] transition-colors py-1">My Profile</Link>
                    
                    {/* All Treks Trigger */}
                    <div className="relative">
                        <button
                            onClick={() => toggleDropdown('allTreks')}
                            className={`flex items-center gap-1 font-black py-1 focus:outline-none transition-colors ${activeDropdown === 'allTreks' ? 'text-[#C25E44]' : 'hover:text-[#C25E44]'}`}
                        >
                            ALL TREKS
                            <CaretDown weight="bold" size={13} className={`transition-transform ${activeDropdown === 'allTreks' ? 'rotate-180' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="hidden md:flex items-center flex-1 max-w-xs xl:max-w-md relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search treks by name, region, difficulty etc"
                        className="w-full bg-slate-100 border border-slate-200 rounded-full pl-4 pr-10 py-2 text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-[#C25E44] focus:bg-white transition-all font-medium"
                    />
                    <Link
                        href={`/treks${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#E8EAEF] hover:bg-[#D5D8E0] rounded-full flex items-center justify-center text-slate-700 transition-colors focus:outline-none"
                    >
                        <MagnifyingGlass size={14} weight="bold" />
                    </Link>
                </div>

                {/* Mobile Hamburger Toggle */}
                <div className="lg:hidden flex items-center gap-2">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors bg-white focus:outline-none"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X weight="bold" size={22} /> : <List weight="bold" size={22} />}
                    </button>
                </div>
            </div>

            {/* ── Secondary Navigation Bar (Vibrant Red) ── */}
            <div className="bg-[#e30613] border-b border-red-700/30 px-4 sm:px-6 lg:px-8 py-2.5 hidden lg:flex items-center justify-center gap-6 xl:gap-10 text-white text-xs xl:text-[13px] font-black uppercase tracking-wider">
                <Link href="/treks" className="hover:text-white/80 transition-colors py-1">Upcoming Treks</Link>
                
                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('themed')}
                        className={`flex items-center gap-1 focus:outline-none transition-colors ${activeDropdown === 'themed' ? 'text-white/80' : 'hover:text-white/80'}`}
                    >
                        THEMED TREKS <CaretDown weight="bold" size={12} className={`transition-transform ${activeDropdown === 'themed' ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <Link href="/treks?category=unexplored" className="hover:text-white/80 transition-colors py-1">Unexplored India Trips</Link>

                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('outdoor')}
                        className={`flex items-center gap-1 focus:outline-none transition-colors ${activeDropdown === 'outdoor' ? 'text-white/80' : 'hover:text-white/80'}`}
                    >
                        OUTDOOR LEARNING PROGRAMMES <CaretDown weight="bold" size={12} className={`transition-transform ${activeDropdown === 'outdoor' ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('articles')}
                        className={`flex items-center gap-1 focus:outline-none transition-colors ${activeDropdown === 'articles' ? 'text-white/80' : 'hover:text-white/80'}`}
                    >
                        LATEST ARTICLES <CaretDown weight="bold" size={12} className={`transition-transform ${activeDropdown === 'articles' ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('documented')}
                        className={`flex items-center gap-1 focus:outline-none transition-colors ${activeDropdown === 'documented' ? 'text-white/80' : 'hover:text-white/80'}`}
                    >
                        DOCUMENTED TREKS <CaretDown weight="bold" size={12} className={`transition-transform ${activeDropdown === 'documented' ? 'rotate-180' : ''}`} />
                    </button>
                </div>

                <div className="relative">
                    <button
                        onClick={() => toggleDropdown('story')}
                        className={`flex items-center gap-1 focus:outline-none transition-colors ${activeDropdown === 'story' ? 'text-white/80' : 'hover:text-white/80'}`}
                    >
                        OUR STORY <CaretDown weight="bold" size={12} className={`transition-transform ${activeDropdown === 'story' ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </div>

            {/* ── Desktop Dropdown Mega-Menus ── */}
            <AnimatePresence>
                {activeDropdown && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-2xl z-50 max-h-[75vh] overflow-y-auto"
                    >
                        <div className="max-w-7xl mx-auto p-6 md:p-8">
                            {/* All Treks Mega Menu */}
                            {activeDropdown === 'allTreks' && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div>
                                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C25E44] mb-4 pb-2 border-b border-slate-100">
                                            Treks by Name
                                        </h3>
                                        <div className="flex flex-col gap-2 max-h-[360px] overflow-y-auto pr-2">
                                            {byName.slice(0, 15).map((t) => (
                                                <Link
                                                    key={t.slug}
                                                    href={`/treks/${t.slug}`}
                                                    onClick={() => setActiveDropdown(null)}
                                                    className="text-sm font-bold text-slate-700 hover:text-[#C25E44] transition-colors py-1"
                                                >
                                                    {t.title}
                                                </Link>
                                            ))}
                                            <Link href="/treks" onClick={() => setActiveDropdown(null)} className="text-xs font-extrabold text-[#C25E44] hover:underline mt-2 pt-2 border-t border-slate-100">
                                                VIEW ALL TREKS →
                                            </Link>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#C25E44] mb-4 pb-2 border-b border-slate-100">
                                            Treks by Difficulty
                                        </h3>
                                        <div className="flex flex-col gap-6">
                                            {Object.entries(byDifficulty).map(([level, lTreks]) => lTreks.length > 0 && (
                                                <div key={level}>
                                                    <div className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">{level}</div>
                                                    <div className="flex flex-col gap-1.5">
                                                        {lTreks.slice(0, 4).map((t: any) => (
                                                            <Link key={t.slug} href={`/treks/${t.slug}`} onClick={() => setActiveDropdown(null)} className="text-sm font-bold text-slate-700 hover:text-[#C25E44] transition-colors">
                                                                {t.title} <span className="text-xs font-normal text-slate-400 ml-1">({t.duration}D)</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-black text-slate-900 mb-2 uppercase tracking-wide">Need Help Choosing?</h3>
                                            <p className="text-xs text-slate-600 leading-relaxed mb-6">
                                                Our seasoned trek coordinators can help match you with the perfect Himalayan expedition based on your fitness and experience.
                                            </p>
                                        </div>
                                        <Link
                                            href="/contact"
                                            onClick={() => setActiveDropdown(null)}
                                            className="w-full py-3 bg-[#C25E44] hover:bg-[#a84e37] text-white text-xs font-black rounded-lg text-center uppercase tracking-wider transition-all shadow-md"
                                        >
                                            Get Expert Advice
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {/* Generic Submenus */}
                            {activeDropdown !== 'allTreks' && submenus[activeDropdown as keyof typeof submenus] && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {submenus[activeDropdown as keyof typeof submenus].map((item, idx) => (
                                        <Link
                                            key={idx}
                                            href={item.href}
                                            onClick={() => setActiveDropdown(null)}
                                            className="p-4 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                                        >
                                            <div className="text-sm font-black text-slate-900 group-hover:text-[#C25E44] transition-colors mb-1">
                                                {item.name}
                                            </div>
                                            <div className="text-xs text-slate-500 leading-relaxed font-medium">
                                                {item.desc}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Mobile Navigation Drawer ── */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 top-[110px] bg-white z-40 flex flex-col overflow-y-auto lg:hidden border-t border-slate-200"
                    >
                        {/* Search in mobile menu */}
                        <div className="p-4 border-b border-slate-100 bg-slate-50 md:hidden">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search treks..."
                                    className="w-full bg-white border border-slate-200 rounded-full pl-4 pr-10 py-2 text-xs text-slate-800 placeholder-slate-500 focus:outline-none focus:border-[#C25E44]"
                                />
                                <Link
                                    href={`/treks${searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ''}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 bg-[#E8EAEF] rounded-full flex items-center justify-center text-slate-700"
                                >
                                    <MagnifyingGlass size={14} weight="bold" />
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Accordion Links */}
                        <div className="flex flex-col divide-y divide-slate-100 text-slate-900 font-extrabold text-xs uppercase tracking-wider">
                            <Link href="/treks" onClick={() => setMobileMenuOpen(false)} className="p-4 hover:bg-slate-50">Upcoming Treks</Link>
                            
                            {/* Themed Treks */}
                            <div>
                                <button onClick={() => toggleMobileTab('themed')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 focus:outline-none">
                                    <span>Themed Treks</span>
                                    <CaretDown size={14} weight="bold" className={`transition-transform ${activeMobileTab === 'themed' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeMobileTab === 'themed' && (
                                    <div className="bg-slate-50 px-6 py-2 flex flex-col gap-3 font-semibold text-slate-600 capitalize text-xs">
                                        {submenus.themed.map((sub, i) => (
                                            <Link key={i} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#C25E44]">{sub.name}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <Link href="/treks?category=unexplored" onClick={() => setMobileMenuOpen(false)} className="p-4 hover:bg-slate-50">Unexplored India Trips</Link>

                            {/* Outdoor Learning */}
                            <div>
                                <button onClick={() => toggleMobileTab('outdoor')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 focus:outline-none">
                                    <span>Outdoor Learning Programmes</span>
                                    <CaretDown size={14} weight="bold" className={`transition-transform ${activeMobileTab === 'outdoor' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeMobileTab === 'outdoor' && (
                                    <div className="bg-slate-50 px-6 py-2 flex flex-col gap-3 font-semibold text-slate-600 capitalize text-xs">
                                        {submenus.outdoor.map((sub, i) => (
                                            <Link key={i} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#C25E44]">{sub.name}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Latest Articles */}
                            <div>
                                <button onClick={() => toggleMobileTab('articles')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 focus:outline-none">
                                    <span>Latest Articles</span>
                                    <CaretDown size={14} weight="bold" className={`transition-transform ${activeMobileTab === 'articles' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeMobileTab === 'articles' && (
                                    <div className="bg-slate-50 px-6 py-2 flex flex-col gap-3 font-semibold text-slate-600 capitalize text-xs">
                                        {submenus.articles.map((sub, i) => (
                                            <Link key={i} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#C25E44]">{sub.name}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Documented Treks */}
                            <div>
                                <button onClick={() => toggleMobileTab('documented')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 focus:outline-none">
                                    <span>Documented Treks</span>
                                    <CaretDown size={14} weight="bold" className={`transition-transform ${activeMobileTab === 'documented' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeMobileTab === 'documented' && (
                                    <div className="bg-slate-50 px-6 py-2 flex flex-col gap-3 font-semibold text-slate-600 capitalize text-xs">
                                        {submenus.documented.map((sub, i) => (
                                            <Link key={i} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#C25E44]">{sub.name}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Our Story */}
                            <div>
                                <button onClick={() => toggleMobileTab('story')} className="w-full p-4 flex items-center justify-between hover:bg-slate-50 focus:outline-none">
                                    <span>Our Story</span>
                                    <CaretDown size={14} weight="bold" className={`transition-transform ${activeMobileTab === 'story' ? 'rotate-180' : ''}`} />
                                </button>
                                {activeMobileTab === 'story' && (
                                    <div className="bg-slate-50 px-6 py-2 flex flex-col gap-3 font-semibold text-slate-600 capitalize text-xs">
                                        {submenus.story.map((sub, i) => (
                                            <Link key={i} href={sub.href} onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#C25E44]">{sub.name}</Link>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Top links for mobile */}
                            <div className="p-4 bg-slate-100 grid grid-cols-2 gap-4 text-center text-xs font-black text-slate-700">
                                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white rounded shadow-sm hover:text-[#C25E44]">Careers</Link>
                                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white rounded shadow-sm hover:text-[#C25E44]">Contact Us</Link>
                                <Link href="/treks" onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white rounded shadow-sm hover:text-[#C25E44]">Shop</Link>
                                <Link href="/treks" onClick={() => setMobileMenuOpen(false)} className="p-2 bg-white rounded shadow-sm hover:text-[#C25E44]">Rent</Link>
                                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="col-span-2 p-2 bg-white rounded shadow-sm hover:text-[#C25E44]">My Profile</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
