import ShopClient from "./ShopClient";
import { serverFetch } from "@/lib/fetcher";
import { PaginatedResponse, BikeProduct, AccessoryProduct } from "@/types/product";



export default async function ShopPage({ params, searchParams, }: { params: { slug: string }; searchParams: { [key: string]: string | string[] | undefined }; }) {


    const { slug } = await params;
    const resolvedSearchParams = await searchParams;


    const type = slug === "accessories" ? "accessories" : "bike";


    const query = new URLSearchParams();


    Object.entries(resolvedSearchParams).forEach(([key, value]) => {

        if (!value) return;

        if (Array.isArray(value)) value.forEach(v => query.append(key, v));
        else query.append(key, value);

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
