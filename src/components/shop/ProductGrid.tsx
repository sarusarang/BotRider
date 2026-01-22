"use client";

import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/data/shop-data";
import { BikeProduct , AccessoryProduct } from "@/types/product";


export default function ProductGrid({ products }: { products: (BikeProduct | AccessoryProduct)[] }) {


    // Animation
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };


    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };
    


    return (

        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
        >

            {products?.map((product) => (

                <motion.div key={product.id} variants={item}>

                    <ProductCard product={product} height="h-[520px] sm:h-[535px]" />

                </motion.div>

            ))}

        </motion.div>

    );

}
