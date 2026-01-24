import ShopClient from "./ShopClient";
import { serverFetch } from "@/lib/fetcher";
import { PaginatedResponse, BikeProduct, AccessoryProduct } from "@/types/product";
import { Metadata } from "next";



export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const { slug } = await params;

    const title = slug === "accessories"
        ? "Shop Accessories"
        : "Shop Bikes";

    const description = slug === "accessories"
        ? "Browse our collection of premium cycling accessories, from helmets to lights."
        : "Explore our range of high-performance road, mountain, and electric bikes.";

    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description: description,
        },
        twitter: {
            title: title,
            description: description,
        }
    };
}



export default async function ShopPage({ params, searchParams, }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined }; }) {


    const { slug } = await params;
    const resolvedSearchParams = await searchParams;


    const type = slug === "accessories" ? "accessories" : "bike";


    const query = new URLSearchParams();


    Object.entries(resolvedSearchParams).forEach(([key, value]) => {

        if (!value) return;

        if (Array.isArray(value)) {
            value.forEach(v => query.append(key, v));
            return;
        }

        // 👇 split comma-separated values
        if (typeof value === "string" && value.includes(",")) {
            value.split(",").forEach(v => query.append(key, v));
        } else {
            query.append(key, value);
        }

    });



    // Fetch product
    const productsRes = await serverFetch<PaginatedResponse<BikeProduct | AccessoryProduct>>(
        `/product/products-filtered/?${query}&type=${type}`,
        { cache: "no-store" }
    );



    return (

        <ShopClient
            type={type}
            products={productsRes.results}
            totalCount={productsRes.count}
            currentPage={productsRes.current_page}
            totalpages={productsRes.total_pages}
        />

    );


}
