'use client';

import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { orders, getOrderStatusColor, getOrderStatusLabel } from '@/data/account-data';
import { ArrowLeft, Package, Truck, MapPin, CreditCard, Download, Phone, Mail } from 'lucide-react';





export default function OrderDetailsPage() {


    const params = useParams();
    const router = useRouter();

    const orderId = params.id as string;


    const order = orders.find(o => o.id === orderId);



    if (!order) {
        return (
            <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center py-16">
                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h1>
                        <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
                        <button
                            onClick={() => router.back()}
                            className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }



    return (


        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-8">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-semibold"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Orders
                </motion.button>


                {/* Order Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl border border-gray-200 p-6 mb-6"
                >

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">

                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Details</h1>
                            <p className="text-gray-600">Order #{order.orderNumber}</p>
                        </div>

                        <span className={`px-4 py-2 rounded-full text-sm font-semibold border ${getOrderStatusColor(order.status)}`}>
                            {getOrderStatusLabel(order.status)}
                        </span>

                    </div>



                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-gray-100">

                        <div>
                            <p className="text-sm text-gray-600 mb-1">Order Date</p>
                            <p className="font-semibold text-gray-900">
                                {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                        </div>

                        {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Estimated Delivery</p>
                                <p className="font-semibold text-gray-900">
                                    {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                </p>
                            </div>
                        )}

                        {order.trackingNumber && (
                            <div>
                                <p className="text-sm text-gray-600 mb-1">Tracking Number</p>
                                <p className="font-semibold text-gray-900">{order.trackingNumber}</p>
                            </div>
                        )}

                    </div>


                </motion.div>



                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">


                        {/* Order Items */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6"
                        >

                            <div className="flex items-center gap-3 mb-6">

                                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                                    <Package className="w-5 h-5 text-blue-600" />
                                </div>

                                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>

                            </div>


                            <div className="space-y-4">

                                {order.items.map((item) => (


                                    <div key={item.id} className="flex gap-4 p-4 rounded-xl bg-gray-50">

                                        <div className="w-20 h-20 rounded-xl bg-white overflow-hidden shrink-0">
                                            <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />
                                        </div>

                                        <div className="flex-1 min-w-0">

                                            <h3 className="font-semibold text-gray-900 mb-1">{item.productName}</h3>

                                            <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                                                {item.size && <span>Size: {item.size}</span>}
                                                {item.color && <span>• Color: {item.color}</span>}
                                                <span>• Qty: {item.quantity}</span>
                                            </div>

                                            <p className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</p>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </motion.div>



                        {/* Shipping Address */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6"
                        >

                            <div className="flex items-center gap-3 mb-6">

                                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-green-600" />
                                </div>

                                <h2 className="text-xl font-bold text-gray-900">Shipping Address</h2>

                            </div>


                            <div className="space-y-2">

                                <p className="font-semibold text-gray-900">{order.shippingAddress.name}</p>

                                <p className="text-gray-600">
                                    {order.shippingAddress.addressLine1}
                                    {order.shippingAddress.addressLine2 && `, ${order.shippingAddress.addressLine2}`}
                                </p>

                                <p className="text-gray-600">
                                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                                </p>

                                <div className="flex items-center gap-2 text-gray-600 pt-2">
                                    <Phone className="w-4 h-4" />
                                    <span>{order.shippingAddress.phone}</span>
                                </div>

                            </div>

                        </motion.div>

                    </div>



                    {/* Sidebar */}
                    <div className="space-y-6">

                        {/* Order Summary */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6"
                        >

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-purple-600" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                            </div>


                            <div className="space-y-3">

                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{order.subtotal.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping.toLocaleString()}`}</span>
                                </div>

                                <div className="flex justify-between text-gray-600">
                                    <span>Tax</span>
                                    <span>₹{order.tax.toLocaleString()}</span>
                                </div>

                                <div className="pt-3 border-t border-gray-200">
                                    <div className="flex justify-between">
                                        <span className="text-lg font-bold text-gray-900">Total</span>
                                        <span className="text-2xl font-bold text-gray-900">₹{order.total.toLocaleString()}</span>
                                    </div>
                                </div>

                            </div>

                        </motion.div>



                        {/* Actions */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="space-y-3"
                        >

                            {order.trackingNumber && (
                                <button className="w-full px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                                    <Truck className="w-5 h-5" />
                                    Track Order
                                </button>
                            )}

                            <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                Download Invoice
                            </button>

                            <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                                <Mail className="w-5 h-5" />
                                Contact Support
                            </button>

                        </motion.div>

                    </div>

                </div>

            </div>

        </div>

    );


}
