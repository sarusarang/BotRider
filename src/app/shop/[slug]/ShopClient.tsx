"use client";

import { startTransition, useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSidebar from "@/components/shop/FilterSidebar";
import ProductGrid from "@/components/shop/ProductGrid";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { AccessoryProduct, BikeProduct } from "@/types/product";
import { useGetFliterSidebar } from "@/service/product/useProduct";
import FilterSidebarSkeleton from "@/components/loaders/FilterSidebarSkelton";
import FilterSidebarError from "@/components/loaders/FilterSidebarError";
import FilterGlobalLoader from "@/components/loaders/FilterGlobalLoader";



// ------------------ Props ------------------ //
interface ShopClientProps {
    products: (BikeProduct | AccessoryProduct)[];
    type: "bike" | "accessories";
    totalCount: number;
    currentPage: number;
    totalpages: number;
}




export default function ShopClient({ products, type, totalCount, currentPage, totalpages }: ShopClientProps) {


    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();



    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

    const [isPending, startTransition] = useTransition();



    // Get Filter Sidebar
    const { data: filterData, isLoading, isError, refetch } = useGetFliterSidebar(type);



    const sortBy = searchParams.get("sort") || "New Arrival";



    /** ---------- URL HELPERS ---------- */
    const updateURL = (params: URLSearchParams, scroll = false) => {
        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll });
        });
    };




    const toggleParam = (key: string, value: string) => {

        const params = new URLSearchParams(searchParams.toString());
        const values = params.getAll(key);


        params.delete("page"); // reset pagination


        if (values.includes(value)) {

            params.delete(key);
            values.filter(v => v !== value).forEach(v => params.append(key, v));

        } else {

            values.forEach(v => params.append(key, v));
            params.append(key, value);

        }

        updateURL(params);

    };



    const setRange = (minKey: string, maxKey: string, min: number, max: number) => {

        const params = new URLSearchParams(searchParams.toString());

        params.set(minKey, String(min));

        params.set(maxKey, String(max));

        params.delete("page");

        updateURL(params);

    };



    const handleSortChange = (value: string) => {

        const params = new URLSearchParams(searchParams.toString());

        params.set("sort", value);

        updateURL(params);

    };



    const clearAllFilters = () => {

        router.push(pathname);

    };



    const handlePageChange = (page: number) => {

        if (page < 1 || page > totalpages) return;

        const params = new URLSearchParams(searchParams.toString());

        params.set("page", page.toString());

        updateURL(params, true);

    };




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

                            <Select value={sortBy} onValueChange={handleSortChange}>

                                <SelectTrigger className="w-40 h-11 rounded-full border-zinc-200 bg-transparent">

                                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                                        <ArrowUpDown className="w-3 h-3" />
                                        Sort
                                    </span>

                                </SelectTrigger>

                                <SelectContent>

                                    {filterData?.special_tags?.map(option => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}

                                </SelectContent>

                            </Select>

                        </div>

                    </div>


                    {/* Desktop Sidebar */}
                    <aside className="hidden lg:block w-80 shrink-0 sticky top-16 h-[calc(100vh-6rem)]">

                        <div className="flex h-full flex-col bg-white dark:bg-zinc-900">

                            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 shrink-0">
                                <h2 className="text-lg font-bold flex items-center gap-2 tracking-tight">
                                    <Filter className="w-5 h-5" /> Filters
                                </h2>
                                <span className="text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-md text-zinc-500">
                                    {totalCount} Items
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto">

                                {isLoading && <FilterSidebarSkeleton className="w-full lg:w-[320px]" />}

                                {isError && (
                                    <FilterSidebarError onRetry={() => refetch()} />
                                )}

                                {filterData && (

                                    <FilterSidebar
                                        className="p-2"
                                        categoriesData={filterData}
                                        searchParams={searchParams}
                                        onToggle={toggleParam}
                                        onSetRange={setRange}
                                        onClearAll={clearAllFilters}
                                    />

                                )}

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

                                    {isLoading && <FilterSidebarSkeleton className="w-full lg:w-[320px]" />}

                                    {isError && (
                                        <FilterSidebarError onRetry={() => refetch()} />
                                    )}

                                    {filterData && (

                                        <FilterSidebar
                                            className="p-2"
                                            categoriesData={filterData}
                                            searchParams={searchParams}
                                            onToggle={toggleParam}
                                            onSetRange={setRange}
                                            onClearAll={clearAllFilters}
                                        />

                                    )}

                                </motion.div>

                            </>

                        )}

                    </AnimatePresence>



                    {/* Main Content */}
                    <main className="flex-1 mt-4">

                        {/* Desktop Sort */}
                        <div className="hidden lg:flex items-center justify-between mb-5">
                            <p className="text-sm font-medium text-zinc-500">
                                Showing <span className="text-black dark:text-white font-bold">{products.length}</span> results
                            </p>
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-zinc-500">Sort by:</span>
                                <Select value={sortBy} onValueChange={handleSortChange} >
                                    <SelectTrigger className="w-45 bg-transparent border-zinc-200 dark:border-zinc-800 rounded-full">
                                        <SelectValue placeholder="Featured" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {filterData?.special_tags?.map(option => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        {/* Product Grid */}
                        <ProductGrid products={products} />


                        {/* Pagination */}
                        {totalCount > 0 && (
                            <div className="mt-10 flex flex-col items-center gap-6">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious
                                                onClick={() => handlePageChange(currentPage - 1)}
                                                className={currentPage <= 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}
                                            />
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationLink isActive className="rounded-full shadow-xl bg-black text-white dark:bg-white dark:text-black">
                                                {currentPage}
                                            </PaginationLink>
                                        </PaginationItem>

                                        <PaginationItem>
                                            <PaginationNext
                                                onClick={() => handlePageChange(currentPage + 1)}
                                                className={currentPage >= totalpages ? "pointer-events-none opacity-40" : "cursor-pointer"}
                                            />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </div>
                        )}



                        {products.length === 0 && (
                            <div className="mt-20 flex flex-col items-center justify-center text-center">
                                <p className="text-lg font-medium text-zinc-500">
                                    No products found matching your criteria.
                                </p>
                                <Button onClick={clearAllFilters} variant="link" className="mt-2">
                                    Clear all filters
                                </Button>
                            </div>
                        )}

                    </main>
                </div>
            </div>


            {/* Global Loading Overlay */}
            {isPending && <FilterGlobalLoader text="Applying Filters…" />}


        </div>
    );
}
