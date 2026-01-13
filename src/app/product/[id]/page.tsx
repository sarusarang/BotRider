"use client";

import { products } from "@/data/shop-data";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductGallery } from "@/components/shop/product/ProductGallery";
import { ProductInfo } from "@/components/shop/product/ProductInfo";
import { ProductDetails } from "@/components/shop/product/ProductDetails";
import { ProductReviews } from "@/components/shop/product/ProductReviews";




export default function ProductPage() {


    const params = useParams();
    const id = params.id as string;

    const product = products.find((p) => p.id === id);



    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
                Product Not Found
            </div>
        );
    }


    const [selectedImage, setSelectedImage] = useState(product.image[0]);
    const [quantity, setQuantity] = useState(1);
    const [activeAccordion, setActiveAccordion] = useState<string | null>("specs");


    useEffect(() => {
        setSelectedImage(product.image[0]);
        setQuantity(1);
        setActiveAccordion("specs");
    }, [product]);


    const toggleAccordion = (value: string) => {
        setActiveAccordion(activeAccordion === value ? null : value);
    };



    return (


        <div className="h-screen bg-white dark:bg-zinc-950 overflow-hidden flex flex-col pt-16">


            {/* MAIN SPLIT LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-hidden">


                {/* LEFT — Gallery + Details */}
                <div className="lg:col-span-7 xl:col-span-8 overflow-y-auto no-scrollbar px-6 py-5 space-y-24">

                    <ProductGallery
                        images={product.image}
                        selectedImage={selectedImage}
                        onImageSelect={setSelectedImage}
                        title={product.title}
                    />

                    <ProductDetails
                        product={product}
                        activeAccordion={activeAccordion}
                        toggleAccordion={toggleAccordion}
                    />

                    <ProductReviews
                        reviews={product.reviews}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />

                </div>


                {/* RIGHT — Buy Panel */}
                <div className="lg:col-span-5 xl:col-span-4 overflow-y-auto no-scrollbar px-6 py-5">
                    <ProductInfo
                        product={product}
                        quantity={quantity}
                        setQuantity={setQuantity}
                    />
                </div>

            </div>

        </div>

    );

}
