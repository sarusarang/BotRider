import { CommonApi } from "@/lib/CommonApi";



export const GetFliterSidebarApi = async (key: string) => {

const params = new URLSearchParams({ sidebar: key }).toString();

    return await CommonApi("GET", `/product/products-filter-side-bar/?${params}`);

}