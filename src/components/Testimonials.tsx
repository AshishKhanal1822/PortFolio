import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { images } from '../data/assets';

const Testimonials = () => {
    return (
        <section id="testimonials" className="section-padding bg-black relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px]" />

            <div className="container relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4"
                    >
                        Client <span className="text-gradient">Stories</span>
                    </motion.h2>
                    <p className="text-gray-400">Whatever your goal, we'll help you get there.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {images.testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-[#121212] p-8 rounded-2xl border border-gray-800 relative hover:border-purple-500/30 transition-colors"
                        >
                            <Quote className="w-10 h-10 text-purple-600/20 absolute top-6 right-6" />

                            <div className="flex gap-1 mb-6 text-yellow-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            <p className="text-gray-300 mb-8 leading-relaxed">"{item.content}"</p>

                            <div className="flex items-center gap-4">
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full border-2 border-gray-800" />
                                <div>
                                    <h4 className="font-bold text-white">{item.name}</h4>
                                    <p className="text-sm text-gray-500">{item.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
