"use client";

import { motion, Variants } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MoveRight } from "lucide-react";
import { Button } from "@/app/components/ui/button";





export default function ContactPage() {


    // =============== ANIMATION VARIANTS ===============
    const fadeIn: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };


    const stagger = {
        visible: { transition: { staggerChildren: 0.1 } },
    };




    return (


        <div className="min-h-screen bg-white">


            {/* ================= HERO SECTION ================= */}
            <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center">


                {/* Background Overlay */}
                <div className="absolute inset-0 z-10 bg-black/40" />


                {/* Parallax/Static Image Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1671100502325-8870ff9ba5c9?fm=jpg&q=60&w=3000"
                        alt="contact banner"
                        className="w-full h-full object-cover object-center"
                    />
                </div>



                {/* Hero Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeIn}
                    className="relative z-20 text-center text-white px-4"
                >


                    <motion.h1
                        className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Get in Touch
                    </motion.h1>


                    <motion.p
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        We'd love to hear from you. Whether it's a question about our bikes, services, or just a friendly chat.
                    </motion.p>

                </motion.div>


                {/* Curve Separator */}
                <div className="absolute bottom-0 left-0 w-full z-20 translate-y-px">
                    <svg viewBox="0 0 1440 120" className="w-full h-[60px] md:h-[110px] fill-white block" preserveAspectRatio="none">
                        <path d="M0,0 C480,100 960,100 1440,0 V120 H0 Z" />
                    </svg>
                </div>

            </section>



            {/* ================= CONTACT CONTENT ================= */}
            <section className="py-1 md:py-12 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">


                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={stagger}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
                >


                    {/* Left Column: Contact Form */}
                    <motion.div variants={fadeIn} className="space-y-8">


                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                            <p className="text-gray-500">Fill out the form below and we'll get back to you as soon as possible.</p>
                        </div>


                        <form className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="space-y-2">
                                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
                                        placeholder="John"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
                                        placeholder="Doe"
                                    />
                                </div>

                            </div>


                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
                                    placeholder="john@example.com"
                                />
                            </div>


                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300"
                                >
                                    <option value="" disabled  >Select a topic</option>
                                    <option value="sales">Sales Inquiry</option>
                                    <option value="support">Customer Support</option>
                                    <option value="service">Service & Repair</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>


                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-gray-700">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-red-500 focus:bg-white focus:ring-2 focus:ring-red-100 outline-none transition-all duration-300 resize-none"
                                    placeholder="How can we help you today?"
                                />
                            </div>


                            <Button size="lg" className="w-full py-6 text-lg bg-black hover:bg-gray-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group">
                                Send Message
                                <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>

                        </form>

                    </motion.div>



                    {/* Right Column: Contact Info */}
                    <motion.div variants={fadeIn} className="flex flex-col justify-between h-full space-y-12">

                        {/* Info Cards */}
                        <div className="space-y-8">

                            <div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>

                                <div className="grid gap-8">

                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 group">

                                        <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                            <MapPin className="w-6 h-6" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Visit Our Store</h4>
                                            <p className="text-gray-500 leading-relaxed">

                                                Boatrider Sports Pvt. Ltd <br />
                                                16/1040, Pushpa Junction, Francis Road, Calicut, Kerala – 673 002

                                            </p>
                                        </div>

                                    </div>


                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 group">

                                        <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                            <Mail className="w-6 h-6" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                                            <p className="text-gray-500 mb-1">For general inquiries:</p>
                                            <a href="mailto:boatridersportsclt@gmail.com" className="text-black font-medium hover:text-red-600 transition-colors">boatridersportsclt@gmail.com</a>
                                        </div>

                                    </div>

                                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-all duration-300 group">

                                        <div className="p-3 rounded-xl bg-white shadow-sm border border-gray-200 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                            <Phone className="w-6 h-6" />
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                                            <p className="text-gray-500 mb-1">Mon-Fri from 8am to 6pm:</p>
                                            <a href="tel:+04954850666" className="text-black font-medium hover:text-red-600 transition-colors">0495 4850666</a>
                                        </div>

                                    </div>

                                </div>

                            </div>



                            {/* Hours */}
                            <div className="p-8 rounded-3xl bg-black text-white relative overflow-hidden">

                                <div className="absolute top-0 right-0 p-8 opacity-10">
                                    <Clock className="w-32 h-32" />
                                </div>

                                <h4 className="text-xl font-bold mb-4 relative z-10">Opening Hours</h4>

                                <ul className="space-y-3 relative z-10 text-gray-300">

                                    <li className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-medium text-white">8:00 AM - 9:00 PM</span>
                                    </li>

                                    <li className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-medium text-white">9:00 AM - 8:00 PM</span>
                                    </li>

                                    <li className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-medium text-white">10:00 AM - 6:00 PM</span>
                                    </li>

                                </ul>

                            </div>

                        </div>

                    </motion.div>

                </motion.div>

            </section>



            {/* ================= MAP SECTION (Visual Polish) ================= */}
            <section className="w-full h-[400px] bg-gray-100 transition-all duration-700 relative group overflow-hidden">

                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3541.287250595887!2d75.78213747452286!3d11.24302585041498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6596b4044716b%3A0xcc9e722a120ccb24!2sBoatrider%20Sports!5e1!3m2!1sen!2sin!4v1768884767688!5m2!1sen!2sin" width="600" height="450" className="w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

            </section>

        </div>
    );
}
