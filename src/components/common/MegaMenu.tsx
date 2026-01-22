'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { filterCategories, products, Product } from '../../data/shop-data';
import { cn } from '@/lib/utils';




interface MegaMenuProps {
    activeDropdown: string | null;
    setActiveDropdown: (value: string | null) => void;
    isDark?: boolean;
}




interface SubCategory {
    title: string;
    href: string;
    image: string;
    items: Product[];
}




export default function MegaMenu({ activeDropdown, setActiveDropdown, isDark = false }: MegaMenuProps) {


    const [selectedSubCategory, setSelectedSubCategory] = useState<SubCategory | null>(null);



    // Helper to process data based on activeDropdown
    const getDropdownData = (category: string): SubCategory[] => {


        let subCategories: string[] = [];


        // Map main category to subcategories from shop-data
        if (category === 'Bikes') {
            subCategories = filterCategories.bikes;
        } else if (category === 'Accessories') {
            subCategories = filterCategories.accessories;
        } else {
            return [];
        }


        // Transform strings into rich objects with products
        return subCategories.map((subCatTitle) => {


            const categoryProducts = products.filter(
                (p) => p.category === subCatTitle
            );

            // Get up to 4 items for the preview
            const previewItems = categoryProducts.slice(0, 4);

            // determine hero image (use first product's image or fallback)
            const heroImage = categoryProducts.length > 0 && categoryProducts[0].image.length > 0
                ? categoryProducts[0].image[0]
                : 'https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'; // Generic fallback

            return {
                title: subCatTitle,
                href: `/shop/${category.toLowerCase()}?bike_category=${encodeURIComponent(subCatTitle)}`,
                image: heroImage,
                items: previewItems,
            };
        });
    };



    const currentCategories = activeDropdown ? getDropdownData(activeDropdown) : [];



    // Reset selected subcategory when main dropdown changes
    useEffect(() => {
        if (activeDropdown && currentCategories.length > 0) {
            setSelectedSubCategory(currentCategories[0]);
        } else {
            setSelectedSubCategory(null);
        }
    }, [activeDropdown]);



    return (


        <AnimatePresence>


            {activeDropdown && (


                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    onMouseEnter={() => setActiveDropdown(activeDropdown)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={cn(
                        "max-w-7xl h-[88vh] mx-auto absolute top-16 left-0 right-0 border rounded-xl shadow-xl hidden lg:block overflow-hidden overflow-x-hidden",
                        isDark
                            ? "bg-black border-zinc-800 backdrop-blur-xl"
                            : "bg-white border-gray-100"
                    )}
                >


                    <div className="w-full h-full mx-auto px-8 py-8 overflow-hidden">


                        <div className="grid grid-cols-4 gap-8 h-full">


                            {/* ================= LEFT : CATEGORY LIST ================= */}
                            <div className={cn(
                                "col-span-1 border-r pr-6 h-full flex flex-col",
                                isDark ? "border-zinc-800" : "border-gray-200"
                            )}>


                                <h3 className={cn(
                                    "text-sm font-semibold uppercase tracking-wider mb-6 shrink-0",
                                    isDark ? "text-zinc-500" : "text-gray-400"
                                )}>
                                    {activeDropdown} Categories
                                </h3>


                                <ul className="space-y-2 overflow-y-auto flex-1 pr-2 thin-scroll">

                                    {currentCategories.map((cat) => (

                                        <li
                                            key={cat.title}
                                            onMouseEnter={() => setSelectedSubCategory(cat)}
                                            className="cursor-pointer"
                                        >

                                            <div
                                                className={cn(
                                                    "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                                                    selectedSubCategory?.title === cat.title
                                                        ? (isDark ? "bg-zinc-900 text-white pl-5" : "bg-gray-50 text-red-600 pl-5")
                                                        : (isDark ? "text-zinc-400 hover:bg-zinc-900 hover:text-white hover:pl-4" : "text-gray-900 hover:bg-gray-50 hover:pl-4")
                                                )}
                                            >

                                                <span className="text-lg font-medium">{cat.title}</span>

                                                {selectedSubCategory?.title === cat.title && (
                                                    <ChevronRight className={cn("w-4 h-4", isDark ? "text-white" : "text-red-600")} />
                                                )}

                                            </div>

                                        </li>

                                    ))}

                                </ul>

                            </div>



                            {/* ================= RIGHT : CONTENT ================= */}
                            <div className="col-span-3 h-full overflow-y-auto overflow-x-hidden pr-4 thin-scroll">

                                <AnimatePresence mode="wait">

                                    {selectedSubCategory && (

                                        <motion.div
                                            layout="position"
                                            key={selectedSubCategory.title}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-8 min-h-full"
                                        >

                                            {/* ===== HERO ===== */}
                                            <div className="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-sm">

                                                <img
                                                    src={selectedSubCategory.image}
                                                    alt={selectedSubCategory.title}
                                                    loading="lazy"
                                                    className="absolute inset-0 w-full h-full object-cover"
                                                />

                                                <div className="absolute inset-0 bg-black/40" />

                                                <div className="absolute bottom-6 left-8 text-white">

                                                    <h2 className="text-3xl font-bold">
                                                        {selectedSubCategory.title}
                                                    </h2>

                                                    <Link
                                                        href={selectedSubCategory.href}
                                                        className={cn(
                                                            "text-sm font-medium underline decoration-1 underline-offset-4 transition-colors mt-2 inline-block",
                                                            isDark ? "hover:text-zinc-300" : "hover:text-red-400"
                                                        )}
                                                        onClick={() => setActiveDropdown(null)}
                                                    >
                                                        View All {selectedSubCategory.title}
                                                    </Link>

                                                </div>

                                            </div>



                                            {/* ===== MEGA MENU PRODUCT GRID ===== */}
                                            <div className="grid grid-cols-4 gap-5">

                                                {selectedSubCategory.items?.length > 0 ? (

                                                    selectedSubCategory.items.map((item, idx) => (
                                                        <motion.div
                                                            key={item.id}
                                                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                                            transition={{
                                                                delay: idx * 0.05,
                                                                duration: 0.5,
                                                                ease: 'easeOut',
                                                            }}
                                                            whileHover="hover"
                                                            className="group relative cursor-pointer"
                                                        >

                                                            <Link href={`/product/${item.id}`} onClick={() => setActiveDropdown(null)}>

                                                                <div className={cn(
                                                                    "relative overflow-hidden rounded-2xl backdrop-blur-md border",
                                                                    isDark
                                                                        ? "bg-zinc-900/50 border-zinc-800"
                                                                        : "bg-white/60 border-gray-200"
                                                                )}>

                                                                    <div className="absolute inset-0 bg-linear-to-br from-black/5 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                                                                    <motion.div
                                                                        variants={{ hover: { scale: 1.08 } }}
                                                                        transition={{ duration: 1.2, ease: 'easeOut' }}
                                                                        className="relative aspect-4/3 overflow-hidden"
                                                                    >

                                                                        {item.image && item.image.length > 0 ? (

                                                                            <img
                                                                                src={item.image[0]}
                                                                                alt={item.title}
                                                                                loading="lazy"
                                                                                className="h-full w-full object-cover"
                                                                            />

                                                                        ) : (

                                                                            <div className="flex h-full w-full items-center justify-center text-gray-400">
                                                                                No Image
                                                                            </div>

                                                                        )}

                                                                    </motion.div>


                                                                    <div className="p-4">

                                                                        <h4 className={cn(
                                                                            "text-sm font-medium tracking-tight transition line-clamp-1",
                                                                            isDark
                                                                                ? "text-zinc-200 group-hover:text-white"
                                                                                : "text-gray-900 group-hover:text-black"
                                                                        )}>
                                                                            {item.title}
                                                                        </h4>

                                                                        {item.price && (
                                                                            <p className={cn(
                                                                                "mt-1 text-xs",
                                                                                isDark ? "text-zinc-500" : "text-gray-500"
                                                                            )}>
                                                                                ₹{item.price.toLocaleString()}
                                                                            </p>
                                                                        )}

                                                                        <div className={cn(
                                                                            "mt-3 h-px w-6 transition-all duration-500",
                                                                            isDark ? "bg-zinc-700 group-hover:w-28 group-hover:bg-white" : "bg-gray-300 group-hover:w-28"
                                                                        )} />

                                                                    </div>

                                                                </div>

                                                            </Link>

                                                        </motion.div>

                                                    ))


                                                ) : (

                                                    <div className="col-span-4 text-center text-gray-400 py-10">
                                                        No products found in this category.
                                                    </div>

                                                )}

                                            </div>

                                        </motion.div>

                                    )}

                                </AnimatePresence>

                            </div>

                        </div>

                    </div>

                </motion.div>

            )}

        </AnimatePresence>

    );


}
