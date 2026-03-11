import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Flower2, TreePine, Citrus, Sparkles, Droplets } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { products, testimonials, collectionImage } from '@/data/products';
import heroImage from '@/assets/hero-perfume.jpg';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8 },
};

const Index = () => {
  const bestSellers = products.filter(p => p.isBestSeller);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxury perfume" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-primary text-[11px] uppercase tracking-[0.3em] mb-6"
          >
            Maison Sombre
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="heading-display text-5xl md:text-7xl mb-6 leading-tight"
          >
            Discover Your
            <br />
            <span className="heading-editorial text-primary">Signature Scent</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-muted-foreground text-sm mb-10 max-w-md mx-auto leading-relaxed"
          >
            Each fragrance is a secret waiting to be discovered. A chapter of your story, written in scent.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/shop" className="btn-gold">
              Shop Now
            </Link>
            <Link to="/shop" className="btn-outline-gold">
              Explore Collections
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-[1px] h-12 bg-primary/40 relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 48, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-full h-4 bg-primary absolute top-0"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">Curated For You</p>
          <h2 className="heading-display text-3xl md:text-4xl">Featured Collections</h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { title: 'Pour Homme', subtitle: 'Refined masculinity', gender: 'men' },
            { title: 'Pour Femme', subtitle: 'Timeless femininity', gender: 'women' },
            { title: 'Sans Genre', subtitle: 'Beyond boundaries', gender: 'unisex' },
            { title: 'Éditions Rares', subtitle: 'Limited editions', gender: 'limited' },
          ].map((col, i) => (
            <motion.div
              key={col.gender}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <Link
                to={`/shop?gender=${col.gender}`}
                className="group block relative overflow-hidden aspect-[3/4] bg-secondary"
              >
                <img
                  src={collectionImage}
                  alt={col.title}
                  className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  <h3 className="heading-display text-sm md:text-base text-center">{col.title}</h3>
                  <p className="text-muted-foreground text-[10px] mt-1 uppercase tracking-wider">{col.subtitle}</p>
                  <div className="mt-4 w-6 h-[1px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-24 px-6 lg:px-12 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">Most Coveted</p>
            <h2 className="heading-display text-3xl md:text-4xl">Best Sellers</h2>
            <div className="section-divider mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <Link to="/shop" className="btn-outline-gold inline-flex items-center gap-2">
              View All <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Carousel */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div {...fadeUp} className="text-center mb-16">
          <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">Just Arrived</p>
          <h2 className="heading-display text-3xl md:text-4xl">New Arrivals</h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {newArrivals.concat(products.slice(0, 2)).map((product, i) => (
            <div key={`${product.id}-${i}`} className="min-w-[280px] md:min-w-[320px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Fragrance Categories */}
      <section className="py-24 px-6 lg:px-12 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">By Character</p>
            <h2 className="heading-display text-3xl md:text-4xl">Fragrance Families</h2>
            <div className="section-divider mt-6" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Floral', icon: Flower2, desc: 'Rose, Jasmine, Peony' },
              { name: 'Woody', icon: TreePine, desc: 'Sandalwood, Cedar, Oud' },
              { name: 'Citrus', icon: Citrus, desc: 'Bergamot, Lemon, Mandarin' },
              { name: 'Oriental', icon: Sparkles, desc: 'Amber, Vanilla, Spice' },
              { name: 'Fresh', icon: Droplets, desc: 'Mint, Aldehydes, White Tea' },
            ].map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={`/shop?category=${cat.name.toLowerCase()}`}
                  className="group block text-center p-8 border border-border hover:border-primary transition-all duration-500"
                >
                  <cat.icon size={28} className="mx-auto text-muted-foreground group-hover:text-primary transition-colors duration-300 mb-4" />
                  <h3 className="heading-display text-sm mb-1">{cat.name}</h3>
                  <p className="text-muted-foreground text-[10px]">{cat.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section id="story" className="py-32 px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div {...fadeUp}>
            <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">Our Philosophy</p>
            <h2 className="heading-display text-3xl md:text-4xl mb-8">The Art of Scent</h2>
            <div className="section-divider mb-10" />
            <p className="text-muted-foreground text-base leading-[1.9] mb-8">
              At Maison Sombre, we believe fragrance is the most intimate form of self-expression.
              Each composition begins in silence — in our atelier where master perfumers spend years
              listening to raw materials before they speak through scent.
            </p>
            <p className="text-muted-foreground text-base leading-[1.9] mb-12">
              We source the rarest ingredients from across the globe. Turkish rose cultivated at dawn.
              Mysore sandalwood aged for decades. Oud distilled from trees that have witnessed centuries.
              These are not products — they are living stories, distilled into glass.
            </p>
            <Link to="/shop" className="btn-outline-gold inline-flex items-center gap-2">
              Explore Our World <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 lg:px-12 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="text-center mb-16">
            <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">Voices</p>
            <h2 className="heading-display text-3xl md:text-4xl">What They Say</h2>
            <div className="section-divider mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="border border-border p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <span key={j} className="text-primary text-sm">★</span>
                  ))}
                </div>
                <p className="text-foreground/80 text-sm leading-relaxed italic mb-6 font-heading">
                  "{t.text}"
                </p>
                <div>
                  <p className="text-foreground text-sm">{t.name}</p>
                  <p className="text-muted-foreground text-[10px] uppercase tracking-wider mt-1">
                    on {t.product}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 px-6 lg:px-12">
        <motion.div {...fadeUp} className="max-w-xl mx-auto text-center">
          <p className="text-primary text-[10px] uppercase tracking-[0.3em] mb-3">Stay Close</p>
          <h2 className="heading-display text-3xl md:text-4xl mb-4">Join Our World</h2>
          <p className="text-muted-foreground text-sm mb-8">
            Receive 10% off your first order, early access to new releases, and stories from our atelier.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 bg-transparent border border-border px-5 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
            />
            <button className="btn-gold whitespace-nowrap">Subscribe</button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Index;
