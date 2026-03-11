import perfume1 from '@/assets/perfume-1.jpg';
import perfume2 from '@/assets/perfume-2.jpg';
import perfume3 from '@/assets/perfume-3.jpg';
import perfume4 from '@/assets/perfume-4.jpg';
import perfume5 from '@/assets/perfume-5.jpg';
import perfume6 from '@/assets/perfume-6.jpg';
import collectionFeatured from '@/assets/collection-featured.jpg';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: 'floral' | 'woody' | 'citrus' | 'oriental' | 'fresh';
  gender: 'men' | 'women' | 'unisex';
  rating: number;
  reviewCount: number;
  description: string;
  isNew?: boolean;
  isLimited?: boolean;
  isBestSeller?: boolean;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  size: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Nuit Éternelle',
    brand: 'Maison Sombre',
    price: 285,
    image: perfume1,
    category: 'oriental',
    gender: 'unisex',
    rating: 4.8,
    reviewCount: 124,
    description: 'A mesmerizing blend of midnight jasmine and smoked oud, Nuit Éternelle captures the essence of an endless evening. Deep, intoxicating, and unforgettable.',
    isBestSeller: true,
    topNotes: ['Bergamot', 'Black Pepper', 'Saffron'],
    heartNotes: ['Jasmine', 'Rose Absolute', 'Iris'],
    baseNotes: ['Oud', 'Amber', 'Musk'],
    size: '100ml',
  },
  {
    id: '2',
    name: 'Lumière Dorée',
    brand: 'Maison Sombre',
    price: 320,
    image: perfume2,
    category: 'floral',
    gender: 'women',
    rating: 4.9,
    reviewCount: 89,
    description: 'Golden light captured in a bottle. Lumière Dorée weaves Bulgarian rose with warm amber, creating a fragrance that glows on the skin like the last rays of sunset.',
    isBestSeller: true,
    topNotes: ['Pink Pepper', 'Pear', 'Mandarin'],
    heartNotes: ['Bulgarian Rose', 'Peony', 'Magnolia'],
    baseNotes: ['Amber', 'Sandalwood', 'Vanilla'],
    size: '75ml',
  },
  {
    id: '3',
    name: 'Brume Argentée',
    brand: 'Maison Sombre',
    price: 245,
    image: perfume3,
    category: 'fresh',
    gender: 'unisex',
    rating: 4.7,
    reviewCount: 156,
    description: 'Like morning mist over a silver lake, this fragrance is crystalline clarity meets soft warmth. A modern classic for those who prefer understated elegance.',
    isNew: true,
    topNotes: ['Aldehydes', 'Grapefruit', 'Mint'],
    heartNotes: ['Lily of the Valley', 'White Tea', 'Violet Leaf'],
    baseNotes: ['White Musk', 'Cedar', 'Ambroxan'],
    size: '100ml',
  },
  {
    id: '4',
    name: 'Velours Mystique',
    brand: 'Maison Sombre',
    price: 395,
    image: perfume4,
    category: 'oriental',
    gender: 'women',
    rating: 4.9,
    reviewCount: 67,
    description: 'An opulent tapestry of rare orchid and precious woods. Velours Mystique is the fragrance equivalent of a velvet curtain falling — dramatic, luxurious, absolute.',
    isLimited: true,
    topNotes: ['Turkish Rose', 'Cinnamon', 'Cardamom'],
    heartNotes: ['Orchid', 'Tuberose', 'Ylang-Ylang'],
    baseNotes: ['Patchouli', 'Benzoin', 'Labdanum'],
    size: '50ml',
  },
  {
    id: '5',
    name: 'Clarté',
    brand: 'Maison Sombre',
    price: 210,
    image: perfume5,
    category: 'citrus',
    gender: 'men',
    rating: 4.6,
    reviewCount: 203,
    description: 'Precision distilled. Clarté is a study in restraint — sharp citrus tempered by warm vetiver, a fragrance as clean as cut glass and just as brilliant.',
    isBestSeller: true,
    topNotes: ['Lemon', 'Bergamot', 'Ginger'],
    heartNotes: ['Geranium', 'Lavender', 'Nutmeg'],
    baseNotes: ['Vetiver', 'Cedar', 'Tonka Bean'],
    size: '100ml',
  },
  {
    id: '6',
    name: 'Héritage',
    brand: 'Maison Sombre',
    price: 450,
    image: perfume6,
    category: 'woody',
    gender: 'men',
    rating: 5.0,
    reviewCount: 42,
    description: 'Crafted from the rarest ingredients across three continents. Héritage is not a fragrance — it is a declaration. Worn by those who write their own legacy.',
    isLimited: true,
    isNew: true,
    topNotes: ['Elemi', 'Juniper', 'Pink Pepper'],
    heartNotes: ['Agarwood', 'Papyrus', 'Leather'],
    baseNotes: ['Mysore Sandalwood', 'Frankincense', 'Castoreum'],
    size: '75ml',
  },
];

export const collections = [
  { id: 'men', name: "Pour Homme", description: 'Refined masculinity' },
  { id: 'women', name: "Pour Femme", description: 'Timeless femininity' },
  { id: 'unisex', name: "Sans Genre", description: 'Beyond boundaries' },
  { id: 'limited', name: "Éditions Rares", description: 'Limited editions' },
];

export const categories = [
  { id: 'floral', name: 'Floral', description: 'Rose, Jasmine, Peony' },
  { id: 'woody', name: 'Woody', description: 'Sandalwood, Cedar, Oud' },
  { id: 'citrus', name: 'Citrus', description: 'Bergamot, Lemon, Mandarin' },
  { id: 'oriental', name: 'Oriental', description: 'Amber, Vanilla, Spice' },
  { id: 'fresh', name: 'Fresh', description: 'Mint, Aldehydes, White Tea' },
];

export const testimonials = [
  {
    id: '1',
    name: 'Isabelle M.',
    text: 'Nuit Éternelle is unlike anything I have ever worn. It evolves on the skin over hours, revealing new facets like a conversation with an old friend.',
    product: 'Nuit Éternelle',
    rating: 5,
  },
  {
    id: '2',
    name: 'Alexander K.',
    text: 'I searched for years for a fragrance that felt truly personal. Héritage ended that search. It feels like it was made for me alone.',
    product: 'Héritage',
    rating: 5,
  },
  {
    id: '3',
    name: 'Sophie L.',
    text: 'Lumière Dorée received more compliments in one evening than any fragrance I have owned. It is radiant without being loud — the definition of elegance.',
    product: 'Lumière Dorée',
    rating: 5,
  },
];

export const collectionImage = collectionFeatured;
