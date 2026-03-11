import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const CheckoutPage = () => {
  const { items, totalPrice, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center mx-auto mb-6">
            <Check className="text-primary" size={28} />
          </div>
          <h1 className="heading-display text-3xl mb-4">Order Confirmed</h1>
          <p className="text-muted-foreground text-sm mb-8">
            Thank you for your purchase. Your order has been placed and you will receive a confirmation email shortly.
          </p>
          <Link to="/shop" className="btn-gold">Continue Shopping</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-5xl mx-auto px-6 lg:px-12 py-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="heading-display text-3xl md:text-4xl text-center mb-12"
        >
          Checkout
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="space-y-8">
            {/* Shipping */}
            <div>
              <h2 className="heading-display text-xs mb-6 text-primary">Shipping Details</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'First Name', span: 1 },
                  { label: 'Last Name', span: 1 },
                  { label: 'Email', span: 2 },
                  { label: 'Address', span: 2 },
                  { label: 'City', span: 1 },
                  { label: 'Postal Code', span: 1 },
                  { label: 'Country', span: 2 },
                ].map(field => (
                  <input
                    key={field.label}
                    placeholder={field.label}
                    className={`bg-transparent border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                      field.span === 2 ? 'col-span-2' : ''
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="heading-display text-xs mb-6 text-primary">Payment Method</h2>
              <div className="space-y-3">
                {['Credit Card', 'PayPal', 'Apple Pay'].map(method => (
                  <label
                    key={method}
                    className="flex items-center gap-3 border border-border px-4 py-3 cursor-pointer hover:border-primary transition-colors"
                  >
                    <input type="radio" name="payment" className="accent-[hsl(37,36%,53%)]" defaultChecked={method === 'Credit Card'} />
                    <span className="text-sm">{method}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="border border-border p-8 h-fit">
            <h2 className="heading-display text-xs mb-6 text-primary">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex gap-4">
                  <img src={item.product.image} alt={item.product.name} className="w-14 h-18 object-cover bg-secondary" />
                  <div className="flex-1">
                    <p className="text-sm font-heading font-light">{item.product.name}</p>
                    <p className="text-muted-foreground text-[10px]">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm">€{item.product.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>€{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="text-primary text-[10px] uppercase tracking-wider">Complimentary</span>
              </div>
            </div>
            <div className="border-t border-border mt-4 pt-4 flex justify-between items-center">
              <span className="heading-display text-sm">Total</span>
              <span className="text-xl font-heading font-light">€{totalPrice}</span>
            </div>
            <button
              onClick={() => { clearCart(); setSubmitted(true); }}
              className="btn-gold w-full mt-6"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
