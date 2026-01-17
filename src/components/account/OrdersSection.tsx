'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { orders, getOrderStatusColor, getOrderStatusLabel } from '@/data/account-data';
import { Package, Truck, CheckCircle, XCircle, Clock, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Order } from '@/data/account-data';




// Filter options
const filterOptions = [
    { id: 'all', label: 'All Orders' },
    { id: 'pending', label: 'Pending' },
    { id: 'processing', label: 'Processing' },
    { id: 'shipped', label: 'Shipped' },
    { id: 'delivered', label: 'Delivered' },
    { id: 'cancelled', label: 'Cancelled' }
];



// Get status icon
const getStatusIcon = (status: Order['status']) => {
    switch (status) {
        case 'pending':
            return <Clock className="w-4 h-4" />;
        case 'processing':
            return <Package className="w-4 h-4" />;
        case 'shipped':
            return <Truck className="w-4 h-4" />;
        case 'delivered':
            return <CheckCircle className="w-4 h-4" />;
        case 'cancelled':
            return <XCircle className="w-4 h-4" />;
    }
};




export default function OrdersSection() {


    const [activeFilter, setActiveFilter] = useState('all');


    const filteredOrders = activeFilter === 'all' ? orders : orders.filter(order => order.status === activeFilter);



    return (


        <div className="space-y-6">


            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-600 mt-1">Track and manage your orders</p>
            </div>


            {/* Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">

                {filterOptions.map((option) => (

                    <motion.button
                        key={option.id}
                        onClick={() => setActiveFilter(option.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${activeFilter === option.id
                            ? 'bg-gray-900 text-white shadow-lg'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
                            }`}
                    >

                        {option.label}

                    </motion.button>

                ))}

            </div>



            {/* Orders List */}
            <AnimatePresence mode="wait">

                {filteredOrders.length === 0 ? (

                    <motion.div
                        key="empty"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="text-center py-16"
                    >

                        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
                        <p className="text-gray-600">You don't have any {activeFilter !== 'all' ? activeFilter : ''} orders yet.</p>

                    </motion.div>

                ) : (

                    <motion.div
                        key="orders"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >

                        {filteredOrders.map((order, index) => (

                            <motion.div
                                key={order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-red-200 transition-all group"
                            >

                                {/* Order Header */}
                                <div className="p-6 border-b border-gray-100">

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                                        <div>

                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1.5 ${getOrderStatusColor(order.status)}`}>
                                                    {getStatusIcon(order.status)}
                                                    {getOrderStatusLabel(order.status)}
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600">
                                                Placed on {new Date(order.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                                            </p>

                                        </div>

                                        <div className="text-right">
                                            <p className="text-2xl font-bold text-gray-900">₹{order.total.toLocaleString()}</p>
                                            <p className="text-sm text-gray-600">{order.items.length} {order.items.length === 1 ? 'item' : 'items'}</p>
                                        </div>

                                    </div>

                                </div>



                                {/* Order Items */}
                                <div className="p-6 space-y-4">

                                    {order.items.map((item) => (

                                        <div key={item.id} className="flex gap-4">

                                            <div className="w-20 h-20 rounded-xl bg-gray-100 overflow-hidden shrink-0">

                                                {/* <Image
                                                    src={item.productImage}
                                                    alt={item.productName}
                                                    width={80}
                                                    height={80}
                                                    className="w-full h-full object-cover"
                                                /> */}

                                                <img src={item.productImage} alt={item.productName} className="w-full h-full object-cover" />

                                            </div>

                                            <div className="flex-1 min-w-0">

                                                <h4 className="font-semibold text-gray-900 mb-1 truncate">{item.productName}</h4>

                                                <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                                                    {item.size && <span>Size: {item.size}</span>}
                                                    {item.color && <span>• Color: {item.color}</span>}
                                                    <span>• Qty: {item.quantity}</span>
                                                </div>

                                                <p className="text-sm font-semibold text-gray-900 mt-1">₹{item.price.toLocaleString()}</p>

                                            </div>

                                        </div>

                                    ))}

                                </div>



                                {/* Order Footer */}
                                <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

                                    <div className="text-sm">

                                        {order.trackingNumber && (

                                            <p className="text-gray-600">
                                                Tracking: <span className="font-semibold text-gray-900">{order.trackingNumber}</span>
                                            </p>

                                        )}


                                        {order.estimatedDelivery && order.status !== 'delivered' && order.status !== 'cancelled' && (

                                            <p className="text-gray-600 mt-1">
                                                Est. Delivery: <span className="font-semibold text-gray-900">
                                                    {new Date(order.estimatedDelivery).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                                </span>
                                            </p>
                                        )}


                                    </div>


                                    <Link href={`/account/orders/${order.id}`}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors group-hover:bg-red-600"
                                        >
                                            View Details
                                            <ChevronRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>

                                </div>

                            </motion.div>

                        ))}

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}
