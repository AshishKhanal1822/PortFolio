import { motion } from 'framer-motion';
import { images } from '../data/assets';

const About = () => {
    return (
        <section id="about" className="py-24 bg-[#030014] overflow-hidden">
            <div className="container px-6">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Abstract Shapes */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

                        <div className="relative rounded-2xl overflow-hidden border border-white/10 max-w-sm mx-auto">
                            <img
                                src={images.about.portrait}
                                alt="Prafull Pradhan"
                                className="w-full h-full object-cover transition-all duration-500"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                            Who is <span className="text-gradient">Prafull?</span>
                        </h2>
                        <h3 className="text-2xl text-white font-medium mb-6">
                            Designer. Developer. Strategist.
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed mb-6">
                            Hi, I'm Prafull, a passionate & creative Graphic Designer with 5 years of experience dedicated to transforming ideas into visually compelling experiences. With a strong foundation in design principles and a keen eye for aesthetics, I specialize in branding, digital illustrations, marketing visuals, and user-centric designs. My approach combines creativity with strategic thinking to craft visuals that not only look great but also communicate effectively. I help businesses scale through purposeful design and innovative creative direction. Let’s build something extraordinary.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed mb-8">
                            My approach is simple: I treat every project as my own. Whether it's a minimal thumbnail or a complex designs,
                            I bring maximum effort and attention to detail.
                        </p>

                        <div className="grid grid-cols-2 gap-8 mb-12">
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1">5+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Years Experience</p>
                            </div>
                            <div>
                                <h4 className="text-3xl font-bold text-white mb-1">100+</h4>
                                <p className="text-sm text-gray-500 uppercase tracking-widest">Projects Done</p>
                            </div>
                        </div>

                        {/* Skills/Tools */}
                        <div>
                            <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                <span className="w-8 h-px bg-pink-500" />
                                Tools & Expertise
                            </h4>
                            <div className="flex flex-wrap gap-2">
                                {["Adobe Photoshop", "Adobe Illustrator", "Figma", "Adobe InDesign", "Canva", "Branding"].map((skill, i) => (
                                    <motion.span
                                        key={skill}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 * i }}
                                        className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-gray-300 text-sm hover:bg-white/10 hover:border-pink-500/50 hover:text-white transition-all cursor-default"
                                    >
                                        {skill}
                                    </motion.span>
                                ))}
                            </div>
                        </div>


                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
