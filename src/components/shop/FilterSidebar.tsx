"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { filterCategories } from "@/data/shop-data";
import { FilterState } from "@/types/filters";



interface FilterSectionProps {
    title: string;
    isOpen?: boolean;
    children: React.ReactNode;
}



const FilterSection = ({ title, isOpen = true, children }: FilterSectionProps) => {


    const [open, setOpen] = useState(isOpen);



    return (


        <div className="border-b border-zinc-200 dark:border-zinc-800 py-6 last:border-0">


            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-left group hover:cursor-pointer"
            >

                <span className="font-bold text-base text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                    {title}
                </span>


                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-5 h-5 text-zinc-400 group-hover:text-zinc-600 dark:text-zinc-500" />
                </motion.div>


            </button>


            <AnimatePresence initial={false}>

                {open && (

                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                    >
                        <div className="pt-4 pb-2 space-y-4">
                            {children}
                        </div>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

};





// Props for FilterSidebar
interface FilterSidebarProps {
    className?: string;
    onClose?: () => void;
    filters?: FilterState;
    onFilterChange?: (key: keyof FilterState, value: any) => void;
    onClearAll?: () => void;
}



export default function FilterSidebar({ className, onClose, filters, onFilterChange, onClearAll }: FilterSidebarProps) {



    // Helper to toggle array items
    const toggleFilter = (key: keyof FilterState, value: string) => {

        if (!filters || !onFilterChange) return;

        const currentList = (filters[key] as string[]) || [];
        const isActive = currentList.includes(value);

        let newList;

        if (isActive) {
            newList = currentList.filter((item) => item !== value);
        } else {
            newList = [...currentList, value];
        }

        onFilterChange(key, newList);

    };



    // Price Range Local State for smooth sliding
    const [localPrice, setLocalPrice] = useState<[number, number] | null>(null);



    useEffect(() => {
        if (filters) {
            setLocalPrice(filters.priceRange);
        }
    }, [filters?.priceRange]);


    const handlePriceChange = (val: number[]) => {
        setLocalPrice([val[0], val[1]]);
    };


    const handlePriceCommit = (val: number[]) => {
        if (onFilterChange) {
            onFilterChange("priceRange", [val[0], val[1]]);
        }
    };


    if (!filters) return null; 



    return (


        <div className={cn("bg-white dark:bg-zinc-900 h-full flex flex-col overflow-hidden", className)}>


            {/* Mobile Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-100 dark:border-zinc-800 lg:hidden">
                <h2 className="font-bold text-xl flex items-center gap-2">
                    Filters
                </h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-6 h-6" />
                </Button>
            </div>


            <div className="flex-1 overflow-y-auto thin-scroll p-6 lg:p-0 lg:pr-6">


                {/* Categories */}
                <FilterSection title="Category">

                    <div className="space-y-3">

                        {filterCategories.categories.map((category) => {

                            const isChecked = filters.categories.includes(category);

                            return (

                                <div key={category} className="flex items-center gap-3 group" onClick={() => toggleFilter("categories", category)}>

                                    <Checkbox
                                        id={category}
                                        checked={isChecked}
                                        onCheckedChange={() => toggleFilter("categories", category)}
                                        className="rounded-sm w-5 h-5 border-zinc-300 dark:border-zinc-700 data-[state=checked]:bg-black dark:data-[state=checked]:bg-white data-[state=checked]:border-black dark:data-[state=checked]:border-white"
                                    />

                                    <label
                                        htmlFor={category}
                                        className="text-base text-zinc-600 dark:text-zinc-400 cursor-pointer group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors w-full"
                                    >
                                        {category}
                                    </label>

                                </div>

                            );

                        })}


                    </div>

                </FilterSection>



                {/* Brands */}
                <FilterSection title="Brands">

                    <div className="space-y-3">

                        {filterCategories.brands.map((brand) => {

                            const isChecked = filters.brands.includes(brand);

                            return (

                                <div key={brand} className="flex items-center gap-3 group" onClick={() => toggleFilter("brands", brand)}>

                                    <Checkbox
                                        id={brand}
                                        checked={isChecked}
                                        onCheckedChange={() => toggleFilter("brands", brand)}
                                        className="rounded-sm w-5 h-5 border-zinc-300 dark:border-zinc-700 data-[state=checked]:bg-black dark:data-[state=checked]:bg-white"
                                    />

                                    <label htmlFor={brand} className="text-base text-zinc-600 dark:text-zinc-400 cursor-pointer group-hover:text-zinc-900 dark:group-hover:text-zinc-200 w-full transition-colors">
                                        {brand}
                                    </label>

                                </div>

                            );

                        })}

                    </div>

                </FilterSection>




                {/* Color */}
                <FilterSection title="Color">


                    <div className="grid grid-cols-4 gap-2">


                        {filterCategories.colors.map((color) => {


                            const isSelected = filters.colors.includes(color.name);


                            return (

                                <div
                                    key={color.name}
                                    onClick={() => toggleFilter("colors", color.name)}
                                    className="flex flex-col items-center justify-center gap-1 p-3 rounded-xl cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors group"
                                >

                                    <div
                                        className={cn(
                                            "relative w-9 h-9 rounded-full border border-zinc-200 dark:border-zinc-700 shadow-sm flex items-center justify-center transition-all",
                                            isSelected
                                                ? "ring-2 ring-black dark:ring-white scale-105"
                                                : "group-hover:scale-110"
                                        )}
                                        style={{ backgroundColor: color.code }}
                                    >


                                        <span className="absolute inset-1 rounded-full bg-white/10" />


                                        {isSelected && (

                                            <Check
                                                className={cn(
                                                    "w-4 h-4 z-10",
                                                    color.name === "White" || color.name === "Yellow"
                                                        ? "text-black"
                                                        : "text-white"
                                                )}
                                                strokeWidth={3}
                                            />

                                        )}

                                    </div>


                                    <span
                                        className={cn(
                                            "text-xs text-center",
                                            isSelected
                                                ? "font-semibold text-zinc-900 dark:text-white"
                                                : "text-zinc-500 dark:text-zinc-400"
                                        )}
                                    >
                                        {color.name}
                                    </span>

                                </div>

                            );

                        })}

                    </div>

                </FilterSection>




                {/* Size - Using Chips */}
                <FilterSection title="Size" isOpen={false}>


                    <div className="flex flex-wrap gap-2">

                        {filterCategories.sizes.map((size) => {

                            const isSelected = filters.sizes.includes(size);

                            return (

                                <div key={size} className="relative">

                                    <label

                                        onClick={() => toggleFilter("sizes", size)}

                                        className={cn(
                                            "flex items-center justify-center w-12 h-10 rounded-lg border text-sm font-medium cursor-pointer transition-all select-none",
                                            isSelected
                                                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                                                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600"
                                        )}
                                    >
                                        {size}

                                    </label>

                                </div>

                            );

                        })}

                    </div>

                </FilterSection>



                {/* Price Range */}
                <FilterSection title="Price Range">

                    <div className="px-1">

                        <div className="flex items-center justify-between text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                            <span>₹{(localPrice ? localPrice[0] : 0).toLocaleString()}</span>
                            <span>₹{(localPrice ? localPrice[1] : 500000).toLocaleString()}+</span>
                        </div>

                        <Slider
                            value={localPrice || [0, 500000]}
                            max={600000}
                            step={1000}
                            className="my-4"
                            onValueChange={handlePriceChange}
                            onValueCommit={handlePriceCommit}
                        />

                        {/* Quick Select Buttons */}
                        <div className="mt-4 flex flex-wrap gap-2">
                            {filterCategories.priceRanges.slice(0, 4).map((range) => (
                                <button
                                    key={range.label}
                                    onClick={() => onFilterChange && onFilterChange("priceRange", [range.min, range.max === Infinity ? 600000 : range.max])}
                                    className="text-[11px] font-medium px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all border border-transparent hover:border-black dark:hover:border-white"
                                >
                                    {range.label}
                                </button>
                            ))}
                        </div>

                    </div>

                </FilterSection>


                {/* Wheel Size - Using Chips */}
                <FilterSection title="Wheel Size" isOpen={false}>

                    <div className="flex flex-wrap gap-2">

                        {filterCategories.wheelSizes.map((size) => {

                            const isSelected = filters.wheelSizes.includes(size);

                            return (

                                <div key={size} className="relative">

                                    <label
                                        onClick={() => toggleFilter("wheelSizes", size)}
                                        className={cn(
                                            "flex items-center px-4 h-10 rounded-lg border text-sm font-medium cursor-pointer transition-all select-none",
                                            isSelected
                                                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                                                : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-400 dark:hover:border-zinc-600"
                                        )}
                                    >

                                        {size}

                                    </label>

                                </div>

                            );

                        })}

                    </div>

                </FilterSection>



                {/* Material */}
                <FilterSection title="Material" isOpen={false}>

                    <div className="space-y-3">

                        {filterCategories.material.map((mat) => {

                            const isChecked = filters.materials.includes(mat);

                            return (

                                <div key={mat} className="flex items-center gap-3 group" onClick={() => toggleFilter("materials", mat)}>

                                    <Checkbox
                                        id={mat}
                                        checked={isChecked}
                                        onCheckedChange={() => toggleFilter("materials", mat)}
                                    />

                                    <label htmlFor={mat} className="text-base text-zinc-600 dark:text-zinc-400 cursor-pointer group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors w-full">
                                        {mat}
                                    </label>

                                </div>

                            );

                        })}

                    </div>

                </FilterSection>



                {/* Suspension */}
                <FilterSection title="Suspension" isOpen={false}>

                    <div className="space-y-3">

                        {filterCategories.suspension.map((sus) => {

                            const isChecked = filters.suspensions.includes(sus);

                            return (

                                <div key={sus} className="flex items-center gap-3 group" onClick={() => toggleFilter("suspensions", sus)}>

                                    <Checkbox
                                        id={sus}
                                        checked={isChecked}
                                        onCheckedChange={() => toggleFilter("suspensions", sus)}
                                    />

                                    <label htmlFor={sus} className="text-base text-zinc-600 dark:text-zinc-400 cursor-pointer group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors w-full">
                                        {sus}
                                    </label>
                                </div>
                            );

                        })}

                    </div>

                </FilterSection>

            </div>



            <div className="p-6 border-t border-zinc-100 dark:border-zinc-800 mt-auto bg-white dark:bg-zinc-900 z-10 sticky bottom-0">

                <Button
                    variant="outline"
                    size="lg"
                    className="w-full rounded-full border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    onClick={onClearAll}
                >
                    Clear All Filters
                </Button>

                {/* Mobile only Show Results button is redundant if results update live, but keeping it for closing sidebar */}
                <div className="lg:hidden mt-3">
                    <Button size="lg" className="w-full rounded-full bg-black dark:bg-white text-white dark:text-black" onClick={onClose}>
                        Show Results
                    </Button>
                </div>

            </div>


        </div>
    );
}
