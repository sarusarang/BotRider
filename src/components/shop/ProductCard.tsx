"use client";

import { cn } from "@/lib/utils";
import { Product } from "@/data/shop-data";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { getBadgeStyle } from "@/hooks/badge";
import Link from "next/link";




// Props type
interface ProductCardProps {
    product: Product;
    hideAddToCart?: boolean;
    height?: string;
    className?: string;
}




export default function ProductCard({ product, className, hideAddToCart, height }: ProductCardProps) {


    const [hovered, setHovered] = useState(false);


    return (


        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className={cn(
                "group relative flex flex-col bg-white dark:bg-black rounded-2xl overflow-hidden",
                "border border-zinc-200 dark:border-zinc-800",
                "hover:shadow-xl hover:-translate-y-1 transition-all duration-300",
                height,
                className
            )}
        >

            <Link href={`/product/${product.id}`} className="absolute inset-0 z-10" />


            {/* Badge */}
            {product.tag && (

                <div className="absolute top-3 left-3 z-20">

                    <div className={`relative overflow-hidden px-2.5 py-1 text-[10px] font-black tracking-wider rounded-full uppercase shadow-md ${getBadgeStyle(product.tag)}`}>

                        <span className="relative z-10">{product.tag}</span>

                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 -skew-x-12 bg-linear-to-r from-transparent via-white/40 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={{ x: "200%" }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "easeInOut",
                                repeatDelay: 1
                            }}
                        />

                    </div>
                </div>

            )}


            {/* Discount Badge */}
            {product.discountPercent && (

                <span className="absolute top-3 right-3 z-20 bg-emerald-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow">
                    {product.discountPercent}% Off
                </span>

            )}


            {/* Image */}
            <div className="relative aspect-square overflow-hidden">
                <motion.img
                    key={hovered ? product.image[1] : product.image[0]}
                    src={hovered && product.image[1] ? product.image[1] : product.image[0]}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-contain p-0"
                    initial={{ opacity: 0.6, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                />
            </div>



            {/* Content */}
            <div className="flex flex-col flex-1 p-4 sm:p-5 gap-3">


                {/* Title */}
                <div>
                    <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-white leading-snug line-clamp-2">
                        {product.title}
                    </h3>
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        {product.brand}
                    </span>
                </div>


                <div className="flex items-start justify-between gap-4">

                    {/* Pricing */}
                    <div className="space-y-1">

                        <div className="flex items-center gap-2">

                            <span className="text-xl font-black text-zinc-900 dark:text-white">
                                ₹{product.price.toLocaleString()}
                            </span>

                            {product.discountPercent && (
                                <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                                    {product.discountPercent}% OFF
                                </span>
                            )}

                        </div>

                        {product.originalPrice && (
                            <span className="text-sm line-through text-zinc-400">
                                ₹{product.originalPrice.toLocaleString()}
                            </span>
                        )}

                    </div>


                    {/* Color */}
                    {!hideAddToCart && (
                        <div className="flex items-center gap-2 pt-[2px] shrink-0">

                            {product.color.map((color) => (
                                <span
                                    key={color.name}
                                    className="w-6 h-6 rounded-full border border-zinc-300 dark:border-zinc-700"
                                    style={{ backgroundColor: color.code }}
                                />
                            ))}

                        </div>
                    )}

                </div>



                {/* CTA */}
                {!hideAddToCart && (
                    <Button className="w-full mt-3 rounded-full bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 transition flex gap-2 relative z-20">
                        <ShoppingBag className="w-4 h-4" />
                        Add to Cart
                    </Button>
                )}

            </div>

        </motion.div>

    );

}
