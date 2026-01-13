"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import { products, sortOptions } from "@/data/shop-data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { FilterState, initialFilterState } from "@/types/filters";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";






export default function ShopPage() {



    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [sortBy, setSortBy] = useState("all");
    const [filters, setFilters] = useState<FilterState>(initialFilterState);



    // Single source of truth
    const handleFilterChange = (key: keyof FilterState, value: any) => {
        setFilters(prev => ({
            ...prev,
            [key]: value,
        }));
    };


    // Clear all filters
    const clearAllFilters = () => {
        setFilters(initialFilterState);
    };



    // This is what your API will receive
    const apiPayload = {
        filters,
        sortBy,
        page: 1,
        limit: 12,
    };


    console.log("SEND TO API 👇", apiPayload);




    return (


        <div className="min-h-screen bg-white dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">


            <div className="container mx-auto px-4 py-16">


                <div className="flex flex-col lg:flex-row gap-4 relative">


                    {/* Mobile Actions Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 lg:hidden sticky top-4 z-40 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-xl ring-1 ring-black/5">

                        <Button
                            variant="default"
                            size="lg"
                            onClick={() => setIsMobileFilterOpen(true)}
                            className="gap-2 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black rounded-full"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                        </Button>


                        <div className="flex items-center gap-3">

                            <Select value={sortBy} onValueChange={setSortBy}>

                                <SelectTrigger className="w-[160px] h-11 rounded-full border-zinc-200 bg-transparent">
                                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                                        <ArrowUpDown className="w-3 h-3" />
                                        Sort
                                    </span>
                                </SelectTrigger>

                                <SelectContent>
                                    {sortOptions.map((option) => (
                                        <SelectItem key={option.id} value={option.id}>
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>

                            </Select>

                        </div>

                    </div>



                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-80 shrink-0 sticky top-16 h-[calc(100vh-6rem)]">

                        <div className="flex h-full flex-col bg-white dark:bg-zinc-900">

                            {/* Header */}
                            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">

                                <h2 className="text-lg font-bold flex items-center gap-2 tracking-tight">
                                    <Filter className="w-5 h-5" /> Filters
                                </h2>

                                <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md text-zinc-500">
                                    {products.length} Items
                                </span>

                            </div>


                            {/* Scroll Container */}
                            <div className="flex-1 overflow-y-auto">
                                <FilterSidebar
                                    className="p-2"
                                    filters={filters}
                                    onFilterChange={handleFilterChange}
                                    onClearAll={clearAllFilters}
                                />
                            </div>

                        </div>

                    </aside>



                    {/* Mobile Filter Drawer */}
                    <AnimatePresence>

                        {isMobileFilterOpen && (

                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setIsMobileFilterOpen(false)}
                                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 lg:hidden"
                                />

                                <motion.div
                                    initial={{ x: "100%" }}
                                    animate={{ x: 0 }}
                                    exit={{ x: "100%" }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-zinc-900 shadow-2xl z-50 lg:hidden overflow-hidden"
                                >

                                    <FilterSidebar
                                        onClose={() => setIsMobileFilterOpen(false)}
                                        className="h-full"
                                        filters={filters}
                                        onFilterChange={handleFilterChange}
                                        onClearAll={clearAllFilters}
                                    />

                                </motion.div>

                            </>

                        )}

                    </AnimatePresence>



                    {/* Main Content Area */}
                    <main className="flex-1 mt-4">


                        {/* Desktop Sort & Count */}
                        <div className="hidden lg:flex items-center justify-between mb-5">

                            <p className="text-sm font-medium text-zinc-500">
                                Showing all <span className="text-black dark:text-white font-bold">{products.length}</span> results
                            </p>

                            <div className="flex items-center gap-3">

                                <span className="text-sm font-medium text-zinc-500">Sort by:</span>

                                <Select value={sortBy} onValueChange={setSortBy}>

                                    <SelectTrigger className="w-[180px] bg-transparent border-zinc-200 dark:border-zinc-800 rounded-full">
                                        <SelectValue placeholder="Featured" />
                                    </SelectTrigger>

                                    <SelectContent>
                                        {sortOptions.map((option) => (
                                            <SelectItem key={option.id} value={option.id}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>

                                </Select>

                            </div>

                        </div>


                        {/* Product Grid */}
                        <ProductGrid products={products} />




                        {/* Pagination */}
                        <div className="mt-10 flex flex-col items-center gap-6">


                            <Pagination>


                                <PaginationContent>


                                    {/* Prev */}
                                    <PaginationItem>
                                        <PaginationPrevious

                                            className={1 === 1 ? "pointer-events-none opacity-40" : ""}
                                        />
                                    </PaginationItem>


                                    {/* Page Numbers */}
                                    {Array.from({ length: 5 }).map((_, i) => {

                                        const page = i + 1;
                                        const isActive = page === 1;

                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    isActive={isActive}
                                                    className={`rounded-full px-4 py-2 ${isActive ? "bg-black text-white dark:bg-white dark:text-black shadow-xl" : "hover:bg-zinc-100 dark:hover:bg-zinc-800"}`}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );

                                    })}


                                    {/* Next */}
                                    <PaginationItem>
                                        <PaginationNext

                                            className={1 == 1 ? "pointer-events-none opacity-40" : ""}
                                        />
                                    </PaginationItem>

                                </PaginationContent>

                            </Pagination>

                        </div>




                        {products.length === 0 && (
                            <div className="mt-20 flex flex-col items-center justify-center text-center">
                                <p className="text-lg font-medium text-zinc-500">No products found matching your criteria.</p>
                                <Button onClick={clearAllFilters} variant="link" className="mt-2">Clear all filters</Button>
                            </div>
                        )}


                    </main>


                </div>


            </div>


        </div>

    );

}
