'use client';



import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, User, ShoppingBag, Menu, X, ChevronRight, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '../ui/badge';
import { usePathname } from "next/navigation";
import { MENU_ITEMS, BIKES_CATEGORIES, ACCESSORIES_CATEGORIES } from '../../data/headerData';
import MegaMenu from './MegaMenu';




export default function Header() {


  const pathname = usePathname();
  const isHome = pathname === "/";


  // State
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  // Scroll State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);


  // Bag Count (Mock)
  const [count, setCount] = useState<number>(2);



  // Handle Scroll Logic
  useEffect(() => {

    const handleScroll = () => {

      const currentScrollY = window.scrollY;

      // Update Scrolled State (Threshold 20px)
      setIsScrolled(currentScrollY > 20);

      // Determine visibility (Hide on scroll down, show on scroll up)
      if (currentScrollY < 10) {

        setIsVisible(true);

      } else if (currentScrollY > lastScrollY.current && currentScrollY > 60) {

        setIsVisible(false);

      } else if (currentScrollY < lastScrollY.current) {

        setIsVisible(true);

      }

      lastScrollY.current = currentScrollY;

    };


    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);

  }, []);




  // Header Appearance
  const isTransparent = isHome && !isScrolled;
  const headerBg = isTransparent ? "rgba(0,0,0,0)" : "#ffffff";
  const textColor = isTransparent ? "text-white" : "text-gray-900";
  const iconColor = isTransparent ? "text-white" : "text-gray-900";
  const hoverBg = isTransparent ? "hover:bg-white/10" : "hover:bg-gray-100";
  const logoSrc = isTransparent ? '/white-logo.png' : '/logo.png';



  // Get Dropdown Content
  const getDropdownContent = (category: string) => {
    if (category === 'Bikes') return BIKES_CATEGORIES;
    if (category === 'Accessories') return ACCESSORIES_CATEGORIES;
    return [];
  };



  return (


    <>

      <motion.header
        aria-label="Header"
        initial={{ y: 0, backgroundColor: "rgba(0,0,0,0)" }}
        animate={{
          y: isVisible ? 0 : -100,
          backgroundColor: headerBg,
          backdropFilter: isTransparent ? "blur(0px)" : "blur(12px)",
          boxShadow: isTransparent ? "none" : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        transition={{
          y: { duration: 0.5, ease: "easeInOut" },
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
                  src={logoSrc}
                  alt="Cycle Logo"
                  width={160}
                  height={40}
                  priority
                  className="w-auto h-14 object-contain"
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
                    className={`font-semibold transition-colors py-2 ${textColor} hover:text-red-600`}
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

              <button className={`p-2 rounded-full transition-colors ${textColor} ${hoverBg}`}>
                <Search className="w-5 h-5" />
              </button>

              <button className={`p-2 rounded-full transition-colors ${textColor} ${hoverBg}`}>
                <User className="w-5 h-5" />
              </button>

              <button className={`relative p-2 rounded-full transition-colors ${textColor} ${hoverBg}`}>

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
                className={`p-2 ${textColor}`}
              >
                <Menu className="w-6 h-6" />
              </button>

            </div>


          </div>


        </div>


        {/* ================= MEGA MENU ================= */}
        <MegaMenu activeDropdown={activeDropdown} setActiveDropdown={setActiveDropdown} />


      </motion.header>




      {/* Mobile Menu Drawer */}
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
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-between p-5"
                      >
                        <span className="text-[22px] font-semibold tracking-tight text-gray-900">
                          {item.name}
                        </span>
                        {item.hasDropdown && (
                          <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-black transition">
                            <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-white transition" />
                          </span>
                        )}
                      </Link>

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
                              {getDropdownContent(item.name).map((cat) => (
                                <Link
                                  key={cat.title}
                                  href={cat.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block rounded-xl bg-gray-50 hover:bg-black hover:text-white p-4 text-sm font-medium text-gray-700 transition-all shadow-sm"
                                >
                                  {cat.title}
                                </Link>
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
