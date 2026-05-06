export interface CartItemBike {
    id: number;
    unique_id: string;
    name: string;
    description: string;
    product_type: "bike";
    price: string;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;
    featured_image: string | null;
    brand: string;
    category?: string;
    sizes?: any[];
    bike_colors?: CartItemColor[];
}

export interface CartItemAccessory {
    id: number;
    unique_id: string;
    name: string;
    description: string;
    product_type: "accessories";
    price: string;
    stock: number;
    is_available: boolean;
    is_out_of_stock: boolean;
    is_discount: boolean;
    discount_price: string;
    discount_percentage: string;
    featured_image: string | null;
    brand: string;
    accessory_images?: string[];
}

export interface CartItemSize {
    id: number;
    size: string;
}

export interface CartItemColor {
    id: number;
    color: string;
    bike_images?: string[];
    bike?: number;
}

export interface CartProduct {
    id: number;
    bike?: CartItemBike;
    accessory?: CartItemAccessory;
    size?: CartItemSize;
    color?: CartItemColor;
    quantity: number;
    user_cart: number;
}


export interface CartResponse {
    id: number;
    total_products: number;
    total_amount: number;
    orginal_amount: number;
    total_discount: number;
    total_bikes: number;
    total_accessories: number;
    all_products: CartProduct[];
    shipping_charge: number;
    unique_id: string;
    user: number;
}
