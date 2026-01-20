import { CommonApi } from "@/lib/CommonApi";



export const GetFliterSidebar = async (key : string) => {

    const params = new URLSearchParams({key}.toString());

    return await CommonApi("GET" , `/product/bike-filter-side-bar/?${params}`);

}