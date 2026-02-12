import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { images } from '../data/assets';
import { Calendar, User, Code, Eye } from 'lucide-react';

const Featured = () => {
    const [selectedProject, setSelectedProject] = useState<any>(null);

    // Block body scroll when modal is open
    useEffect(() => {
        if (selectedProject) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedProject]);

    return (
        <section id="featured" className="py-24 bg-[#030014]">
            {/* Featured Works Section */}
            <div className="container px-6 mb-24">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Featured <span className="text-gray-600">Works.</span></h2>
                    <p className="text-gray-400 max-w-lg mx-auto">A selection of projects that I'm particularly proud of, showcasing range and depth.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {images.featured.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative rounded-2xl overflow-hidden cursor-pointer"
                            onClick={() => setSelectedProject(item)}
                        >
                            <div className="aspect-[4/3] overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                                <p className="text-sm font-medium text-pink-500 mb-1 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{item.category}</p>
                                <h3 className="text-xl font-bold text-white translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
                            </div>

                            {/* Click Indicator */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <Eye className="w-12 h-12 text-white mx-auto mb-2" />
                                    <p className="text-white font-semibold text-lg">View Details</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Logo Marquee */}
            <div className="overflow-hidden py-10 border-y border-white/5 bg-white/5 backdrop-blur-sm">
                <motion.div
                    className="flex items-center gap-20 w-max"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...images.logos, ...images.logos, ...images.logos].map((logo, index) => (
                        <img
                            key={index}
                            src={logo}
                            alt="Company Logo"
                            className="h-8 md:h-12 w-auto object-contain brightness-0 invert opacity-50 hover:opacity-100 transition-opacity"
                        />
                    ))}
                </motion.div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
                        >
                            {/* Modal Frame */}
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="relative w-full max-w-3xl bg-[#030014] rounded-2xl border border-white/10 overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                            >
                                {/* Hero Image */}
                                <div className="relative h-[250px] overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10" />
                                    <img
                                        src={selectedProject.image}
                                        alt={selectedProject.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="p-8 md:p-10">
                                    {/* Category Badge */}
                                    <span className="inline-block px-4 py-1 bg-pink-500/20 text-pink-500 rounded-full text-sm font-medium mb-4">
                                        {selectedProject.category}
                                    </span>

                                    {/* Title */}
                                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        {selectedProject.title}
                                    </h2>

                                    {/* Short Description */}
                                    <p className="text-gray-400 text-lg mb-8">
                                        {selectedProject.description}
                                    </p>

                                    {/* Project Info Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 p-6 bg-white/5 rounded-xl border border-white/10">
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                                <User className="w-5 h-5 text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">Client</p>
                                                <p className="text-white font-semibold">{selectedProject.client}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                                <Calendar className="w-5 h-5 text-purple-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">Duration</p>
                                                <p className="text-white font-semibold">{selectedProject.duration}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 bg-pink-500/20 rounded-lg">
                                                <Code className="w-5 h-5 text-pink-500" />
                                            </div>
                                            <div>
                                                <p className="text-gray-500 text-sm">Role</p>
                                                <p className="text-white font-semibold">Lead Designer</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Long Description */}
                                    <div className="mb-8">
                                        <h3 className="text-xl font-bold text-white mb-4">About the Project</h3>
                                        <p className="text-gray-400 leading-relaxed">
                                            {selectedProject.longDescription}
                                        </p>
                                    </div>

                                    {/* Technologies */}
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies.map((tech: string, index: number) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 rounded-lg text-white text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Featured;
