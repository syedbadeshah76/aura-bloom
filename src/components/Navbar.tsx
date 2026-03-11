import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Collections', path: '/shop' },
  { label: 'New', path: '/shop?filter=new' },
  { label: 'Our Story', path: '/#story' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Left nav */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="nav-link">
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden text-foreground"
            >
              <Menu size={20} />
            </button>

            {/* Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className="font-heading text-2xl tracking-[0.25em] uppercase font-light text-foreground">
                Sombre
              </h1>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-6">
              <button className="text-foreground/70 hover:text-primary transition-colors duration-300">
                <Search size={18} />
              </button>
              <Link to="/account" className="text-foreground/70 hover:text-primary transition-colors duration-300 hidden sm:block">
                <User size={18} />
              </Link>
              <Link to="/account?tab=wishlist" className="text-foreground/70 hover:text-primary transition-colors duration-300 hidden sm:block">
                <Heart size={18} />
              </Link>
              <button
                onClick={() => setIsOpen(true)}
                className="text-foreground/70 hover:text-primary transition-colors duration-300 relative"
              >
                <ShoppingBag size={18} />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-primary text-primary-foreground text-[10px] flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-background"
          >
            <div className="flex justify-between items-center px-6 h-20">
              <span className="font-heading text-2xl tracking-[0.25em] uppercase font-light">Sombre</span>
              <button onClick={() => setMobileOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex flex-col items-center gap-8 pt-20">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="heading-display text-2xl">
                  {link.label}
                </Link>
              ))}
              <Link to="/account" className="heading-display text-2xl">Account</Link>
              <Link to="/account?tab=wishlist" className="heading-display text-2xl">Wishlist</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
