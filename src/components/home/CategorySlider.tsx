"use client";

import { useRef } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";



// 🔥 Categories
const categories = [
    {
        id: 1,
        title: "Road Bikes",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpDXe0AL5epdD5DOW10Bj_qDzt9PgjUzPNSA&s",
        link: "/shop/road-bikes",
    },
    {
        id: 2,
        title: "Electric Bikes",
        image:
            "https://hips.hearstapps.com/hmg-prod/images/cyclist-on-the-col-de-la-colombiere-in-the-french-royalty-free-image-1764964920.pjpeg?crop=0.68538xw:1xh;center,top&resize=640:*",
        link: "/shop/electric-bikes",
    },
    {
        id: 3,
        title: "Mountain Bikes",
        image:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDpMlLlCvViH7NdTlz2M0K2U-IIMHl0kVL5A&s",
        link: "/shop/mountain-bikes",
    },
    {
        id: 4,
        title: "Active Bikes",
        image:
            "https://www.healthywomen.org/media-library/the-benefits-of-bike-riding.jpg?id=25707828&width=1200&height=800&quality=70&coordinates=0%2C0%2C0%2C0",
        link: "/shop/active-bikes",
    },
    {
        id: 5,
        title: "Kids Bikes",
        image:
            "https://thumbs.dreamstime.com/b/urban-biking-young-woman-bike-city-60286904.jpg",
        link: "/shop/kids-bikes",
    },

    // 🔥 Accessories
    {
        id: 6,
        title: "Helmets",
        image:
            "https://www.canyon.com/dw/image/v2/BCML_PRD/on/demandware.static/-/Sites-canyon-storefront/default/dw4ceb097e/category-landing/seo-landing/seo-mens-helmet.jpg?sw=513&sh=513&sm=cut&sfrm=jpg&q=80",
        link: "/shop/helmets",
    },
    {
        id: 7,
        title: "Gloves",
        image:
            "https://m.media-amazon.com/images/I/71cW-lnr1pL._AC_UF894,1000_QL80_.jpg",
        link: "/shop/gloves",
    },
    {
        id: 8,
        title: "Handle Bars",
        image:
            "https://upload.wikimedia.org/wikipedia/commons/f/f1/Shimano_105-5500_shifters.jpg",
        link: "/shop/handle-bars",
    },
    {
        id: 9,
        title: "Bike Seats",
        image:
            "https://m.media-amazon.com/images/I/51qkI6ZdZHL.jpg",
        link: "/shop/bike-seats",
    },
    {
        id: 10,
        title: "Cycling Shoes",
        image:
            "https://cdn.mos.cms.futurecdn.net/KdWED77rkr49FtNz3zKt8C.jpg",
        link: "/shop/shoes",
    },
    {
        id: 11,
        title: "Water Bottles",
        image:
            "https://kingcage.com/cdn/shop/files/Screenshot_2025-02-13_at_1.14.49_PM.png?v=1739477901&width=1946",
        link: "/shop/water-bottles",
    },
    {
        id: 12,
        title: "Bike Lights",
        image:
            "https://contents.mediadecathlon.com/p1918628/k$36262739d342f4cc422bc0f666d84b12/1800x0/1000pt849/2000xcr1429/default.jpg?format=auto",
        link: "/shop/bike-lights",
    },
];




// 🔥 Item animation
const item: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.95,
    },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.9,
            delay: i * 0.16, 
            ease: [0.16, 1, 0.3, 1],
        },
    }),
};



export default function CategorySlider() {


    const swiperRef = useRef<any>(null);
    const sectionRef = useRef<any>(null);
    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();
    const inView = useInView(sectionRef, { once: true, amount: 0.3 });


    return (


        <section ref={sectionRef} className="w-full py-5 sm:py-8 bg-white dark:bg-black border-b-2 border-dashed border-zinc-200 dark:border-zinc-800">


            <div className="mx-auto px-2 md:px-8">


                {/* Header */}
                <motion.div
                    variants={item}
                    className="flex items-center justify-between mb-5"
                >

                    <div className="flex items-center gap-4">
                        {/* Icon */}
                        <div className="relative">
                            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-black to-zinc-800 dark:from-white dark:to-zinc-300 flex items-center justify-center shadow-xl">
                                <svg
                                    className="w-6 h-6 text-white dark:text-black"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M19 3v4M3 7h18M6 11h12M9 15h6M11 19h2" />
                                </svg>
                            </div>

                            {/* Glow */}
                            <div className="absolute inset-0 blur-xl bg-black/40 dark:bg-white/40 -z-10 rounded-full" />
                        </div>


                        {/* Text */}
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-black to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                                Shop By
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Browse premium cycling categories
                            </p>
                        </div>

                    </div>


                    <div className="hidden md:flex gap-3">

                        {[ChevronLeft, ChevronRight].map((Icon, i) => (

                            <button
                                key={i}
                                onClick={i === 0 ? handlePrev : handleNext}
                                className="w-11 h-11 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-md bg-white/60 dark:bg-black/50 hover:scale-110 hover:shadow-xl transition hover:cursor-pointer"
                            >
                                <Icon className="mx-auto" />
                            </button>

                        ))}

                    </div>

                </motion.div>



                {/* Slider */}
                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    spaceBetween={16}
                    slidesPerView={1}
                    breakpoints={{
                        360: { slidesPerView: 1 },
                        480: { slidesPerView: 1 },
                        640: { slidesPerView: 2.1 },
                        1024: { slidesPerView: 3.1 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="w-full h-[550px]"
                >

                    {categories.map((cat, index) => (

                        <SwiperSlide key={cat.id} className="h-full">

                            <motion.div
                                className="h-full"
                                initial="hidden"
                                animate={inView ? "show" : "hidden"}
                                variants={item}
                                custom={index}
                            >

                                <Link
                                    href={cat.link}
                                    className="group relative block h-full rounded-3xl overflow-hidden bg-black shadow-xl hover:shadow-2xl transition-all duration-700"
                                >

                                    {/* Image */}
                                    <img
                                        src={cat.image}
                                        alt={cat.title}
                                        className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1200ms ease-out"
                                    />


                                    {/* Premium gradient */}
                                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />


                                    {/* Glass shine */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-white/10 backdrop-blur-[2px] transition" />


                                    {/* Content */}
                                    <div className="absolute bottom-0 p-7 w-full flex justify-between items-center">


                                        <div>
                                            <h3 className="text-white text-2xl font-semibold tracking-tight">
                                                {cat.title}
                                            </h3>
                                            <p className="text-white/60 text-sm mt-1">
                                                Explore Collection
                                            </p>
                                        </div>


                                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all duration-500 scale-75 group-hover:scale-100">
                                            <ArrowRight />
                                        </div>


                                    </div>

                                </Link>

                            </motion.div>

                        </SwiperSlide>

                    ))}

                </Swiper>

            </div>

        </section>

    );

}
