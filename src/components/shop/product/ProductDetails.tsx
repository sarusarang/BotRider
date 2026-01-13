"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Product } from "@/data/shop-data";
import { ProductVideo } from "./ProductVideo";



// Props types
interface ProductDetailsProps {
    product: Product;
    activeAccordion: string | null;
    toggleAccordion: (value: string) => void;
}




export function ProductDetails({ product, activeAccordion, toggleAccordion }: ProductDetailsProps) {


    return (


        <div className="flex flex-col gap-6 lg:gap-8">


            {/* 1. Detailed Description */}
            <div className="space-y-2">
                <h2 className="text-3xl font-black text-zinc-900 dark:text-white">Overview</h2>
                <p className="text-md text-zinc-600 dark:text-zinc-300 leading-relaxed text-justify">
                    {product.description || "Ideally suited for those looking for a high-performance ride combining comfort and speed."}
                </p>
            </div>



            {/* 2. Video Section (if available) */}
            {product.video && (
                <div>
                    <ProductVideo videoId={product.video} />
                </div>
            )}



            {/* 3. Specs Accordion */}
            <div>

                <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-4">Specifications</h2>

                <div className="border-t border-zinc-200 dark:border-zinc-800">

                    {/* Technical Specs */}
                    <div className="border-b border-zinc-200 dark:border-zinc-800">

                        <button
                            onClick={() => toggleAccordion('specs')}
                            className="w-full flex items-center justify-between py-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors px-2 -mx-2 rounded-lg"
                        >
                            <span className="font-bold text-xl text-zinc-900 dark:text-white">Technical Details</span>
                            <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", activeAccordion === 'specs' ? "rotate-180" : "")} />
                        </button>

                        <AnimatePresence>

                            {activeAccordion === 'specs' && (

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8 space-y-8">
                                        {product.specs && product.specs.length > 0 ? product.specs.map((section, idx) => (
                                            <div key={idx} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-12">
                                                <h4 className="font-bold text-zinc-900 dark:text-white text-lg">{section.label}</h4>
                                                <div className="space-y-4">
                                                    {section.items.map((item, i) => (
                                                        <div key={i} className="pb-4 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 last:pb-0">
                                                            <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">{item.name}</p>
                                                            <p className="text-base font-medium text-zinc-900 dark:text-zinc-200 leading-relaxed">{item.value}</p>
                                                        </div>
                                                    ))}

                                                </div>

                                            </div>

                                        )) : (

                                            <p className="text-zinc-500 italic">No detailed specifications available for this product.</p>

                                        )}

                                    </div>

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </div>



                    {/* Geometry */}
                    <div className="border-b border-zinc-200 dark:border-zinc-800">

                        <button
                            onClick={() => toggleAccordion('geometry')}
                            className="w-full flex items-center justify-between py-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors px-2 -mx-2 rounded-lg"
                        >
                            <span className="font-bold text-xl text-zinc-900 dark:text-white">Geometry</span>
                            <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", activeAccordion === 'geometry' ? "rotate-180" : "")} />

                        </button>

                        <AnimatePresence>

                            {activeAccordion === 'geometry' && (

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >

                                    <div className="pb-8">
                                        <div className="aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                                            <span className="text-lg font-medium">Geometry Chart Placeholder</span>
                                        </div>
                                    </div>

                                </motion.div>

                            )}

                        </AnimatePresence>

                    </div>



                    {/* Downloads */}
                    <div className="border-b border-zinc-200 dark:border-zinc-800">


                        <button
                            onClick={() => toggleAccordion('downloads')}
                            className="w-full flex items-center justify-between py-6 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors px-2 -mx-2 rounded-lg"
                        >
                            <span className="font-bold text-xl text-zinc-900 dark:text-white">Manuals & Downloads</span>
                            <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", activeAccordion === 'downloads' ? "rotate-180" : "")} />
                        </button>


                        <AnimatePresence>

                            {activeAccordion === 'downloads' && (

                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                >

                                    <div className="pb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {product.downloads ? product.downloads.map((dl, idx) => (
                                            <a key={idx} href={dl.url} className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-black dark:hover:border-white transition-colors group bg-white dark:bg-zinc-900">
                                                <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition-colors">
                                                    <Download className="w-5 h-5" />
                                                </div>
                                                <span className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-2">{dl.name}</span>
                                            </a>
                                        )) : (
                                            <p className="text-zinc-500 italic">No downloads available.</p>
                                        )}
                                    </div>

                                </motion.div>

                            )}
                        </AnimatePresence>

                    </div>

                </div>

            </div>

        </div>

    );

}
