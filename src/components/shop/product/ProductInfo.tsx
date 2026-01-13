"use client";

import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, Truck, RotateCcw, Check, ArrowRight, ShoppingCart } from "lucide-react";
import { Product } from "@/data/shop-data";
import { getBadgeStyle } from "@/hooks/badge";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";





// Props type
interface ProductInfoProps {
    product: Product;
    quantity: number;
    setQuantity: (q: number) => void;
}




export function ProductInfo({ product, quantity, setQuantity }: ProductInfoProps) {


    // State for selected color
    const [selectedColor, setSelectedColor] = useState(product.color[0]);


    // State for selected size
    const [selectedSize, setSelectedSize] = useState(product.size[0]);


    return (


        <div className="space-y-4">


            {/* Title & Price */}
            <div className="space-y-4">


                <div className="flex flex-col gap-2">


                    <div className="flex items-start justify-between gap-6">


                        <div className="min-w-0 space-y-1">


                            {/* Title + Tag */}
                            <div className="flex items-center gap-3 min-w-0">


                                <h1 className="text-3xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight leading-tight truncate">
                                    {product.title}
                                </h1>


                                {product.tag && (


                                    <div className="">


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


                            </div>


                            {/* Brand */}
                            <span className="text-sm font-bold uppercase tracking-wider text-zinc-500">
                                {product.brand}
                            </span>


                        </div>


                        {/* Reviews */}
                        <div className="flex items-center gap-1 shrink-0 pt-1">

                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />

                            <span className="text-sm font-bold text-zinc-900 dark:text-white">
                                {product.rating || "4.8"}
                            </span>

                            <span className="text-xs text-zinc-500">
                                ({product.reviewCount || 124})
                            </span>

                        </div>

                    </div>

                </div>



                {/* Price */}
                <div className="space-y-1">

                    <div className="flex items-center gap-3">

                        <div className="flex items-baseline gap-3">

                            <span className="text-3xl font-semibold text-zinc-900 dark:text-white">
                                ₹{product.price.toLocaleString()}
                            </span>

                            {product.originalPrice && (
                                <span className="text-lg text-zinc-400 line-through font-medium">
                                    ₹{product.originalPrice.toLocaleString()}
                                </span>
                            )}

                        </div>


                        {/* Discount Badge */}
                        {product.discountPercent && (
                            <span className="bg-emerald-500 text-white px-2 py-0.5 rounded-full text-xs font-bold">
                                -{product.discountPercent}%
                            </span>
                        )}

                    </div>

                    {product.emi && (

                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            EMI starts at <span className="text-green-700 dark:text-white font-bold">{product.emi}</span>
                        </p>

                    )}

                </div>

            </div>


            <div className="h-px bg-zinc-200 dark:bg-zinc-800" />



            {/* Options: Color & Size */}
            <div className="space-y-6">


                {/* Color Selector */}
                <div className="space-y-4">

                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Color:
                        <span className="ml-2 font-normal text-zinc-500">
                            {selectedColor.name}
                        </span>
                    </span>

                    <div className="flex flex-wrap gap-3 mt-2">

                        {product.color.map((color) => {

                            const isActive = selectedColor.name === color.name;

                            return (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor(color)}
                                    className={cn(
                                        "relative w-12 h-12 rounded-full transition-all duration-300 hover:cursor-pointer",
                                        "border-2 dark:border-zinc-700",
                                        isActive
                                            ? "border-black dark:border-white ring-2 ring-black dark:ring-white"
                                            : "border-zinc-200 hover:scale-110 hover:ring-1 hover:ring-zinc-300 dark:hover:ring-zinc-600"
                                    )}
                                >

                                    {/* Color bubble */}
                                    <span
                                        className="absolute inset-1 rounded-full"
                                        style={{ backgroundColor: color.code }}
                                    />

                                    {/* Check Icon */}
                                    <AnimatePresence>
                                        {isActive && (
                                            <motion.span
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                exit={{ scale: 0.5, opacity: 0 }}
                                                className="absolute inset-0 flex items-center justify-center"
                                            >
                                                <Check
                                                    className={cn(
                                                        "w-5 h-5",
                                                        color.name === "White" || color.name === "Yellow"
                                                            ? "text-black"
                                                            : "text-white"
                                                    )}
                                                    strokeWidth={3}
                                                />
                                            </motion.span>
                                        )}
                                    </AnimatePresence>

                                </button>
                            );
                        })}

                    </div>

                </div>


                {/* Frame Size */}
                {product.size && Array.isArray(product.size) && (

                    <div className="space-y-4">

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                                Size : {selectedSize}
                            </span>

                            <button className="text-xs font-medium underline text-zinc-500 hover:text-black dark:hover:text-white transition hover:cursor-pointer">
                                Size Guide
                            </button>
                        </div>

                        <div className="grid grid-cols-4 gap-3">

                            {product.size.map((size) => {
                                const isActive = selectedSize === size;

                                return (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={cn(
                                            "h-11 rounded-xl border text-sm font-medium transition-all duration-300 hover:cursor-pointer",
                                            "flex items-center justify-center",
                                            isActive
                                                ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-md scale-105"
                                                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white hover:scale-105"
                                        )}
                                    >
                                        {size}
                                    </button>
                                );
                            })}

                        </div>


                    </div>
                )}


            </div>



            {/* Actions */}
            <div className="space-y-4 pt-2">

                <div className="flex items-center justify-between mb-4">

                    <span className="text-sm font-bold text-zinc-900 dark:text-white">Quantity</span>

                    <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-inner">

                        {/* Minus */}
                        <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="relative w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-md hover:shadow-lg hover:ring-2 hover:ring-black/10 dark:hover:ring-white/10 transition-all hover:cursor-pointer"
                        >
                            <Minus className="w-4 h-4" />
                            <span className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/5 opacity-0 hover:opacity-100 transition" />
                        </motion.button>

                        {/* Count */}
                        <span className="w-10 text-center text-sm font-semibold text-zinc-900 dark:text-white">
                            {quantity}
                        </span>

                        {/* Plus */}
                        <motion.button
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setQuantity(quantity + 1)}
                            className="relative w-6 h-6 flex items-center justify-center rounded-full bg-black dark:bg-white text-white dark:text-black shadow-lg hover:shadow-xl hover:ring-2 hover:ring-black/20 dark:hover:ring-white/20 transition-all hover:cursor-pointer"
                        >
                            <Plus className="w-4 h-4" />
                            <span className="absolute inset-0 rounded-full bg-white/10 dark:bg-black/10 opacity-0 hover:opacity-100 transition" />
                        </motion.button>

                    </div>


                </div>



                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">


                    {/* Buy Now */}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative h-14 rounded-full bg-black dark:bg-white text-white dark:text-black font-semibold text-base hover:cursor-pointer
                         shadow-[0_10px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.2)] overflow-hidden">

                        {/* Glow */}
                        <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Buy Now
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>

                    </motion.button>



                    {/* Add to Cart */}
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="group relative h-14 rounded-full border-2 border-zinc-300 dark:border-zinc-700 hover:cursor-pointer
                         text-zinc-900 dark:text-white font-semibold text-base hover:border-black dark:hover:border-white overflow-hidden">
                       
                        {/* Hover fill */}
                        <span className="absolute inset-0 bg-zinc-900 dark:bg-white opacity-0 group-hover:opacity-100 transition" />

                        <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white dark:group-hover:text-black">
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                        </span>
                    
                    </motion.button>


                </div>


                {/* Stock Indicator */}
                {product.stock && (

                    <div className="flex items-center gap-2 text-sm justify-center pt-2">
                        <div className={`w-2 h-2 mt-1 rounded-full ${product.stock < 10 ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className={product.stock < 10 ? 'text-orange-600 font-medium' : 'text-emerald-600 font-medium'}>
                            {product.stock < 10 ? `Hurry! Only ${product.stock} left in stock` : 'In Stock & Ready to Ship'}
                        </span>
                    </div>

                )}


            </div>



            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">


                <div className="flex items-start gap-3 border-2 border-zinc-100 dark:border-zinc-800 p-3 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50">

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-sm">
                        <Truck className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wide">Free Shipping</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">On all orders over ₹5,000</p>
                    </div>

                </div>


                <div className="flex items-start gap-3 border-2 border-zinc-100 dark:border-zinc-800 p-3 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50">

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-sm">
                        <RotateCcw className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wide">Easy Returns</p>
                        <p className="text-xs text-zinc-500 mt-0.5">30-day return policy</p>
                    </div>

                </div>

            </div>

        </div>

    );

}
