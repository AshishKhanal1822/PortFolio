import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Home', href: '#home' },
        { name: 'Featured', href: '#featured' }, // "App" from implied context, user asked for "Featured"
        { name: 'My Work', href: '#work' },
        { name: 'About Me', href: '#about' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Pricing', href: '#plans' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'
                    }`}
            >
                <div className="container mx-auto px-6">
                    <div className={`glass-nav rounded-full px-6 py-3 flex items-center justify-between shadow-lg shadow-purple-500/10`}>
                        {/* Logo */}
                        <a href="#" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center font-bold text-white text-lg font-display">
                                P
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight hidden sm:block">
                                Prafull<span className="text-purple-500">.</span>
                            </span>
                        </a>

                        {/* Desktop Links */}
                        <ul className="hidden md:flex items-center gap-8">
                            {links.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm font-medium text-gray-300 hover:text-white hover:text-shadow-glow transition-all relative group"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all group-hover:w-full" />
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* CTA / Mobile Toggle */}
                        <div className="flex items-center gap-4">
                            <a
                                href="#plans"
                                className="hidden md:block px-5 py-2 rounded-full bg-white text-black font-semibold text-sm hover:scale-105 transition-transform"
                            >
                                Hire Me
                            </a>
                            <button
                                className="md:hidden text-white p-1"
                                onClick={() => setIsMobileOpen(true)}
                            >
                                <Menu size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-[#030014] flex flex-col items-center justify-center"
                    >
                        <button
                            onClick={() => setIsMobileOpen(false)}
                            className="absolute top-8 right-8 text-gray-400 hover:text-white"
                        >
                            <X size={32} />
                        </button>

                        <div className="flex flex-col gap-8 text-center">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 hover:to-purple-400 transition-all"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
