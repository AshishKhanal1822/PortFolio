import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { images } from '../data/assets';
import { useState, useEffect } from 'react';

const MagicText = () => {
    const letters = "Magic".split("");
    const [index, setIndex] = useState(0);
    const modes = ['fall', 'blocks', 'flip', 'slide'] as const;

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % modes.length);
        }, 4000); // Cycle every 4 seconds
        return () => clearInterval(interval);
    }, []);

    const currentMode = modes[index];

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: {
                staggerChildren: 0.05,
                staggerDirection: -1
            }
        }
    } as const;

    const variants = {
        fall: {
            hidden: { y: -60, opacity: 0, rotate: -20 },
            visible: { y: 0, opacity: 1, rotate: 0, transition: { type: "spring", bounce: 0.5 } },
            exit: { y: 30, opacity: 0, rotate: 20 }
        },
        blocks: {
            hidden: { y: 40, opacity: 0, scale: 0 },
            visible: { y: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200 } },
            exit: { y: -40, opacity: 0, scale: 0.5 }
        },
        flip: {
            hidden: { rotateX: -90, opacity: 0 },
            visible: { rotateX: 0, opacity: 1, transition: { duration: 0.6 } },
            exit: { rotateX: 90, opacity: 0 }
        },
        slide: {
            hidden: { x: -30, opacity: 0, skewX: -20 },
            visible: { x: 0, opacity: 1, skewX: 0, transition: { type: "spring", damping: 12 } },
            exit: { x: 30, opacity: 0, skewX: 20 }
        }
    } as const;

    return (
        <span className="relative inline-flex pb-2 min-w-[150px] justify-center" style={{ perspective: '1000px' }}>
            <AnimatePresence mode="wait">
                <motion.span
                    key={currentMode}
                    variants={container}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="inline-flex text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 filter drop-shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                >
                    {letters.map((letter, i) => (
                        <motion.span
                            key={i}
                            variants={variants[currentMode]}
                            className="inline-block"
                            style={{ transformOrigin: 'center center' }}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const Marquee = ({ images, direction, speed, className }: { images: string[], direction: 'left' | 'right', speed: number, className?: string }) => {
    return (
        <div className={`flex w-full overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div
                className="flex gap-6 shrink-0 w-max"
                initial={{ x: direction === 'left' ? 0 : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                {/* Quadruple duplication to ensure coverage on large screens */}
                {[...images, ...images, ...images, ...images].map((img, i) => (
                    <div key={i} className="w-[300px] h-[200px] shrink-0 rounded-2xl overflow-hidden border border-white/20 shadow-2xl relative bg-[#1a1a1a]">
                        <div className="absolute inset-0 bg-black/10 z-[1]" />
                        <img src={img} alt="" className="w-full h-full object-cover opacity-100 hover:grayscale-0 transition-all duration-500" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

const Hero = () => {
    const { thumbnails } = images.hero;
    return (
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#030014]">

            {/* 1. Dynamic Background Blobs */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[120px]" />
                <div className="absolute bottom-[20%] right-[-5%] w-[400px] h-[400px] bg-blue-600/30 rounded-full blur-[120px]" />
            </div>

            {/* 2. Moving Project Layers (Z-0, but above background) */}
            <div className="absolute inset-0 z-[1] flex flex-col justify-center gap-8 opacity-100 pointer-events-none rotate-[-6deg] scale-[1.15] origin-center">
                <Marquee images={thumbnails.slice(0, 4)} direction="left" speed={25} />
                <Marquee images={thumbnails.slice(4)} direction="right" speed={30} className="-ml-24" />
                <Marquee images={thumbnails} direction="left" speed={35} />
            </div>

            {/* 3. Gradient Overlay */}
            {/* Lighter overlay to ensure text legibility while keeping images visible */}
            <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#030014] via-transparent to-[#030014]/60" />
            <div className="absolute inset-0 z-[2] bg-gradient-to-b from-[#030014]/80 via-transparent to-[#030014]/80" />
            <div className="absolute inset-0 z-[2] bg-black/10 backdrop-blur-[1px]" />


            {/* 4. Main Content (Z-10) */}
            <div className="container px-6 relative z-10 text-center flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 mb-8 backdrop-blur-md shadow-lg"
                >
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-gray-200">Available for Freelance Projects</span>
                </motion.div>

                <motion.h1
                    className="text-6xl md:text-8xl lg:text-9xl font-bold font-display leading-[1.1] mb-8 tracking-tighter drop-shadow-2xl"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    Creating <MagicText /> <br />
                    for <span className="text-white drop-shadow-lg">Digital Brands.</span>
                </motion.h1>

                <motion.p
                    className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    I help you grab your audience's attention with premium web design,
                    strategic development, and visuals that convert.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <a href="#work" className="px-10 py-4 rounded-full bg-white text-black font-bold text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        View My Work
                    </a>
                    <a href="#contact" className="px-10 py-4 rounded-full bg-black/40 border border-white/20 text-white font-semibold backdrop-blur-md hover:bg-white/10 transition-all">
                        Contact Me
                    </a>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ArrowDown className="w-6 h-6" />
            </motion.div>
        </section>
    );
};

export default Hero;
