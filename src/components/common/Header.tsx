'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';




// Menu Items
const MENU_ITEMS = [
  { name: 'Home', href: '/' },
  { name: 'Bikes', href: '/bikes', hasDropdown: true },
  { name: 'Accessories', href: '/accessories', hasDropdown: true },
  { name: 'Abouts', href: '/about' },
  { name: 'Contacts', href: '/contact' },
];




// Dummy Data
const BIKES_CATEGORIES = [
  {
    title: 'Mountain Bikes',
    href: '/bikes/mountain',
    items: [
      { name: 'Trail', price: 'From $2,500', image: "https://justbuycycles.com/cdn/shop/products/T04726_1.png?v=1663829546" },
      { name: 'Downhill', price: 'From $4,000', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kosXTzQyuibQ3S8xL-fHhWJN7FO0VkVb1A&s" },
      { name: 'Cross Country', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
      { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
      { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
      { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
    ],
    image: 'https://static.vecteezy.com/system/resources/thumbnails/070/103/302/small/mountain-biker-cycling-on-rocky-trail-outdoor-sport-adventure-photo.jpg'
  },
  {
    title: 'Electric Bikes',
    href: '/bikes/electric',
    items: [
      { name: 'Turbo Levo', price: 'From $5,000', image: "https://justbuycycles.com/cdn/shop/products/T04726_1.png?v=1663829546" },
      { name: 'Turbo Vado', price: 'From $3,500', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kosXTzQyuibQ3S8xL-fHhWJN7FO0VkVb1A&s" },
      { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
    ],
    image: 'https://images.pexels.com/photos/15020753/pexels-photo-15020753.jpeg?cs=srgb&dl=pexels-team-evelo-413077137-15020753.jpg&fm=jpg'
  },
  {
    title: 'Road Bikes',
    href: '/bikes/road',
    items: [
      { name: 'Tarmac', price: 'From $3,800', image: "https://justbuycycles.com/cdn/shop/products/T04726_1.png?v=1663829546" },
      { name: 'Aethos', price: 'From $4,200', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kosXTzQyuibQ3S8xL-fHhWJN7FO0VkVb1A&s" },
      { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
    ],
    image: 'https://media.istockphoto.com/id/1048624316/photo/cyclist-legs-riding-mountain-bike-on-highway.jpg?s=1024x1024&w=is&k=20&c=AKZnoG8FU8Gk6RuhzEuGrU8DNeEJ-f5XsZouLLVkLF0='
  },
  {
    title: 'Hybrid Bikes',
    href: '/bikes/hybrid',
    items: [
      { name: 'Tarmac', price: 'From $3,800', image: "https://justbuycycles.com/cdn/shop/products/T04726_1.png?v=1663829546" },
      { name: 'Aethos', price: 'From $4,200', image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9kosXTzQyuibQ3S8xL-fHhWJN7FO0VkVb1A&s" },
      { name: 'Enduro', price: 'From $3,200', image: "https://justbuycycles.com/cdn/shop/files/1_497c3424-d767-4f02-8868-5d24fc7736ea.jpg?v=1728047417" },
    ],
    image: 'https://media.istockphoto.com/id/973722408/photo/silhouette-of-cyclist-on-the-background-of-beautiful-sunset.jpg?s=612x612&w=0&k=20&c=WiFWuNZkBHEY_7wdUMAxfTbonIFlR1z64QQhB5jZOQ8='
  }
];



// Dummy Data
const ACCESSORIES_CATEGORIES = [
  {
    title: 'Gear',
    href: '/accessories/gear',
    items: [{ name: 'Helmets', price: 'From $50', image: "https://omobikes.com/cdn/shop/products/1655449384604.jpg?v=1751275251" }, { name: 'Shoes', price: 'From $100', image: "https://m.media-amazon.com/images/I/61-OizRpLqL.jpg" }, { name: 'Jerseys', price: 'From $60', image: "https://m.media-amazon.com/images/I/713LeAtX5HL.jpg" }],
    image: 'https://st3.depositphotos.com/1177973/16298/i/450/depositphotos_162980976-stock-photo-bicycle-parts-and-tools-on.jpg'
  },
  {
    title: 'Components',
    href: '/accessories/components',
    items: [{ name: 'Tires', price: 'From $40', image: "https://omobikes.com/cdn/shop/collections/Bicycle_Tyre_and_Tube_collection_page.jpg?v=1756906520" }, { name: 'Wheels', price: 'From $200', image: "https://m.media-amazon.com/images/I/51W3Pl8aKsL._AC_UF894,1000_QL80_.jpg" }, { name: 'Handlebars', price: 'From $80', image: "https://www.shutterstock.com/image-illustration/bike-handle-bars-3d-illustration-600nw-1846414138.jpg" }],
    image: 'https://www.shutterstock.com/image-photo/closeup-mountain-bike-brake-disc-600nw-2642830141.jpg'
  }
];





export default function Header() {


  // State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [count, setCount] = useState<number>(2);


  // Handle scroll effect
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled more than 20px (for style change)
      setIsScrolled(currentScrollY > 20);

      // Determine visibility direction
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        // Scrolling DOWN
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // Scrolling UP
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Get Dropdown Content
  const getDropdownContent = (category: string) => {
    if (category === 'Bikes') return BIKES_CATEGORIES;
    if (category === 'Accessories') return ACCESSORIES_CATEGORIES;
    return [];
  };



  // Set default selected category when dropdown opens
  React.useEffect(() => {
    if (activeDropdown) {
      const content = getDropdownContent(activeDropdown);
      if (content.length > 0) {
        setSelectedSubCategory(content[0]);
      } else {
        setSelectedSubCategory(null);
      }
    }
  }, [activeDropdown]);



  return (
    <>

      <motion.header
        aria-label="Header"
        initial={{ y: 0, backgroundColor: "rgba(0,0,0,0)" }}
        animate={{
          y: isVisible ? 0 : -100,
          backgroundColor: isScrolled ? "#fff" : "rgba(0,0,0,0)",
          backdropFilter: isScrolled ? "blur(12px)" : "blur(0px)",
          boxShadow: isScrolled ? "0 1px 2px 0 rgb(0 0 0 / 0.05)" : "none",
        }}
        transition={{
          y: { duration: 1, ease: "easeInOut" },
          backgroundColor: { duration: 0.5, ease: "easeInOut" },
          backdropFilter: { duration: 0.5, ease: "easeInOut" }
        }}
        className={`fixed top-0 left-0 right-0 z-50`}
      >


        <div className="w-full mx-auto px-4 sm:px-6 lg:px-10">


          <div className="flex items-center justify-between h-16">


            {/* Logo */}
            <div className="shrink-0 z-50 flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src={isScrolled ? '/logo.png' : '/white-logo.png'}
                  alt="Specialized Bikes"
                  width={160}
                  height={40}
                  priority
                  className={`w-auto object-contain ${isScrolled ? `h-14` : `h-14`}`}
                />
              </Link>
            </div>


            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">

              {MENU_ITEMS.map((item) => (

                <div
                  key={item.name}
                  className="relative group h-20 flex items-center"
                  onMouseEnter={() => {
                    if (item.hasDropdown) setActiveDropdown(item.name);
                  }}
                  onMouseLeave={() => {
                    if (item.hasDropdown) setActiveDropdown(null);
                  }}
                >

                  <Link
                    href={item.href}
                    className={`font-semibold hover:text-red-600 transition-colors py-2 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
                  >
                    {item.name}
                  </Link>

                  {/* Dropdown Beam Effect */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div
                      layoutId="navbar-underline"
                      className="absolute top-14 left-0 right-0 h-0.5 bg-red-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </div>

              ))}

            </nav>


            {/* Actions */}
            <div className="hidden lg:flex items-center space-x-3">

              <button className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                <Search className="w-5 h-5" />
              </button>

              <button className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                <User className="w-5 h-5" />
              </button>

              <button className={`relative p-2 rounded-full hover:bg-gray-100 transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>

                <ShoppingCart className="w-5 h-5" />

                {count > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full text-[11px] leading-none"
                  >
                    {count > 99 ? "99+" : count}
                  </Badge>
                )}

              </button>

            </div>


            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 text-gray-700 ${isScrolled ? 'text-gray-900' : 'text-white'}`}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>

          </div>

        </div>




        {/* ================= MEGA MENU ================= */}
        <AnimatePresence>

          {activeDropdown && (

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              onMouseEnter={() => setActiveDropdown(activeDropdown)}
              onMouseLeave={() => setActiveDropdown(null)}
              className="max-w-7xl h-[88vh] mx-auto absolute top-16 left-0 right-0 bg-white border rounded-xl border-gray-100 shadow-xl hidden lg:block overflow-hidden overflow-x-hidden"
            >

              {/* Wrapper */}
              <div className="w-full h-full mx-auto px-8 py-8 overflow-hidden">

                <div className="grid grid-cols-4 gap-8 h-full">


                  {/* ================= LEFT : CATEGORY LIST ================= */}
                  <div className="col-span-1 border-r border-gray-200 pr-6 h-full flex flex-col">


                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 shrink-0">
                      {activeDropdown} Categories
                    </h3>


                    <ul className="space-y-2 overflow-y-auto flex-1 pr-2 thin-scroll">

                      {getDropdownContent(activeDropdown).map((cat) => (

                        <li
                          key={cat.title}
                          onMouseEnter={() => setSelectedSubCategory(cat)}
                          className="cursor-pointer"
                        >

                          <div
                            className={`flex items-center justify-between p-3 rounded-lg transition-all duration-200
                      ${selectedSubCategory?.title === cat.title
                                ? "bg-gray-50 text-red-600 pl-5"
                                : "text-gray-900 hover:bg-gray-50 hover:pl-4"}`}>

                            <span className="text-lg font-medium">
                              {cat.title}
                            </span>

                            {selectedSubCategory?.title === cat.title && (
                              <ChevronRight className="w-4 h-4 text-red-600" />
                            )}

                          </div>

                        </li>

                      ))}

                    </ul>

                  </div>


                  {/* ================= RIGHT : CONTENT ================= */}
                  <div className="col-span-3 h-full overflow-y-auto overflow-x-hidden pr-4 thin-scroll">

                    <AnimatePresence mode="wait">

                      {selectedSubCategory && (

                        <motion.div
                          layout="position"
                          key={selectedSubCategory.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-8 min-h-full"
                        >

                          {/* ===== HERO ===== */}
                          <div className="relative w-full h-[200px] rounded-2xl overflow-hidden shadow-sm">

                            <img
                              src={selectedSubCategory.image}
                              alt={selectedSubCategory.title}
                              loading='lazy'
                              className="absolute inset-0 w-full h-full object-cover"
                            />

                            <div className="absolute inset-0 bg-black/40" />

                            <div className="absolute bottom-6 left-8 text-white">

                              <h2 className="text-3xl font-bold">
                                {selectedSubCategory.title}
                              </h2>

                              <Link
                                href={selectedSubCategory.href}
                                className="text-sm font-medium underline decoration-1 underline-offset-4 hover:text-red-400 transition-colors mt-2 inline-block"
                              >
                                View All {selectedSubCategory.title}
                              </Link>

                            </div>

                          </div>


                          {/* ===== MEGA MENU PRODUCT GRID ===== */}
                          <div className="grid grid-cols-4 gap-5">

                            {selectedSubCategory.items?.map((item: any, idx: number) => (

                              <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: idx * 0.05, duration: 0.5, ease: "easeOut" }}
                                whileHover="hover"
                                className="group relative cursor-pointer"
                              >

                                {/* Container */}
                                <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200">

                                  {/* Subtle hover glow */}
                                  <div className="absolute inset-0 bg-linear-to-br from-black/5 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition duration-500" />

                                  {/* Image */}
                                  <motion.div
                                    variants={{ hover: { scale: 1.08 } }}
                                    transition={{ duration: 1.2, ease: "easeOut" }}
                                    className="relative aspect-4/3 overflow-hidden"
                                  >
                                    {item.image ? (
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        loading='lazy'
                                        className="h-full w-full object-cover"
                                      />
                                    ) : (
                                      <div className="flex h-full w-full items-center justify-center text-gray-400">
                                        No Image
                                      </div>
                                    )}
                                  </motion.div>


                                  {/* Content */}
                                  <div className="p-4">

                                    <h4 className="text-sm font-medium tracking-tight text-gray-900 group-hover:text-black transition">
                                      {item.name}
                                    </h4>

                                    {item.price && (
                                      <p className="mt-1 text-xs text-gray-500">
                                        {item.price}
                                      </p>
                                    )}

                                    {/* Animated underline */}
                                    <div className="mt-3 h-px w-6 bg-gray-300 group-hover:w-28 transition-all duration-500" />

                                  </div>

                                </div>

                              </motion.div>

                            ))}

                          </div>


                        </motion.div>

                      )}

                    </AnimatePresence>

                  </div>

                </div>

              </div>

            </motion.div>

          )}

        </AnimatePresence>



      </motion.header>

      {/* Mobile Menu Drawer (Moved outside header to avoid transform stacking context issues) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-60 lg:hidden"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-70 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <span className="text-xl font-bold">Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-2 bg-white">
                <nav className="space-y-5">
                  {MENU_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="group rounded-2xl bg-white/70 backdrop-blur-md border border-gray-100 shadow-sm hover:shadow-lg transition-all"
                    >
                      {/* ===== Main Category ===== */}
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-5"
                      >
                        <span className="text-[22px] font-semibold tracking-tight text-gray-900">
                          {item.name}
                        </span>
                        <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black transition">
                          <svg
                            className="w-4 h-4 text-gray-600 group-hover:text-white transition"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </Link>

                      {/* ===== Sub Categories ===== */}
                      <AnimatePresence>
                        {item.hasDropdown && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="overflow-hidden border-t border-gray-100"
                          >
                            <div className="px-5 py-4 grid grid-cols-2 gap-3">
                              {getDropdownContent(item.name).map((cat, i) => (
                                <motion.a
                                  key={cat.title}
                                  href={cat.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  whileHover={{ scale: 1.04 }}
                                  whileTap={{ scale: 0.97 }}
                                  className="rounded-xl bg-gray-50 hover:bg-black hover:text-white p-4 text-sm font-medium text-gray-700 transition-all shadow-sm"
                                >
                                  {cat.title}
                                </motion.a>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </nav>
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center justify-around">
                  <button className="flex flex-col items-center gap-1 text-gray-600">
                    <User className="w-6 h-6" />
                    <span className="text-xs">Account</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 text-gray-600">
                    <Search className="w-6 h-6" />
                    <span className="text-xs">Search</span>
                  </button>
                  <button className="flex flex-col items-center gap-1 text-gray-600">
                    <ShoppingBag className="w-6 h-6" />
                    <span className="text-xs">Cart</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>

  );

}
