import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    // Listen for plan selection from Plans component
    useEffect(() => {
        const handlePlanSelected = (event: CustomEvent) => {
            const planName = event.detail.plan;
            let budgetValue = '';

            // Map plan names to budget ranges
            switch (planName) {
                case 'Starter':
                    budgetValue = '$500';
                    break;
                case 'Professional':
                    budgetValue = '$1,500';
                    break;
                case 'Enterprise':
                    budgetValue = 'Custom';
                    break;
                default:
                    budgetValue = '';
            }

            setFormData(prev => ({
                ...prev,
                budget: budgetValue
            }));
        };

        window.addEventListener('planSelected', handlePlanSelected as EventListener);

        // Check sessionStorage on mount
        const selectedPlan = sessionStorage.getItem('selectedPlan');
        if (selectedPlan) {
            handlePlanSelected(new CustomEvent('planSelected', { detail: { plan: selectedPlan } }));
            sessionStorage.removeItem('selectedPlan');
        }

        return () => {
            window.removeEventListener('planSelected', handlePlanSelected as EventListener);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Real-time Nepal Phone Validation
        if (name === 'phone') {
            if (value === '') {
                setPhoneError('');
            } else {
                const phoneRegex = /^(98|97)\d{8}$/;
                // Check if it's potentially valid or already fully valid
                if (!/^(9|98|97)\d*$/.test(value)) {
                    setPhoneError('Number must start with 98 or 97');
                } else if (value.length > 0 && !value.startsWith('98') && !value.startsWith('97') && value.length >= 2) {
                    setPhoneError('Number must start with 98 or 97');
                } else if (value.length > 10) {
                    setPhoneError('Phone number cannot exceed 10 digits');
                } else if (value.length === 10 && !phoneRegex.test(value)) {
                    setPhoneError('Invalid format. Must be 10 digits starting with 98 or 97');
                } else if (value.length < 10 && value.length > 0) {
                    // Provide a subtle hint or wait until 10 digits to show error? 
                    // Let's show "Too short" if they've typed a bit but not enough
                    if (value.length >= 3) {
                        setPhoneError('Phone number must be 10 digits');
                    } else {
                        setPhoneError('');
                    }
                } else {
                    setPhoneError('');
                }
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Nepal Phone Validation
        const phoneRegex = /^(98|97)\d{8}$/;
        if (formData.phone && !phoneRegex.test(formData.phone)) {
            setPhoneError('Please enter a valid Nepal phone number starting with 98 or 97 (10 digits).');
            return;
        }

        setIsSubmitting(true);

        try {
            // Using environment variables for security
            const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
            const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
            const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                phone: formData.phone,
                service: formData.service,
                budget: formData.budget,
                message: formData.message,
                to_name: "Prafull", // You can change this to your name
            };

            await emailjs.send(
                SERVICE_ID,
                TEMPLATE_ID,
                templateParams,
                PUBLIC_KEY
            );

            setIsSubmitted(true);

            // Optional: Reset form after success
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                budget: '',
                message: ''
            });
        } catch (error) {
            console.error("EmailJS Error:", error);
            alert("Oops! Something went wrong. Please try again or email me directly at hello@prafull.com");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-24 bg-[#030014] relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
            <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl" />

            <div className="container px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-pink-500 font-medium mb-4 uppercase tracking-widest text-sm"
                    >
                        Get In Touch
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-display font-bold mb-4"
                    >
                        Let's Work <span className="text-gradient">Together</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-2xl mx-auto"
                    >
                        Have a project in mind? Fill out the form below and I'll get back to you within 24 hours.
                    </motion.p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                                >
                                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-500" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                                    <p className="text-gray-400 max-w-sm">
                                        Thank you for reaching out! I've received your message and will get back to you within 24 hours.
                                    </p>
                                    <motion.div
                                        className="mt-8 h-1 bg-green-500/30 rounded-full overflow-hidden w-48"
                                        initial={{ width: 0 }}
                                        animate={{ width: 192 }}
                                        transition={{ duration: 3 }}
                                    />
                                </motion.div>
                            ) : (
                                <form key="form" onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                                Email Address *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition-all ${phoneError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-pink-500 focus:ring-pink-500/20'
                                                    }`}
                                                placeholder="98XXXXXXXX / 97XXXXXXXX"
                                            />
                                            {phoneError && (
                                                <p className="mt-1 text-xs text-red-500">{phoneError}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Service & Budget */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                                                Service Needed *
                                            </label>
                                            <select
                                                id="service"
                                                name="service"
                                                value={formData.service}
                                                onChange={handleChange}
                                                required
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                                            >
                                                <option value="" className="bg-[#030014]">Select a service</option>
                                                <option value="web-design" className="bg-[#030014]">Web Design</option>
                                                <option value="web-development" className="bg-[#030014]">Web Development</option>
                                                <option value="ui-ux" className="bg-[#030014]">UI/UX Design</option>
                                                <option value="branding" className="bg-[#030014]">Branding</option>
                                                <option value="consultation" className="bg-[#030014]">Consultation</option>
                                                <option value="other" className="bg-[#030014]">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="budget" className="block text-sm font-medium text-gray-300 mb-2">
                                                Budget Range
                                            </label>
                                            <select
                                                id="budget"
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all"
                                            >
                                                <option value="" className="bg-[#030014]">Select budget</option>
                                                <option value="$500" className="bg-[#030014]">$500 (Starter)</option>
                                                <option value="$1,500" className="bg-[#030014]">$1,500 (Professional)</option>
                                                <option value="Custom" className="bg-[#030014]">Custom (Enterprise)</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                                            Project Details *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={5}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all resize-none"
                                            placeholder="Tell me about your project, goals, and timeline..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-4 px-6 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                Send Message
                                                <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2 space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                            <p className="text-gray-400 mb-8">
                                Feel free to reach out through any of these channels. I'm always excited to discuss new projects and opportunities.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-pink-500/50 transition-all group">
                                <div className="p-3 bg-gradient-to-r from-pink-500 to-orange-500 rounded-lg group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Email</h4>
                                    <a href="mailto:prafulpradhan104@gmail.com" className="text-gray-400 hover:text-pink-500 transition-colors">
                                        prafulpradhan104@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-pink-500/50 transition-all group">
                                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform">
                                    <Phone className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Phone</h4>
                                    <a href="tel:+9779800000000" className="text-gray-400 hover:text-pink-500 transition-colors">
                                        +977 9800000000
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:border-pink-500/50 transition-all group">
                                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg group-hover:scale-110 transition-transform">
                                    <MapPin className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-1">Location</h4>
                                    <p className="text-gray-400">Kathmandu, Nepal</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="pt-8 border-t border-white/10">
                            <h4 className="text-white font-semibold mb-4">Follow Me</h4>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.instagram.com/ji_prafull_pradhan?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                    className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-pink-500 hover:bg-pink-500/10 transition-all group"
                                    aria-label="Instagram"
                                >
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-pink-500 hover:bg-pink-500/10 transition-all group"
                                    aria-label="LinkedIn"
                                >
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="p-3 bg-white/5 border border-white/10 rounded-lg hover:border-pink-500 hover:bg-pink-500/10 transition-all group"
                                    aria-label="GitHub"
                                >
                                    <svg className="w-6 h-6 text-gray-400 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
