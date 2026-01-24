import { serverFetch } from "@/lib/fetcher";
import ProductClient from "./ProductClient";
import { BikeProduct, AccessoryProduct } from "@/types/product";
import { notFound } from "next/navigation";
import { Metadata } from "next";



// Union type for product
type Product = BikeProduct | AccessoryProduct;




export async function generateMetadata({ params, searchParams }: { params: { id: string }; searchParams: { type?: string }; }): Promise<Metadata> {

    
    const { id } = await params;
    const { type } = await searchParams;
   

    const productType = type || "bike";


    const product = await serverFetch<Product>(
        `/product/product-detail-page/${productType}/${id}/`,
        { cache: "no-store" }
    );


    if (!product) {
        return {
            title: "Product Not Found",
        };
    }

    
    // Determine the primary image
    let imageUrl = "/logo.png"; 
    
    if (product.product_type === "bike") {
    
        const bike = product as BikeProduct;
        imageUrl = bike.featured_image || bike.bike_colors[0]?.bike_images[0] || imageUrl;
    
    } else {
    
        const accessory = product as AccessoryProduct;
        imageUrl = accessory.accessory_images[0] || imageUrl;
    
    }


    const title = `${product.name}`;

    const description = product.description.substring(0, 160);


    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
            images: [
                {
                    url: imageUrl,
                    alt: product.name,
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: title,
            description: description,
            images: [imageUrl],
        },
    };
    
}



export default async function ProductPage({ params, searchParams }: { params: { id: string }; searchParams: { type?: string }; }) {


    const { id } = await params;
    const { type } = await searchParams;


    // Default to 'bike' if type is not provided
    const productType = type || "bike";


    // Fetch product
    const productsRes = await serverFetch<Product>(
        `/product/product-detail-page/${productType}/${id}/`,
        { cache: "no-store" }
    );


    // Check if product exists
    if (!productsRes) {
        return notFound()
    }


    return (


        <ProductClient product={productsRes} />


    );


}
