import { useQuery } from "@tanstack/react-query"
import { GetFliterSidebar } from "./productApi"




// Hook to Get Filter Sidebar Data
export const useGetFliterSidebar = (key : string) => {

    return useQuery({

        queryKey: ["Fliter-Sidebar" , key],

        queryFn: async () => {

            return await GetFliterSidebar(key);

        },
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnWindowFocus: false,
        retry: 1,

    })

}