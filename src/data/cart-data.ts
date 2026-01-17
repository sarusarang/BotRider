import { products } from './shop-data';

export interface CartItem {
    id: string;
    productId: string;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}

export interface Cart {
    items: CartItem[];
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
}

// Dummy cart data with some products
export const dummyCartItems: CartItem[] = [
    {
        id: 'cart_001',
        productId: '1',
        quantity: 1,
        selectedColor: 'Matte Black',
        selectedSize: 'M'
    },
    {
        id: 'cart_002',
        productId: '3',
        quantity: 2,
        selectedColor: 'Blue',
        selectedSize: 'L'
    },
    {
        id: 'cart_003',
        productId: '5',
        quantity: 1,
        selectedColor: 'Red',
        selectedSize: 'M'
    }
];

// Helper function to get cart item with product details
export const getCartItemWithProduct = (cartItem: CartItem) => {
    const product = products.find(p => p.id === cartItem.productId);
    return {
        ...cartItem,
        product
    };
};

// Helper function to calculate cart totals
export const calculateCartTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => {
        const product = products.find(p => p.id === item.productId);
        return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const shipping = subtotal > 5000 ? 0 : 200;
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + shipping + tax;

    return {
        subtotal,
        shipping,
        tax,
        total
    };
};
