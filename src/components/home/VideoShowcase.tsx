"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Play, ArrowUpRight, ShoppingBasket } from "lucide-react";
import Link from "next/link";



export default function VideoShowcase() {


    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(textRef, { once: true, margin: "-20%" });


    // Parallax effect for the video
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });


    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);


    return (


        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black text-white">


            {/* Video Background */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 w-full h-[120%] -top-[10%]"
            >

                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover opacity-60"
                >
                    {/* High quality cycling video */}
                    <source src="/videoplayback.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

            </motion.div>


            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/30" />



            {/* Content */}
            <div className="relative z-10 w-full h-full mx-auto px-4 md:px-16 flex flex-col justify-center">


                <div ref={textRef} className="max-w-7xl space-y-8">

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >

                        <div className="flex items-center gap-3 mb-4">
                            <span className="h-px w-12 bg-white/60"></span>
                            <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/80">Cinematic Experience</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]">
                            RIDE <span className="text-transparent bg-clip-text bg-linear-to-r from-white to-gray-500">BEYOND</span> <br />
                            LIMITS
                        </h2>

                    </motion.div>


                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-300 max-w-xl leading-relaxed"
                    >
                        Experience the thrill of the open road with our premium collection of performance bikes. Engineered for speed, designed for comfort.
                    </motion.p>


                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-6 pt-4"
                    >

                        <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 overflow-hidden transition-all hover:bg-gray-200 hover:cursor-pointer hover:scale-105">
                            <span className="relative z-10">Shop Now</span>
                            <ShoppingBasket className="w-4 h-4 fill-current relative z-10" />
                        </button>


                        <Link href="/about" className="group flex items-center gap-2 text-white font-medium hover:text-gray-300 transition-colors">
                            <span>OUR STORY</span>
                            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>

                    </motion.div>


                </div>


            </div>



            {/* Modern Scroll Indicator */}
            <motion.div
                style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
                className="absolute bottom-10 right-8 md:right-16 flex flex-col items-center gap-2 sm:hidden md:flex"
            >

                <span className="text-[10px] font-bold tracking-widest uppercase writing-vertical-rl text-white/50 rotate-180">Scroll</span>

                <div className="w-px h-12 bg-white/20 overflow-hidden">
                    <div className="w-full h-1/2 bg-white animate-scroll-down"></div>
                </div>

            </motion.div>


        </section>

    );

}
