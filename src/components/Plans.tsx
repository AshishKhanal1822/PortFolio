import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const Plans = () => {
    const plans = [
        {
            name: 'Starter',
            price: '$500',
            period: 'per project',
            description: 'Perfect for small projects and startups looking for quality design.',
            features: [
                'Responsive web design',
                'Up to 5 pages',
                'Basic SEO optimization',
                'Mobile-first approach',
                '2 rounds of revisions',
                'Source files included',
                'Basic support',
                '1 month maintenance'
            ],
            popular: false,
            gradient: 'from-blue-500/10 to-purple-500/10',
            borderGradient: 'from-blue-500 to-purple-500'
        },
        {
            name: 'Professional',
            price: '$1,500',
            period: 'per project',
            description: 'Ideal for growing businesses that need advanced features and design.',
            features: [
                'Everything in Starter',
                'Up to 15 pages',
                'Advanced animations',
                'CMS integration',
                'Performance optimization',
                'Unlimited revisions',
                'Priority support',
                '3 months maintenance'
            ],
            popular: true,
            gradient: 'from-pink-500/10 to-orange-500/10',
            borderGradient: 'from-pink-500 to-orange-500'
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: 'custom quote',
            description: 'For large-scale projects requiring full-stack development and ongoing support.',
            features: [
                'Everything in Professional',
                'Unlimited pages',
                'Custom functionality',
                'API development',
                'Database design',
                'Team collaboration',
                'Dedicated support',
                '12 months maintenance'
            ],
            popular: false,
            gradient: 'from-purple-500/10 to-blue-500/10',
            borderGradient: 'from-purple-500 to-blue-500'
        }
    ];

    const scrollToContact = (planName: string) => {
        // Store the selected plan in sessionStorage
        sessionStorage.setItem('selectedPlan', planName);

        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });

            // Trigger a custom event to notify the contact form
            window.dispatchEvent(new CustomEvent('planSelected', { detail: { plan: planName } }));
        }
    };

    return (
        <section id="plans" className="py-24 bg-[#05021a] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />

            <div className="container px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-pink-500 font-medium mb-4 uppercase tracking-widest text-sm"
                    >
                        Pricing Plans
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-display font-bold mb-4"
                    >
                        Flexible Plans for <span className="text-gradient">Growth</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Transparent pricing designed to fit your requirements. Choose the plan that works best for your project.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 md:gap-6 max-w-7xl mx-auto items-center">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative group ${plan.popular
                                ? 'md:scale-110 z-10 w-full'
                                : 'md:scale-85 opacity-70 hover:opacity-100 hover:scale-90 md:max-w-[340px] mx-auto'} transition-all duration-500`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                                    <span className="bg-gradient-to-r from-pink-500 to-orange-500 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-pink-500/20 text-nowrap">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            {/* Card */}
                            <div
                                className={`relative h-full rounded-2xl border transition-all duration-300 ${plan.popular
                                    ? 'p-8 border-pink-500/50 bg-gradient-to-b from-pink-500/10 to-transparent shadow-2xl shadow-pink-500/10'
                                    : 'p-5 border-white/10 bg-white/5 backdrop-blur-sm'
                                    }`}
                            >
                                {/* Gradient Border Effect */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${plan.borderGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl`} />

                                <div className="relative z-10">
                                    {/* Plan Header */}
                                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                                    <div className="min-h-[80px] flex flex-col justify-center mb-4">
                                        <div className="flex items-baseline gap-1">
                                            <span className={`font-bold text-white leading-none ${plan.price === 'Custom' ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'}`}>
                                                {plan.price}
                                            </span>
                                            <span className="text-gray-400 text-sm whitespace-nowrap">/ {plan.period}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-400 mb-8 min-h-[80px] flex items-start text-sm">{plan.description}</p>

                                    {/* CTA Button */}
                                    <button
                                        onClick={() => scrollToContact(plan.name)}
                                        className={`w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn ${plan.popular
                                            ? 'bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105'
                                            : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                            }`}
                                    >
                                        Get Started
                                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>

                                    {/* Features List */}
                                    <div className="mt-8 space-y-4">
                                        {plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <div className={`mt-1 rounded-full p-1 bg-gradient-to-r ${plan.borderGradient}`}>
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                                <span className="text-gray-300 text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-400">
                        Need a custom solution? <button onClick={() => scrollToContact('Enterprise')} className="text-pink-500 hover:text-pink-400 font-semibold underline">Let's talk</button>
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default Plans;
