'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Home, Briefcase } from 'lucide-react';
import type { Address } from '@/data/account-data';



interface AddressFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    address?: Address;
    mode: 'add' | 'edit';
}




export default function AddressFormModal({ isOpen, onClose, address, mode }: AddressFormModalProps) {


    const [formData, setFormData] = useState({
        type: address?.type || 'home',
        name: address?.name || '',
        phone: address?.phone || '',
        addressLine1: address?.addressLine1 || '',
        addressLine2: address?.addressLine2 || '',
        city: address?.city || '',
        state: address?.state || '',
        pincode: address?.pincode || '',
        isDefault: address?.isDefault || false
    });



    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add save logic here
        console.log('Saving address:', formData);
        onClose();
    };



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };




    return (


        <AnimatePresence>


            {isOpen && (


                <>

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />


                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">


                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
                        >

                            {/* Header */}
                            <div className="bg-linear-to-br from-gray-900 to-gray-800 text-white p-6 flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                                        <MapPin className="w-6 h-6" />
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {mode === 'add' ? 'Add New Address' : 'Edit Address'}
                                        </h2>
                                        <p className="text-sm text-gray-300">
                                            {mode === 'add' ? 'Add a new delivery address' : 'Update your delivery address'}
                                        </p>
                                    </div>

                                </div>

                                <button
                                    onClick={onClose}
                                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                            </div>



                            {/* Form */}
                            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">


                                <div className="space-y-5">


                                    {/* Address Type */}
                                    <div>

                                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                                            Address Type
                                        </label>


                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { value: 'home', label: 'Home', icon: Home },
                                                { value: 'work', label: 'Work', icon: Briefcase },
                                                { value: 'other', label: 'Other', icon: MapPin }
                                            ].map((type) => (
                                                <button
                                                    key={type.value}
                                                    type="button"
                                                    onClick={() => setFormData(prev => ({ ...prev, type: type.value as 'home' | 'work' | 'other' }))}
                                                    className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${formData.type === type.value
                                                        ? 'border-gray-900 bg-gray-50'
                                                        : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <type.icon className="w-5 h-5" />
                                                    <span className="text-sm font-semibold">{type.label}</span>
                                                </button>
                                            ))}
                                        </div>


                                    </div>



                                    {/* Name and Phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                                        <div>

                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Full Name *
                                            </label>

                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter full name"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            />
                                        </div>

                                        <div>

                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Phone Number *
                                            </label>

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                placeholder="+91 98765 43210"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            />
                                        </div>

                                    </div>



                                    {/* Address Lines */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Address Line 1 *
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            value={formData.addressLine1}
                                            onChange={handleChange}
                                            required
                                            placeholder="House/Flat No., Building Name"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        />
                                    </div>



                                    <div>
                                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                                            Address Line 2
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleChange}
                                            placeholder="Street, Area, Landmark (Optional)"
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        />
                                    </div>


                                    {/* City, State, Pincode */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                        <div>

                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                City *
                                            </label>

                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                placeholder="City"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            />

                                        </div>


                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                State *
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                                required
                                                placeholder="State"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                Pincode *
                                            </label>
                                            <input
                                                type="text"
                                                name="pincode"
                                                value={formData.pincode}
                                                onChange={handleChange}
                                                required
                                                placeholder="560001"
                                                pattern="[0-9]{6}"
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            />
                                        </div>

                                    </div>


                                    {/* Default Address */}
                                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                        <input
                                            type="checkbox"
                                            name="isDefault"
                                            id="isDefault"
                                            checked={formData.isDefault}
                                            onChange={handleChange}
                                            className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                                        />
                                        <label htmlFor="isDefault" className="text-sm font-semibold text-gray-900 cursor-pointer">
                                            Set as default address
                                        </label>
                                    </div>

                                </div>



                                {/* Actions */}
                                <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">

                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                                    >
                                        {mode === 'add' ? 'Add Address' : 'Save Changes'}
                                    </button>

                                </div>

                            </form>

                        </motion.div>

                    </div>

                </>

            )}

        </AnimatePresence>

    );


}
