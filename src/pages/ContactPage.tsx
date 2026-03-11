import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const contactInfo = [
  { icon: MapPin, label: 'Visit Us', value: '12 Rue du Faubourg Saint-Honoré, 75008 Paris, France' },
  { icon: Phone, label: 'Call Us', value: '+33 1 42 68 00 00' },
  { icon: Mail, label: 'Email Us', value: 'contact@maisonsombre.com' },
  { icon: Clock, label: 'Hours', value: 'Mon – Sat: 10am – 7pm' },
];

const WHATSAPP_NUMBER = '33142680000'; // placeholder

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success('Message sent! We\'ll respond within 24 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello, I have a question about Maison Sombre products.')}`, '_blank');
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
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground max-w-xl mx-auto"
          >
            We'd love to hear from you. Reach out for inquiries, appointments, or bespoke fragrance consultations.
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="font-heading text-2xl tracking-[0.15em] uppercase font-light text-foreground mb-8">
              Send a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Name *</label>
                  <Input
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    maxLength={100}
                    className="bg-secondary border-border"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Email *</label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="your@email.com"
                    maxLength={255}
                    className="bg-secondary border-border"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Subject</label>
                <Input
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  placeholder="How can we help?"
                  maxLength={200}
                  className="bg-secondary border-border"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Message *</label>
                <Textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Tell us more..."
                  rows={5}
                  maxLength={1000}
                  className="bg-secondary border-border"
                />
              </div>
              <Button type="submit" disabled={sending} className="w-full sm:w-auto px-10">
                {sending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Info + WhatsApp */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-10"
          >
            <div>
              <h2 className="font-heading text-2xl tracking-[0.15em] uppercase font-light text-foreground mb-8">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map(item => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={openWhatsApp}
              className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3 rounded-md transition-colors duration-300 w-full sm:w-auto justify-center"
            >
              <MessageCircle size={20} />
              <span className="font-medium">Chat on WhatsApp</span>
            </button>

            {/* Map */}
            <div>
              <h3 className="font-heading text-lg tracking-[0.15em] uppercase font-light text-foreground mb-4">
                Our Boutique
              </h3>
              <div className="rounded-md overflow-hidden border border-border aspect-video">
                <iframe
                  title="Maison Sombre Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.2!2d2.3167!3d48.8698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc4e834969d%3A0x49f14b09af4c4d1!2sRue%20du%20Faubourg%20Saint-Honor%C3%A9%2C%2075008%20Paris!5e0!3m2!1sen!2sfr!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
