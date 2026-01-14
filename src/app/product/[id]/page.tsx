"use client";

import { products } from "@/data/shop-data";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductGallery } from "@/components/shop/product/ProductGallery";
import { ProductInfo } from "@/components/shop/product/ProductInfo";
import { ProductDetails } from "@/components/shop/product/ProductDetails";
import { ProductReviews } from "@/components/shop/product/ProductReviews";
import { YouMayAlsoLike } from "@/components/shop/product/YouMayAlsoLike";



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
    const [activeAccordion, setActiveAccordion] = useState<string | null>(null);


    useEffect(() => {
        setSelectedImage(product.image[0]);
        setQuantity(1);
        setActiveAccordion(null);
    }, [product]);



    const toggleAccordion = (value: string) => {
        setActiveAccordion(activeAccordion === value ? null : value);
    };



    return (


        <div className={`min-h-screen pt-20 pb-10 sm:pb-0 sm:pt-16 ${product.isdark ? 'bg-black text-white dark' : 'bg-white dark:bg-zinc-950'}`}>


            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 lg:h-[calc(100vh-64px)]">


                {/* LEFT COLUMN */}
                <div className="lg:col-span-7 xl:col-span-8 lg:overflow-y-auto no-scrollbar space-y-5">


                    {/* Gallery */}
                    <ProductGallery
                        images={product.image}
                        selectedImage={selectedImage}
                        onImageSelect={setSelectedImage}
                        title={product.title}
                    />


                    {/* Mobile Buy Panel (appears after gallery) */}
                    <div className="block lg:hidden">
                        <ProductInfo
                            product={product}
                            quantity={quantity}
                            setQuantity={setQuantity}
                        />
                    </div>


                    {/* Details */}
                    <ProductDetails
                        product={product}
                        activeAccordion={activeAccordion}
                        toggleAccordion={toggleAccordion}
                    />


                    {/* Reviews */}
                    <ProductReviews
                        reviews={product.reviews}
                        rating={product.rating}
                        reviewCount={product.reviewCount}
                    />


                    {/* You May Also Like */}
                    <YouMayAlsoLike
                        products={products.filter(p => p.id !== product.id)}
                    />


                </div>


                {/* RIGHT COLUMN – Desktop Buy Panel */}
                <div className="hidden lg:block lg:col-span-5 xl:col-span-4 lg:overflow-y-auto no-scrollbar px-6 py-6">
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
