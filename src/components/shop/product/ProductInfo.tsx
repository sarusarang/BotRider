"use client";

import { Button } from "@/components/ui/button";
import { Star, Minus, Plus, Truck, RotateCcw } from "lucide-react";
import { Product } from "@/data/shop-data";
import { getBadgeStyle } from "@/hooks/badge";
import { motion } from "framer-motion";





// Props type
interface ProductInfoProps {
    product: Product;
    quantity: number;
    setQuantity: (q: number) => void;
}




export function ProductInfo({ product, quantity, setQuantity }: ProductInfoProps) {


    return (


        <div className="space-y-8">


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
                            EMI starts at <span className="text-zinc-900 dark:text-white font-bold">{product.emi}</span>
                        </p>

                    )}

                </div>

            </div>


            <div className="h-px bg-zinc-400 dark:bg-zinc-800" />



            {/* Options: Color & Size */}
            <div className="space-y-6">


                {/* Color */}
                <div className="space-y-3">

                    <span className="text-sm font-bold text-zinc-900 dark:text-white">Color: <span className="font-normal text-zinc-500 ml-1">{product.color.name}</span></span>

                    <div className="flex flex-wrap gap-2 mt-2">

                        <button className="w-12 h-12 rounded-full border-2 border-zinc-200 dark:border-zinc-700 ring-2 ring-black dark:ring-white p-1 relative">
                            <span className="absolute inset-0.5 rounded-full" style={{ backgroundColor: product.color.code }} />
                        </button>

                    </div>

                </div>


                {/* Size */}
                {product.size && Array.isArray(product.size) && (

                    <div className="space-y-3">

                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-zinc-900 dark:text-white">Frame Size</span>
                            <button className="text-xs font-medium underline text-zinc-500 hover:text-black dark:hover:text-white">Size Guide</button>
                        </div>

                        <div className="grid grid-cols-4 gap-2">

                            {product.size.map((size) => (

                                <button
                                    key={size}
                                    className="h-10 border border-zinc-200 dark:border-zinc-800 rounded-lg hover:border-black dark:hover:border-white font-medium text-sm transition-all text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white"
                                >
                                    {size}
                                </button>
                            ))}

                        </div>

                    </div>
                )}

            </div>



            {/* Actions */}
            <div className="space-y-4 pt-4">

                <div className="flex items-center justify-between mb-2">

                    <span className="text-sm font-bold text-zinc-900 dark:text-white">Quantity</span>

                    <div className="flex items-center bg-zinc-100 dark:bg-zinc-900 rounded-full h-9 px-1">

                        <button
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            className="w-8 h-full flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-zinc-800 transition shadow-sm text-zinc-600 dark:text-zinc-400"
                        >
                            <Minus className="w-3.5 h-3.5" />
                        </button>

                        <span className="w-8 text-center font-bold text-sm">{quantity}</span>

                        <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-full flex items-center justify-center rounded-full hover:bg-white dark:hover:bg-zinc-800 transition shadow-sm text-zinc-600 dark:text-zinc-400"
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </button>

                    </div>

                </div>



                {/* Actions */}
                <div className="grid grid-cols-2 gap-3">

                    <Button className="h-14 rounded-full text-base font-bold bg-zinc-900 hover:bg-zinc-800 text-white shadow-xl active:scale-[0.98] transition-all">
                        Buy Now
                    </Button>

                    <Button variant="outline" className="h-14 rounded-full text-base font-bold border-2 border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white hover:bg-transparent text-zinc-900 dark:text-white active:scale-[0.98] transition-all">
                        Add to Cart
                    </Button>

                </div>



                {/* Stock Indicator */}
                {product.stock && (

                    <div className="flex items-center gap-2 text-sm justify-center pt-2">
                        <div className={`w-2 h-2 rounded-full ${product.stock < 10 ? 'bg-orange-500 animate-pulse' : 'bg-emerald-500'}`} />
                        <span className={product.stock < 10 ? 'text-orange-600 font-medium' : 'text-emerald-600 font-medium'}>
                            {product.stock < 10 ? `Hurry! Only ${product.stock} left in stock` : 'In Stock & Ready to Ship'}
                        </span>
                    </div>

                )}


            </div>



            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">


                <div className="flex items-start gap-3 border border-zinc-100 dark:border-zinc-800 p-3 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50">

                    <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-sm">
                        <Truck className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                    </div>

                    <div>
                        <p className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wide">Free Shipping</p>
                        <p className="text-[10px] text-zinc-500 mt-0.5">On all orders over ₹5,000</p>
                    </div>

                </div>


                <div className="flex items-start gap-3 border border-zinc-100 dark:border-zinc-800 p-3 rounded-2xl bg-zinc-50/50 dark:bg-zinc-900/50">

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
