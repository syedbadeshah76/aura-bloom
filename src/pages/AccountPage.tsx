import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Package, Heart, MapPin } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
];

const AccountPage = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'profile';
  const [activeTab, setActiveTab] = useState(initialTab);
  const { items: wishlistItems } = useWishlist();

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="heading-display text-3xl md:text-4xl text-center mb-12"
        >
          My Account
        </motion.h1>

        {/* Tabs */}
        <div className="flex justify-center gap-8 mb-12 border-b border-border pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 text-xs uppercase tracking-wider transition-colors duration-300 pb-2 ${
                activeTab === tab.id
                  ? 'text-primary border-b border-primary -mb-[17px]'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === 'profile' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-md mx-auto space-y-4">
            {['First Name', 'Last Name', 'Email', 'Phone'].map(field => (
              <input
                key={field}
                placeholder={field}
                className="w-full bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            ))}
            <button className="btn-gold w-full mt-4">Save Changes</button>
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <Package size={32} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm">No orders yet</p>
          </motion.div>
        )}

        {activeTab === 'wishlist' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {wishlistItems.length === 0 ? (
              <div className="text-center py-16">
                <Heart size={32} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground text-sm">Your wishlist is empty</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {activeTab === 'addresses' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <MapPin size={32} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground text-sm">No saved addresses</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AccountPage;
