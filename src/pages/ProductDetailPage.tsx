import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Heart, ArrowLeft } from 'lucide-react';
import { useState, useRef } from 'react';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const notesRef = useRef<HTMLDivElement>(null);

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <p className="text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
        <Link to="/shop" className="flex items-center gap-2 text-muted-foreground text-xs uppercase tracking-wider hover:text-primary transition-colors">
          <ArrowLeft size={14} /> Back to Collections
        </Link>
      </div>

      {/* Product */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-secondary aspect-square overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mb-2">{product.brand}</p>
            <h1 className="font-heading text-4xl md:text-5xl font-light text-foreground mb-2">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-primary' : 'text-muted'}`}>★</span>
                ))}
              </div>
              <span className="text-muted-foreground text-xs">{product.reviewCount} reviews</span>
            </div>

            <p className="text-foreground text-2xl font-heading font-light mb-6">€{product.price}</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">{product.description}</p>
            <p className="text-muted-foreground text-[10px] uppercase tracking-wider mb-8">Size: {product.size}</p>

            {/* Quantity */}
            <div className="flex items-center gap-6 mb-8">
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Quantity</span>
              <div className="flex items-center border border-border">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="w-10 text-center text-sm">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => addItem(product, quantity)}
                className="btn-gold flex-1"
              >
                Add to Bag
              </button>
              <button
                onClick={() => toggleItem(product)}
                className="btn-outline-gold px-4"
              >
                <Heart size={16} fill={wishlisted ? 'hsl(37, 36%, 53%)' : 'none'} />
              </button>
            </div>
            <Link to="/checkout" className="btn-outline-gold w-full text-center block">
              Buy Now
            </Link>
          </motion.div>
        </div>

        {/* Fragrance Notes - Signature Moment */}
        <div ref={notesRef} className="mt-32">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1 }}
            className="bg-secondary border border-border p-12 md:p-20"
          >
            <div className="text-center mb-16">
              <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">The Composition</p>
              <h2 className="heading-display text-3xl">Fragrance Notes</h2>
              <div className="section-divider mt-6" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { label: 'Top Notes', notes: product.topNotes, delay: 0 },
                { label: 'Heart Notes', notes: product.heartNotes, delay: 0.25 },
                { label: 'Base Notes', notes: product.baseNotes, delay: 0.5 },
              ].map(group => (
                <motion.div
                  key={group.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: group.delay }}
                  className="text-center relative"
                >
                  {/* Abstract blur shape */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 0.15, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: group.delay + 0.3 }}
                    className="absolute inset-0 rounded-full bg-primary blur-3xl pointer-events-none"
                  />
                  <h3 className="heading-display text-xs mb-6 text-primary relative z-10">{group.label}</h3>
                  <div className="space-y-2 relative z-10">
                    {group.notes.map(note => (
                      <p key={note} className="text-foreground/80 text-sm font-heading font-light">{note}</p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="text-center mb-12">
              <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">You May Also Like</p>
              <h2 className="heading-display text-2xl">Related Fragrances</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
