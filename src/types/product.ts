
// Bike Product
export interface BikeColorImage {
    color: string;
    bike_images: string[];
    color_code: string[];
}

export interface BikePoster {
    poster: string;
    title: string;
    description: string;
}

export interface BikeDownload {
    file: string;
    title: string;
}

export interface BikeProduct {

    id: number;
    name: string;
    description: string;

    wheel_size: string[];
    material: string[];
    suspension: string[];
    rear_suspension_travel: string[];

    special_tag: "Best Seller" | "New Arrival" | "Trending" | "Limited";

    bike_brand: string;
    bike_category: string;
    product_type: "bike";

    price: string;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;

    background_color: string | null;
    text_color: string | null;
    is_dark: boolean;

    is_featured: boolean;
    featured_image: string | null;

    youtube_link: string | null;
    youtube_video_id: string | null;

    bike_sizes: string[];

    bike_colors: BikeColorImage[];

    bike_posters: BikePoster[];
    bike_downloads: BikeDownload[];

    created: string;
}



// Accessory Product
export interface AccessoryProduct {

    id: number;
    name: string;
    description: string;
    product_type: "accessories";
    price: string;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;
    sub_category: string;
    accessory_images: string[];
    id_dark: boolean;
    special_tag: "Best Seller" | "New Arrival" | "Trending" | "Limited";
    created: Date;

}




// pagination
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
    total_pages: number;
    current_page: number;
}



// sidebar 
export interface BikeSidebarColor {
    name: string;
    code: string[];
}


export interface BikeSidebarResponse {
    bikes: string[];
    brands: string[];
    sizes: string[];
    wheel_sizes: string[];
    materials: string[];
    suspensions: string[];
    rearSuspensionTravel: string[];
    colors: BikeSidebarColor[];
    special_tags: string[];
    product_type: "bike";
}



export interface AccessoriesSidebarResponse {
    accessories: string[];
    sub_categories: string[];
    brands: string[];
    special_tags: string[];
    product_type: "accessories";
}



export type SidebarResponse = BikeSidebarResponse | AccessoriesSidebarResponse;
