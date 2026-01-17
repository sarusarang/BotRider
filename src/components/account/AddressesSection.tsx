'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { addresses } from '@/data/account-data';
import { MapPin, Home, Briefcase, Plus, Edit2, Trash2, Check } from 'lucide-react';
import type { Address } from '@/data/account-data';
import AddressFormModal from './AddressFormModal';



// get address icon based on type
const getAddressIcon = (type: Address['type']) => {
    switch (type) {
        case 'home':
            return <Home className="w-5 h-5" />;
        case 'work':
            return <Briefcase className="w-5 h-5" />;
        default:
            return <MapPin className="w-5 h-5" />;
    }
};



// get address color based on type
const getAddressColor = (type: Address['type']) => {
    switch (type) {
        case 'home':
            return 'bg-blue-100 text-blue-600';
        case 'work':
            return 'bg-purple-100 text-purple-600';
        default:
            return 'bg-gray-100 text-gray-600';
    }
};




export default function AddressesSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<Address | undefined>(undefined);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');

    const handleAddAddress = () => {
        setSelectedAddress(undefined);
        setModalMode('add');
        setIsModalOpen(true);
    };

    const handleEditAddress = (address: Address) => {
        setSelectedAddress(address);
        setModalMode('edit');
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="space-y-6">


                {/* Header */}
                <div className="flex items-center justify-between">

                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Saved Addresses</h1>
                        <p className="text-gray-600 mt-1">Manage your delivery addresses</p>
                    </div>

                    <motion.button
                        onClick={handleAddAddress}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold flex items-center gap-2 hover:bg-gray-800 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Add Address</span>
                    </motion.button>

                </div>



                {/* Addresses Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    {addresses.map((address, index) => (


                        <motion.div
                            key={address.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-red-200 transition-all group relative overflow-hidden"
                        >

                            {/* Default Badge */}
                            {address.isDefault && (
                                <div className="absolute top-0 right-0">
                                    <div className="bg-linear-to-br from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl flex items-center gap-1.5 text-xs font-semibold shadow-lg">
                                        <Check className="w-3.5 h-3.5" />
                                        Default
                                    </div>
                                </div>
                            )}


                            {/* Address Type Icon */}
                            <div className={`w-12 h-12 rounded-xl ${getAddressColor(address.type)} flex items-center justify-center mb-4`}>
                                {getAddressIcon(address.type)}
                            </div>


                            {/* Address Details */}
                            <div className="mb-4">

                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-bold text-gray-900 capitalize">{address.type}</h3>
                                </div>

                                <p className="font-semibold text-gray-900 mb-1">{address.name}</p>

                                <p className="text-sm text-gray-600 leading-relaxed">
                                    {address.addressLine1}
                                    {address.addressLine2 && `, ${address.addressLine2}`}
                                    <br />
                                    {address.city}, {address.state} - {address.pincode}
                                </p>

                                <p className="text-sm text-gray-600 mt-2">{address.phone}</p>

                            </div>


                            {/* Actions */}
                            <div className="flex gap-2 pt-4 border-t border-gray-100">

                                <motion.button
                                    onClick={() => handleEditAddress(address)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                >
                                    <Edit2 className="w-4 h-4" />
                                    Edit
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </motion.button>

                            </div>

                        </motion.div>

                    ))}


                    {/* Add New Address Card */}
                    <motion.button
                        onClick={handleAddAddress}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: addresses.length * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-6 hover:border-gray-400 hover:from-gray-100 hover:to-gray-200 transition-all min-h-[280px] flex flex-col items-center justify-center gap-4 group"
                    >

                        <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center group-hover:border-gray-400 group-hover:scale-110 transition-all">
                            <Plus className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                        </div>

                        <div className="text-center">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Add New Address</h3>
                            <p className="text-sm text-gray-600">Create a new delivery address</p>
                        </div>

                    </motion.button>

                </div>

            </div>

            {/* Address Form Modal */}
            <AddressFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                address={selectedAddress}
                mode={modalMode}
            />
        </>
    );
}
