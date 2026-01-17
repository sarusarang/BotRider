'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import { dummyCartItems, getCartItemWithProduct, calculateCartTotals, CartItem } from '@/data/cart-data';

export default function CartPage() {
    const [cartItems, setCartItems] = useState(dummyCartItems);
    const cartItemsWithProducts = cartItems.map(getCartItemWithProduct);
    const totals = calculateCartTotals(cartItems);

    const updateQuantity = (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        setCartItems(items =>
            items.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (itemId: string) => {
        setCartItems(items => items.filter(item => item.id !== itemId));
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                            <ShoppingBag className="w-12 h-12 text-gray-400" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                        <p className="text-gray-600 mb-8">Add some bikes to get started!</p>
                        <Link href="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                            >
                                Continue Shopping
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-14 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
                    <p className="text-gray-600">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart</p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        <AnimatePresence mode="popLayout">
                            {cartItemsWithProducts.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, x: -100 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white rounded-2xl border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="flex gap-4 md:gap-6">
                                        {/* Product Image */}
                                        <Link href={`/product/${item.product?.id}`} className="shrink-0">
                                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gray-50 overflow-hidden group">
                                                <img
                                                    src={item.product?.image[0]}
                                                    alt={item.product?.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                />
                                            </div>
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between gap-4 mb-2">
                                                <div className="flex-1 min-w-0">
                                                    <Link href={`/product/${item.product?.id}`}>
                                                        <p className="text-xs text-gray-500 mb-1 font-medium">{item.product?.brand}</p>
                                                        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm md:text-base">
                                                            {item.product?.title}
                                                        </h3>
                                                    </Link>

                                                    {/* Price with Discount */}
                                                    <div className="mb-3">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <p className="text-lg md:text-xl font-bold text-gray-900">
                                                                ₹{item.product?.price.toLocaleString()}
                                                            </p>
                                                            {item.product?.originalPrice && (
                                                                <>
                                                                    <p className="text-sm text-gray-400 line-through">
                                                                        ₹{item.product.originalPrice.toLocaleString()}
                                                                    </p>
                                                                    {item.product.discountPercent && (
                                                                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-md text-xs font-bold">
                                                                            {item.product.discountPercent}% OFF
                                                                        </span>
                                                                    )}
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Selected Options */}
                                                    <div className="flex flex-wrap gap-2 mb-2">
                                                        {item.selectedSize && (
                                                            <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs text-gray-700 font-medium">
                                                                Size: {item.selectedSize}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Color Display */}
                                                    {item.product?.color && item.product.color.length > 0 && (
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-xs text-gray-600 font-medium">Color:</span>
                                                            <div className="flex items-center gap-1.5">
                                                                {item.product.color.slice(0, 5).map((color, idx) => (
                                                                    <div
                                                                        key={idx}
                                                                        className={`w-5 h-5 rounded-full border-2 ${color.name === item.selectedColor
                                                                            ? 'border-gray-900 ring-2 ring-gray-300'
                                                                            : 'border-gray-300'
                                                                            }`}
                                                                        style={{ backgroundColor: color.code }}
                                                                        title={color.name}
                                                                    />
                                                                ))}
                                                                {item.product.color.length > 5 && (
                                                                    <span className="text-xs text-gray-500 ml-1">
                                                                        +{item.product.color.length - 5}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Remove Button - Desktop */}
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="hidden md:block p-2 h-fit text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>

                                            {/* Quantity and Total */}
                                            <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-100">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center border border-gray-200 rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                            className="p-2 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="px-4 py-2 font-semibold text-gray-900 min-w-12 text-center">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                            className="p-2 hover:bg-gray-50 transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Remove Button - Mobile */}
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="md:hidden p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                {/* Item Total */}
                                                <div className="text-right">
                                                    <p className="text-lg md:text-xl font-bold text-gray-900">
                                                        ₹{((item.product?.price || 0) * item.quantity).toLocaleString()}
                                                    </p>
                                                    {item.quantity > 1 && (
                                                        <p className="text-xs text-gray-500">
                                                            ₹{item.product?.price.toLocaleString()} each
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Continue Shopping */}
                        <Link href="/shop">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition-all"
                            >
                                Continue Shopping
                            </motion.button>
                        </Link>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-24"
                        >
                            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                            {/* Price Breakdown */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-semibold">₹{totals.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span className="flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        Shipping
                                    </span>
                                    <span className="font-semibold">
                                        {totals.shipping === 0 ? (
                                            <span className="text-green-600">Free</span>
                                        ) : (
                                            `₹${totals.shipping.toLocaleString()}`
                                        )}
                                    </span>
                                </div>
                                {totals.shipping > 0 && (
                                    <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded-lg">
                                        Add ₹{(5000 - totals.subtotal).toLocaleString()} more for free shipping!
                                    </div>
                                )}
                                <div className="flex justify-between text-gray-600">
                                    <span>Tax (GST 18%)</span>
                                    <span className="font-semibold">₹{totals.tax.toLocaleString()}</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">₹{totals.total.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Promo Code */}
                            <div className="mb-6">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    />
                                    <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                                        Apply
                                    </button>
                                </div>
                            </div>

                            {/* Checkout Button */}
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                            >
                                Proceed to Checkout
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>

                            {/* Security Badge */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                                    <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                    Secure Checkout
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
