"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/data/shop-data";
import ProductCard from "@/components/shop/ProductCard";



interface YouMayAlsoLikeProps {
    products: Product[];
}




export function YouMayAlsoLike({ products }: YouMayAlsoLikeProps) {


    const swiperRef = useRef<any>(null);
    const handlePrev = () => swiperRef.current?.slidePrev();
    const handleNext = () => swiperRef.current?.slideNext();


    if (!products || products.length === 0) return null;



    return (



        <div className="w-full space-y-6 pt-5 px-4 pb-6 relative group border-t border-zinc-200 dark:border-zinc-800 mt-10">


            {/* Header */}
            <div className="flex items-center justify-between px-0 md:px-0 mb-4">


                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">
                    You May Also Like
                </h2>


                <div className="flex gap-2">

                    <button
                        onClick={handlePrev}
                        className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>

                </div>

            </div>



            {/* Slider */}
            <div className="px-3 md:px-0">

                <Swiper
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                    modules={[Navigation, Autoplay]}
                    autoplay={{ delay: 6000, disableOnInteraction: false }}
                    spaceBetween={16}
                    slidesPerView={1.2}
                    breakpoints={{
                        480: { slidesPerView: 1.5 },
                        640: { slidesPerView: 2.2 },
                        850: { slidesPerView: 2.5 },
                        1024: { slidesPerView: 3.2 },
                        1280: { slidesPerView: 4 },
                    }}
                    className="w-full overflow-visible!"
                    style={{ overflow: "visible" }}
                >

                    {products.map((product) => (

                        <SwiperSlide
                            key={product.id}
                            className="h-auto flex"
                        >

                            {/* Square + Same Height Wrapper */}
                            <div className="w-full aspect-square flex">
                                <ProductCard
                                    product={product}
                                    hideAddToCart
                                    height="h-[520px] sm:h-[340px]"
                                    className="h-full w-full border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl transition-shadow duration-300"
                                />
                            </div>

                        </SwiperSlide>

                    ))}

                </Swiper>

            </div>

        </div>

    );

}
