import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
      className={`product-card group relative ${featured ? 'col-span-2 row-span-2' : ''}`}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-primary text-primary-foreground text-[10px] uppercase tracking-[0.15em] px-3 py-1">
            New
          </span>
        )}
        {product.isLimited && (
          <span className="bg-secondary text-primary text-[10px] uppercase tracking-[0.15em] px-3 py-1 border border-primary">
            Limited
          </span>
        )}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => toggleItem(product)}
        className="absolute top-4 right-4 z-10 text-foreground/50 hover:text-primary transition-colors duration-300"
      >
        <Heart size={18} fill={wishlisted ? 'hsl(37, 36%, 53%)' : 'none'} stroke={wishlisted ? 'hsl(37, 36%, 53%)' : 'currentColor'} />
      </button>

      {/* Image */}
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className={`relative overflow-hidden bg-secondary ${featured ? 'aspect-square' : 'aspect-[3/4]'}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="p-5">
        <p className="text-muted-foreground text-[10px] uppercase tracking-[0.15em] mb-1">
          {product.brand}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-heading text-lg font-light text-foreground mb-1 hover:text-primary transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="text-foreground text-sm mb-4">€{product.price}</p>

        <button
          onClick={() => addItem(product)}
          className="btn-gold w-full text-[11px] py-2.5"
        >
          Add to Bag
        </button>
      </div>
    </motion.div>
  );
};

export default ProductCard;
