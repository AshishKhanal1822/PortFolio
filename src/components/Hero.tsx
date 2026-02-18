import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { images } from '../data/assets';

const MagicText = () => {
    return (
        <span className="relative inline-flex pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 filter drop-shadow-[0_0_20px_rgba(124,58,237,0.5)]">
            Magic
        </span>
    );
};

const Marquee = ({ images, direction, speed, className }: { images: string[], direction: 'left' | 'right', speed: number, className?: string }) => {
    return (
        <div className={`flex w-full overflow-hidden whitespace-nowrap ${className}`}>
            <motion.div
                className="flex shrink-0 w-max"
                initial={{ x: direction === 'left' ? 0 : '-50%' }}
                animate={{ x: direction === 'left' ? '-50%' : 0 }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear"
                }}
                style={{ willChange: 'transform' }}
            >
                {/* 8x duplication handles any screen size including triple-monitors or ultra-wides without popping */}
                {[...images, ...images, ...images, ...images, ...images, ...images, ...images, ...images].map((img, i) => (
                    <div key={i} className="w-[200px] h-[300px] pr-6 shrink-0 rounded-2xl overflow-hidden shadow-2xl relative">
                        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/20 bg-[#1a1a1a]">
                            <div className="absolute inset-0 bg-black/10 z-[1]" />
                            <img
                                src={img}
                                alt=""
                                loading="lazy"
                                className="w-full h-full object-cover opacity-100"
                            />
                        </div>
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
            <div
                className="absolute inset-0 z-[1] flex flex-col justify-center gap-8 opacity-100 pointer-events-none rotate-[-6deg] scale-[1.15] origin-center"
                style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
            >
                <Marquee images={thumbnails} direction="left" speed={80} />
                <Marquee images={thumbnails} direction="right" speed={90} className="-ml-24" />
                <Marquee images={thumbnails} direction="left" speed={100} />
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
                    I help you grab your audience's attention with premium thumbnails,
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
