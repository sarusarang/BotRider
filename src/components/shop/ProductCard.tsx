"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getBadgeStyle } from "@/hooks/badge";
import Link from "next/link";
import { BikeProduct, AccessoryProduct } from "@/types/product";




/* ---------------- Props ---------------- */
interface ProductCardProps {
    product: BikeProduct | AccessoryProduct;
    hideAddToCart?: boolean;
    height?: string;
    className?: string;
}




export default function ProductCard({ product, className, hideAddToCart, height, }: ProductCardProps) {



    const isBike = product?.product_type === "bike";

    const [hovered, setHovered] = useState(false);
    const [selectedColorIndex, setSelectedColorIndex] = useState(0);



    /* ---------------- Derived values ---------------- */
    const images = isBike ? product?.bike_colors?.[selectedColorIndex]?.bike_images ?? [] : product?.accessory_images ?? [];

    const price = Number(product?.is_discount ? product?.discount_price : product?.price);

    const originalPrice = product?.is_discount ? Number(product?.price) : null;

    const discountPercent = product?.is_discount ? Number(product?.discount_percentage) : 0;



    return (


        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
                "group relative flex flex-col", // 🔑 flex column
                "bg-white dark:bg-black rounded-2xl overflow-hidden",
                "border border-zinc-200 dark:border-zinc-800",
                "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                "h-130", // 🔑 consistent height
                height,
                className
            )}
        >


            {/* ---------------- Special Tag ---------------- */}
            {product?.special_tag && (


                <div className="absolute top-3 left-3 z-20">


                    <div
                        className={cn(
                            "relative overflow-hidden px-2.5 py-1 text-[10px] font-black tracking-wider rounded-full uppercase shadow-md",
                            getBadgeStyle(product?.special_tag)
                        )}
                    >

                        <span className="relative z-10">
                            {product?.special_tag}
                        </span>

                        <motion.div
                            className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                                repeatDelay: 1,
                            }}
                        />

                    </div>

                </div>

            )}



            {/* ---------------- Discount Badge ---------------- */}
            {discountPercent > 0 && (
                <span className="absolute top-3 right-3 z-20 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
                    {discountPercent}% OFF
                </span>
            )}



            {/* ---------------- Image ---------------- */}
            <div
                className="relative h-80 overflow-hidden"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Link href={`/product/${product.id}`} aria-label={product.name}>

                    <motion.img
                        key={hovered ? images?.[1] : images?.[0]}
                        src={hovered && images?.[1] ? images[1] : images[0]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0.6, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                    />

                </Link>

            </div>



            {/* ---------------- CONTENT (GROWS) ---------------- */}
            <div className="relative z-10 flex flex-col flex-1 p-4 sm:p-5 gap-3">


                {/* Title */}
                <div>

                    <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-white leading-snug line-clamp-2">
                        {product?.name}
                    </h3>

                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        {isBike ? product?.bike_brand : product?.sub_category}
                    </span>

                </div>


                <div className="flex items-start justify-between gap-4">

                    {/* Pricing */}
                    <div className="space-y-1">

                        <div className="flex items-center gap-2">

                            <span className="text-xl font-black text-zinc-900 dark:text-white">
                                ₹{price.toLocaleString()}
                            </span>

                            {discountPercent > 0 && (
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                    {discountPercent}% OFF
                                </span>
                            )}

                        </div>

                        {originalPrice && (
                            <span className="text-sm line-through text-zinc-400">
                                ₹{originalPrice.toLocaleString()}
                            </span>
                        )}

                    </div>


                    {/* Colors (Bike only) */}
                    {!hideAddToCart && isBike && (
                        <div className="flex items-center gap-2 pt-0.5 shrink-0">
                            {product?.bike_colors?.map((color, index) => {
                                const [topColor, bottomColor] = color.color_code;
                                const isSelected = index === selectedColorIndex;

                                return (
                                    <button
                                        key={color.color}
                                        type="button"
                                        onMouseEnter={() => setSelectedColorIndex(index)}
                                        className={cn(
                                            "w-6 h-6 rounded-full border transition",
                                            isSelected
                                                ? "ring-2 ring-black dark:ring-white"
                                                : "border-zinc-300 dark:border-zinc-700"
                                        )}
                                        style={{
                                            background: bottomColor
                                                ? `linear-gradient(to bottom, ${topColor} 50%, ${bottomColor} 50%)`
                                                : topColor,
                                        }}
                                    />
                                );
                            })}
                        </div>
                    )}

                </div>

            </div>


            {/* ---------------- CTA (ALWAYS BOTTOM) ---------------- */}
            {!hideAddToCart && (
                <div className="p-4 sm:p-5 pt-0 mt-auto">
                    <Button className="w-full rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 flex gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                    </Button>
                </div>
            )}


        </motion.div>

    );

}
