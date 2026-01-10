export interface ProductColor {
    name: string;
    code: string;
}

export interface Product {
    id: string;
    title: string;
    category: string;
    price: number;
    originalPrice?: number;
    discountPercent?: number;

    image: string[];
    brand: string;
    size: string;
    wheelSize: string;
    material: string;
    suspension: string;
    color: ProductColor;

    isNew?: boolean;
    isFeatured?: boolean;
    tag?: "Best Seller" | "New Arrival" | "Trending" | "Limited";
}






export const sortOptions = [
    { id: "all", label: "All" },
    { id: "newest", label: "Newest Arrivals" },
    { id: "featured", label: "Featured" },
];



export const filterCategories = {
    categories: [
        "Road Bikes",
        "Gravel Bikes",
        "Mountain Bikes",
        "Hybrid Bikes",
        "Kids Bikes",
        "Electric Bikes",
    ],
    brands: [
        "Trek",
        "Cannondale",
        "Java",
        "Marin",
        "Fuji",
        "Polygon",
        "Look",
        "Firefox",
        "Imported",
    ],
    sizes: ["S1", "S2", "S3", "S4", "S5", "S6", "XXS"],
    wheelSizes: [
        "12 inch",
        "14 inch",
        "16 inch",
        "18 inch",
        "20 inch",
        "22 inch",
        "24 inch",
        "26 inch",
        "27.5 inch",
        "28 inch",
        "29 inch",
        "700C - hybrid bikes",
    ],
    suspension: ["Front & Rear", "Front", "Rigid"],
    material: ["Carbon", "Aluminum"],
    rearSuspensionTravel: [
        "75mm",
        "110mm",
        "120mm",
        "130mm",
        "140mm",
        "145mm",
        "150mm",
        "170mm",
        "200mm",
    ],
    colors: [
        { name: "Green", code: "#22c55e" },
        { name: "Blue", code: "#3b82f6" },
        { name: "Black", code: "#000000" },
        { name: "Grey", code: "#6b7280" },
        { name: "Red", code: "#ef4444" },
        { name: "Purple", code: "#a855f7" },
        { name: "Pink", code: "#ec4899" },
        { name: "White", code: "#ffffff" },
        { name: "Yellow", code: "#facc15" },
        { name: "Brown", code: "#92400e" },
        { name: "Orange", code: "#f97316" },
        { name: "Neutral", code: "#d1d5db" },
    ],
    priceRanges: [
        { label: "Below ₹25,000", min: 0, max: 25000 },
        { label: "₹25,000 - ₹50,000", min: 25000, max: 50000 },
        { label: "₹50,000 - ₹75,000", min: 50000, max: 75000 },
        { label: "₹75,000 - ₹1 Lakh", min: 75000, max: 100000 },
        { label: "₹1 Lakh - ₹5 Lakh", min: 100000, max: 500000 },
        { label: "Above ₹5 Lakh", min: 500000, max: Infinity },
    ],
};

// Generating dummy products
export const products: Product[] = [
    {
        id: "1",
        title: "Trek Marlin 7",
        category: "Mountain Bikes",
        price: 65000,
        brand: "Trek",
        size: "S3",
        wheelSize: "29 inch",
        material: "Aluminum",
        suspension: "Front",
        color: { name: "Red", code: "#ef4444" },
        image: ["https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888", "https://cradiac.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730970258"],
        isNew: true,
        tag: "Best Seller",
        originalPrice: 80000,
        discountPercent: 20,
    },
    {
        id: "2",
        title: "Cannondale Topstone Carbon",
        category: "Gravel Bikes",
        price: 250000,
        brand: "Cannondale",
        size: "S4",
        wheelSize: "700C - hybrid bikes",
        material: "Carbon",
        suspension: "Rigid",
        color: { name: "Green", code: "#22c55e" },
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        isFeatured: true,
        tag: "New Arrival",
        originalPrice: 280000,
        discountPercent: 10,
    },
    {
        id: "3",
        title: "Polygon Siskiu T8",
        category: "Mountain Bikes",
        price: 180000,
        brand: "Polygon",
        size: "S4",
        wheelSize: "29 inch",
        material: "Aluminum",
        suspension: "Front & Rear",
        color: { name: "Purple", code: "#a855f7" },
        image: ["https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888", "https://cradiac.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730970258"],
        tag: "Trending",
        originalPrice: 200000,
        discountPercent: 15,
    },
    {
        id: "4",
        title: "Java Siluro 3",
        category: "Road Bikes",
        price: 85000,
        brand: "Java",
        size: "S3",
        wheelSize: "700C - hybrid bikes",
        material: "Aluminum",
        suspension: "Rigid",
        color: { name: "Black", code: "#000000" },
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        tag: "Limited",
        originalPrice: 100000,
        discountPercent: 25,
    },
    {
        id: "5",
        title: "Marin Bobcat Trail",
        category: "Mountain Bikes",
        price: 55000,
        brand: "Marin",
        size: "S2",
        wheelSize: "27.5 inch",
        material: "Aluminum",
        suspension: "Front",
        color: { name: "Blue", code: "#3b82f6" },
        image: ["https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888", "https://cradiac.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730970258"],
        tag: "Best Seller",
        originalPrice: 80000,
        discountPercent: 20,
    },
    {
        id: "6",
        title: "Look 795 Blade",
        category: "Road Bikes",
        price: 650000,
        brand: "Look",
        size: "S4",
        wheelSize: "700C - hybrid bikes",
        material: "Carbon",
        suspension: "Rigid",
        color: { name: "White", code: "#ffffff" },
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        isFeatured: true,
        tag: "New Arrival",
        originalPrice: 80000,
        discountPercent: 20,
    },
    {
        id: "7",
        title: "Fuji Absolute",
        category: "Hybrid Bikes",
        price: 45000,
        brand: "Fuji",
        size: "S3",
        wheelSize: "700C - hybrid bikes",
        material: "Aluminum",
        suspension: "Rigid",
        color: { name: "Grey", code: "#6b7280" },
        image: ["https://cradiac.com/cdn/shop/files/ft.jpg?v=1742208888", "https://cradiac.com/cdn/shop/files/Secondary2.0_1066x.jpg?v=1730970258"],
        tag: "Trending",
        originalPrice: 60000,
        discountPercent: 10,
    },
    {
        id: "8",
        title: "Firefox Bad Attitude",
        category: "Mountain Bikes",
        price: 22000,
        brand: "Firefox",
        size: "S3",
        wheelSize: "26 inch",
        material: "Steel",
        suspension: "Front",
        color: { name: "Black", code: "#000000" },
        image: ["https://cdn.shopify.com/s/files/1/0628/5547/9548/files/ZeetaPlus27ICMBlk_533x.jpg?v=1714986541", "https://5.imimg.com/data5/SELLER/Default/2025/6/518411085/LK/TL/AF/64907775/27-5-zeeta-plus-ic-electric-bicycle.png"],
        tag: "Limited",
        originalPrice: 60000,
        discountPercent: 10,
    },
];
