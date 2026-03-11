import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, X, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

const CartPage = () => {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [coupon, setCoupon] = useState('');

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="heading-display text-3xl md:text-4xl text-center mb-12"
        >
          Your Bag
        </motion.h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm mb-6">Your bag is empty</p>
            <Link to="/shop" className="btn-gold">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map(item => (
                <motion.div
                  key={item.product.id}
                  layout
                  className="flex gap-6 border-b border-border pb-6"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-28 h-36 object-cover bg-secondary"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-wider">{item.product.brand}</p>
                        <h3 className="font-heading text-lg font-light">{item.product.name}</h3>
                        <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">{item.product.size}</p>
                      </div>
                      <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground self-start">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center border border-border">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground">
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-3 py-2 text-muted-foreground hover:text-foreground">
                          <Plus size={12} />
                        </button>
                      </div>
                      <p className="text-foreground font-heading text-lg font-light">€{item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
              <Link to="/shop" className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider hover:text-primary transition-colors">
                <ArrowLeft size={14} /> Continue Shopping
              </Link>
            </div>

            {/* Summary */}
            <div className="border border-border p-8 h-fit">
              <h2 className="heading-display text-sm mb-8">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>€{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-primary text-[10px] uppercase tracking-wider">Complimentary</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex mt-6 border border-border">
                <input
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  placeholder="Coupon code"
                  className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button className="px-4 py-2 text-primary text-[10px] uppercase tracking-wider hover:bg-primary/10 transition-colors">
                  Apply
                </button>
              </div>

              <div className="border-t border-border mt-6 pt-6 flex justify-between items-center">
                <span className="heading-display text-sm">Total</span>
                <span className="text-xl font-heading font-light">€{totalPrice}</span>
              </div>

              <Link to="/checkout" className="btn-gold w-full block text-center mt-6">
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
