import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl tracking-[0.25em] uppercase font-light text-foreground mb-4">
              Sombre
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Where fragrance becomes memory. Each composition is a chapter written in scent.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="heading-display text-xs mb-6 text-primary">Explore</h4>
            <ul className="space-y-3">
              {['Collections', 'New Arrivals', 'Best Sellers', 'Limited Editions'].map(item => (
                <li key={item}>
                  <Link to="/shop" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="heading-display text-xs mb-6 text-primary">Information</h4>
            <ul className="space-y-3">
              {['Our Story', 'Craftsmanship', 'Sustainability', 'Press'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div>
            <h4 className="heading-display text-xs mb-6 text-primary">Service</h4>
            <ul className="space-y-3">
              {['Contact', 'Shipping', 'Returns', 'FAQ'].map(item => (
                <li key={item}>
                  <Link to="/" className="text-muted-foreground text-sm hover:text-primary transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            © 2026 Maison Sombre. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map(item => (
              <Link key={item} to="/" className="text-muted-foreground text-xs hover:text-primary transition-colors duration-300">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
