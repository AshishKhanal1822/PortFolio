import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { images } from '../data/assets';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Work = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const workItems = images.work;

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = workItems.length - 1;
            if (nextIndex >= workItems.length) nextIndex = 0;
            return nextIndex;
        });
    }, [workItems.length]);

    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(() => paginate(1), 5000);
        return () => clearInterval(timer);
    }, [isAutoPlaying, paginate]);

    // Get indices for prev, current, and next
    const getPrevIndex = () => {
        return currentIndex === 0 ? workItems.length - 1 : currentIndex - 1;
    };

    const getNextIndex = () => {
        return currentIndex === workItems.length - 1 ? 0 : currentIndex + 1;
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') paginate(-1);
            if (e.key === 'ArrowRight') paginate(1);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex, paginate]);

    const dragTransition = {
        type: "spring",
        stiffness: 300,
        damping: 30
    } as const;

    return (
        <section
            id="work"
            className="py-24 bg-[#05021a] relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
        >
            {/* Ambient Background Light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
                            All <span className="text-gradient">Works.</span>
                        </h2>
                        <p className="text-gray-400">Dive into the full archive of my digital creations.</p>
                    </motion.div>
                </div>

                {/* Carousel Container */}
                <div className="relative max-w-7xl mx-auto">
                    <div className="relative h-[450px] md:h-[600px] flex items-center justify-center">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={currentIndex}
                                custom={direction}
                                initial={{ x: direction > 0 ? 500 : -500, opacity: 0, scale: 0.9 }}
                                animate={{ x: 0, opacity: 1, scale: 1 }}
                                exit={{ x: direction > 0 ? -500 : 500, opacity: 0, scale: 0.9 }}
                                transition={dragTransition}
                                drag="x"
                                dragConstraints={{ left: 0, right: 0 }}
                                dragElastic={1}
                                onDragEnd={(_, info) => {
                                    if (info.offset.x > 100) paginate(-1);
                                    else if (info.offset.x < -100) paginate(1);
                                }}
                                className="absolute flex items-center justify-center gap-4 md:gap-8 w-full cursor-grab active:cursor-grabbing"
                            >
                                {/* Previous Card (Left Peek) */}
                                <div className="hidden lg:block w-1/4 opacity-40 scale-75 blur-[1px] transition-all">
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 grayscale">
                                        <img
                                            src={workItems[getPrevIndex()].image}
                                            alt="Previous"
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                    </div>
                                </div>

                                {/* Current Card (Main) */}
                                <div className="w-full md:w-2/3 lg:w-1/2 h-full">
                                    <div className="relative aspect-[16/10] md:aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity" />
                                        <img
                                            src={workItems[currentIndex].image}
                                            alt={workItems[currentIndex].title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            draggable={false}
                                        />

                                        {/* Card Info Overlay */}
                                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12">
                                            <motion.span
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="text-pink-500 font-medium uppercase tracking-[0.2em] text-xs md:text-sm mb-2"
                                            >
                                                {workItems[currentIndex].category}
                                            </motion.span>
                                            <motion.h3
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="text-2xl md:text-5xl font-bold text-white tracking-tight"
                                            >
                                                {workItems[currentIndex].title}
                                            </motion.h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Next Card (Right Peek) */}
                                <div className="hidden lg:block w-1/4 opacity-40 scale-75 blur-[1px] transition-all">
                                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/5 grayscale">
                                        <img
                                            src={workItems[getNextIndex()].image}
                                            alt="Next"
                                            className="w-full h-full object-cover"
                                            draggable={false}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 pointer-events-none z-30">
                        <button
                            onClick={() => paginate(-1)}
                            className="pointer-events-auto bg-black/50 hover:bg-pink-500 backdrop-blur-md p-4 rounded-full transition-all border border-white/10 group"
                            aria-label="Prev"
                        >
                            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </button>
                        <button
                            onClick={() => paginate(1)}
                            className="pointer-events-auto bg-black/50 hover:bg-pink-500 backdrop-blur-md p-4 rounded-full transition-all border border-white/10 group"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="mt-12 flex flex-col items-center">
                    <div className="flex gap-3">
                        {workItems.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    setDirection(index > currentIndex ? 1 : -1);
                                    setCurrentIndex(index);
                                }}
                                className={`h-1 rounded-full transition-all duration-500 ${index === currentIndex
                                    ? 'w-12 bg-gradient-to-r from-pink-500 to-purple-500'
                                    : 'w-4 bg-white/10 hover:bg-white/30'
                                    }`}
                            />
                        ))}
                    </div>
                    <span className="text-gray-500 text-sm mt-6 font-medium tracking-widest">
                        {String(currentIndex + 1).padStart(2, '0')} / {String(workItems.length).padStart(2, '0')}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Work;
