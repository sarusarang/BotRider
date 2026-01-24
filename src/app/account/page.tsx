'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AccountSidebar from '@/app/components/common/AccountSidebar';
import ProfileSection from '@/app/components/account/ProfileSection';
import OrdersSection from '@/app/components/account/OrdersSection';
import AddressesSection from '@/app/components/account/AddressesSection';



export default function AccountPage() {


    const [activeSection, setActiveSection] = useState('profile');



    const renderSection = () => {
        switch (activeSection) {
            case 'profile':
                return <ProfileSection />;
            case 'orders':
                return <OrdersSection />;
            case 'addresses':
                return <AddressesSection />;
            default:
                return <ProfileSection />;
        }
    };



    return (


        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 pt-20 pb-32 lg:pb-8">


            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">


                <div className="flex gap-8">

                    {/* Sidebar */}
                    <AccountSidebar
                        activeSection={activeSection}
                        onSectionChange={setActiveSection}
                    />


                    {/* Main Content */}
                    <div className="flex-1 min-w-0">

                        <AnimatePresence mode="wait">

                            <motion.div
                                key={activeSection}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                {renderSection()}
                            </motion.div>

                        </AnimatePresence>

                    </div>

                </div>

            </div>

        </div>

    );


}
