"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";




// props type
interface ProductGalleryProps {
    images: string[];
    selectedImage: string;
    onImageSelect: (image: string) => void;
    title: string;
}




export function ProductGallery({ images, selectedImage, onImageSelect, title }: ProductGalleryProps) {


    return (


        <div className="flex flex-col gap-4">


            {/* Main Image */}
            <div className="relative w-full rounded-3xl overflow-hidden flex items-center justify-center p-0 border shadow-sm border-zinc-200 dark:border-zinc-800">

                <AnimatePresence mode="wait">

                    <motion.img
                        key={selectedImage}
                        src={selectedImage}
                        alt={title}
                        className="w-full h-full object-contain max-h-[500px]"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    />

                </AnimatePresence>

            </div>


            {/* Thumbnails */}
            {images.length > 1 && (


                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">


                    {images.map((img, idx) => (


                        <button
                            key={idx}
                            onClick={() => onImageSelect(img)}
                            className={cn(
                                "relative w-22 h-22 rounded-xl border-2 shrink-0 bg-zinc-50 dark:bg-zinc-900 p-2 overflow-hidden transition-all",
                                selectedImage === img
                                    ? "border-black dark:border-white ring-2 ring-black/5 dark:ring-white/10"
                                    : "border-transparent hover:border-zinc-300 dark:hover:border-zinc-700"
                            )}
                        >

                            <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain" />

                        </button>

                    ))}

                </div>

            )}

        </div>

    );

}
