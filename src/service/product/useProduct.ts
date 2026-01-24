import { useQuery } from "@tanstack/react-query"
import { GetFliterSidebarApi, GetSuggestedProductsApi } from "./productApi"
import { SidebarResponse } from "@/types/product"
import { BikeProduct , AccessoryProduct } from "@/types/product"



// Hook to Get Filter Sidebar Data
export const useGetFliterSidebar = (key: string) => {

    return useQuery<SidebarResponse>({

        queryKey: ["Fliter-Sidebar", key],

        queryFn: async () => {

            return await GetFliterSidebarApi(key) as SidebarResponse;

        },
        staleTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false,
        retry: 1,

    })

}



// Hook to Get Suggested Products
export const useGetSuggestedProducts = () => {

    return useQuery<BikeProduct[] | AccessoryProduct[]>({

        queryKey: ["Suggested-Products"],

        queryFn: async () => {

            return await GetSuggestedProductsApi() as BikeProduct[] | AccessoryProduct[];

        },
        staleTime: 1000 * 60 * 10, // 10 minutes
        refetchOnWindowFocus: false,
        retry: 1,

    })

}