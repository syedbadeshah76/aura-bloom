import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    title: 'Orders & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 3–5 business days within France and 5–10 business days for international orders. Express shipping is available at checkout for next-day delivery within select cities.' },
      { q: 'Do you offer free shipping?', a: 'Yes, we offer complimentary shipping on all orders over €150. Orders below this threshold incur a flat €9.90 shipping fee.' },
      { q: 'Can I track my order?', a: "Absolutely. Once your order is dispatched, you'll receive a tracking number via email. You can also view your order status in your Account dashboard." },
      { q: 'Do you ship internationally?', a: 'Yes, we ship to over 60 countries worldwide. Customs duties and import taxes may apply and are the responsibility of the recipient.' },
    ],
  },
  {
    title: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unopened, sealed products in their original packaging. Personalized or engraved items cannot be returned.' },
      { q: 'How do I initiate a return?', a: "Contact our support team via the Contact page or WhatsApp. We'll provide a prepaid return label and process your refund within 5-7 business days of receiving the item." },
      { q: 'Can I exchange a fragrance?', a: "Yes, exchanges are available for unopened products. If you'd like to explore a different scent, we recommend visiting our boutique for a complimentary consultation." },
    ],
  },
  {
    title: 'Products & Fragrances',
    items: [
      { q: 'Are your fragrances cruelty-free?', a: 'Yes, all Maison Sombre fragrances are cruelty-free and never tested on animals. We are committed to ethical sourcing and sustainable production.' },
      { q: 'How long do your perfumes last?', a: 'Our Eau de Parfum compositions typically last 8–12 hours on skin. Longevity varies based on skin type, climate, and application method.' },
      { q: 'What's the difference between EDT and EDP?', a: 'Eau de Toilette (EDT) contains 5–15% fragrance concentration for a lighter experience. Eau de Parfum (EDP) contains 15–20% for richer, longer-lasting projection.' },
      { q: 'Do you offer fragrance samples?', a: 'Yes, we offer a curated discovery set of 5 samples for €25, which is credited toward your first full-size purchase.' },
    ],
  },
  {
    title: 'Account & Payments',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are encrypted and secure.' },
      { q: 'Do I need an account to place an order?', a: 'No, you can check out as a guest. However, creating an account allows you to track orders, save addresses, and manage your wishlist.' },
      { q: 'Is my personal information secure?', a: 'Yes, we use industry-standard encryption and never share your personal data with third parties. See our Privacy Policy for details.' },
    ],
  },
];

const WHATSAPP_NUMBER = '33142680000';

const FAQPage = () => {
  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello, I have a question about Maison Sombre.')}`, '_blank');
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="bg-secondary py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl tracking-[0.15em] uppercase font-light text-foreground mb-4"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            Everything you need to know about our fragrances, orders, and services.
          </motion.p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        {faqCategories.map((category, catIdx) => (
          <motion.div
            key={category.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * catIdx }}
            className="mb-12"
          >
            <h2 className="font-heading text-xl tracking-[0.15em] uppercase font-light text-primary mb-4">
              {category.title}
            </h2>
            <Accordion type="single" collapsible className="border-t border-border">
              {category.items.map((item, idx) => (
                <AccordionItem key={idx} value={`${catIdx}-${idx}`}>
                  <AccordionTrigger className="text-left text-foreground hover:text-primary">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ))}

        {/* Still have questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center bg-secondary rounded-md p-10 mt-8"
        >
          <h3 className="font-heading text-xl tracking-[0.15em] uppercase font-light text-foreground mb-3">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            Our team is here to help. Reach out via our contact page or chat with us directly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
            <button
              onClick={openWhatsApp}
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-md text-sm font-medium transition-colors"
            >
              <MessageCircle size={18} />
              WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default FAQPage;
