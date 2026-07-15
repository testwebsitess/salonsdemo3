export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'color' | 'skin' | 'makeup' | 'nails' | 'bridal';
  priceRange: string;
  duration: string;
  description: string;
  benefits: string[];
}

export interface BridalPackage {
  id: string;
  name: string;
  price: string;
  tagline: string;
  includes: string[];
  description: string;
  popular?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  bio: string;
  imageUrl: string;
  instagram: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  service: string;
  text: string;
  rating: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export const salonImages = {
  panorama: '/src/assets/images/salon_interior_panorama_1784105959723.jpg',
  bridal: '/src/assets/images/pakistani_bridal_makeup_1784105981645.jpg',
  hairStyling: '/src/assets/images/hair_styling_luxury_1784106001851.jpg',
  // High quality premium placeholders for other visuals
  facialSkin: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80&w=600',
  nailsLuxury: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&q=80&w=600',
  team1: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  team2: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
  team3: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
};

export const servicesData: Service[] = [
  // Hair Services
  {
    id: 'hair-1',
    name: 'Couture Haircut & Blow-Dry',
    category: 'hair',
    priceRange: 'PKR 3,500 – 6,000',
    duration: '60 mins',
    description: 'Bespoke hair design starting with a luxurious wash and custom-crafted conditioning treatment, completed with an exquisite signature blow-out.',
    benefits: ['Face-framing precision cut', 'Keratin-infusing shampoo', 'Volume and shine locked in'],
  },
  {
    id: 'hair-2',
    name: 'Advanced Keratin Treatment',
    category: 'hair',
    priceRange: 'PKR 18,000 – 30,000',
    duration: '180 mins',
    description: 'Transformative smoothing treatment to eliminate frizz, seal hair cuticles, and deliver unparalleled glass-like shine for up to 5 months.',
    benefits: ['Frizz-free structure', 'Saves styling time', 'Deep amino-acid reconstruction'],
  },
  // Color Services
  {
    id: 'color-1',
    name: 'Parisian Balayage / Ombré',
    category: 'color',
    priceRange: 'PKR 15,000 – 25,000',
    duration: '150 mins',
    description: 'Hand-painted, natural-looking highlights designed to catch the Pakistani sun beautifully. Root-shaded to grow out seamlessly.',
    benefits: ['Custom color placement', 'Multi-dimensional depth', 'Low-maintenance re-growth'],
  },
  {
    id: 'color-2',
    name: 'Full Luxury Signature Tint',
    category: 'color',
    priceRange: 'PKR 8,500 – 14,000',
    duration: '120 mins',
    description: 'Rich, high-gloss global hair coloring using premium, ammonia-free European formulas that protect hair integrity while giving 100% grey coverage.',
    benefits: ['Ammonia-free gentle formula', 'Vibrant deep pigment', 'Gloss-enhancing finish'],
  },
  // Skin & Facials
  {
    id: 'skin-1',
    name: '24K Gold Luxury Illuminating Facial',
    category: 'skin',
    priceRange: 'PKR 12,000 – 18,000',
    duration: '75 mins',
    description: 'Ultimate skin luxury. Infuses pure 24-karat gold dust, advanced hyaluronic serums, and professional lymphatic drainage massage for an instant royal glow.',
    benefits: ['Boosts cellular regeneration', 'Intense firming & lifting', 'Unmatched bridal radiance'],
  },
  {
    id: 'skin-2',
    name: 'Hydra-Infusion Deep Cleansing',
    category: 'skin',
    priceRange: 'PKR 7,500 – 12,000',
    duration: '60 mins',
    description: 'Multi-stage skin resurfacing system utilizing vortex technology to extract impurities, deeply exfoliate, and bathe skin in moisture and skin-specific peptides.',
    benefits: ['Pore congestion cleared', 'Plump, hyper-hydrated skin', 'Smooths uneven skin texture'],
  },
  // Makeup Services
  {
    id: 'makeup-1',
    name: 'Signature Glam / Party Makeup',
    category: 'makeup',
    priceRange: 'PKR 12,000 – 20,000',
    duration: '90 mins',
    description: 'Flawless HD airbrush or luxury cream-contour makeup customized for weddings, high-profile dinners, or prestigious parties in Lahore & Karachi.',
    benefits: ['16-hour sweat-proof wear', 'Premium faux mink lashes included', 'HD camera and flash-ready finishes'],
  },
  // Nails
  {
    id: 'nails-1',
    name: 'Champagne Spa Manicure & Pedicure',
    category: 'nails',
    priceRange: 'PKR 5,500 – 8,500',
    duration: '75 mins',
    description: 'Rejuvenating hand and foot therapy including an organic sugar scrub, intensive paraffin wax treatment, dynamic hot-stone massage, and gel polish finish.',
    benefits: ['Softens calluses & dry cuticles', 'Stress-relieving hot-stone massage', 'Chip-free long-lasting gel wear'],
  },
  {
    id: 'nails-2',
    name: 'Sculpted Gel / Acrylic Extensions',
    category: 'nails',
    priceRange: 'PKR 7,000 – 11,000',
    duration: '90 mins',
    description: 'Bespoke nail architecture. From classic French coffin extensions to custom Pakistani wedding-theme nail art embedded with micro-gems.',
    benefits: ['Custom length & curvature', 'Nail reinforcement', 'High-shine durable top coat'],
  },
];

export const bridalPackages: BridalPackage[] = [
  {
    id: 'bridal-1',
    name: 'The Royal Heritage Bride',
    price: 'PKR 65,000',
    tagline: 'The ultimate timeless luxury package for the traditional Baraat or Walima look',
    description: 'Crafted over two customized days, this package ensures the bride feels like royalty. Includes professional high-definition long-wear makeup, hair artistry with jewelry positioning, and pre-wedding skin conditioning.',
    includes: [
      'High-Definition Luxury Airbrush Bridal Makeup',
      'Intricate Bridal Hair Artistry & Duppata/Jewelry Setting',
      'Exclusive 24K Gold Illuminating Facial (2 days prior)',
      'Champagne Spa Manicure & Pedicure with Gel Extensions',
      'Scented body-glow oil finish & hair fragrance mist',
      'Private luxury bridal lounge access with complimentary refreshments',
    ],
    popular: true,
  },
  {
    id: 'bridal-2',
    name: 'The Modern Minimalist Bride',
    price: 'PKR 45,000',
    tagline: 'Ethereal, glowing, and modern dewiness for Nikkah, Mehndi, or intimate receptions',
    description: 'Perfect for contemporary brides who prefer a radiant, glass-skin look that lets their natural beauty shine. Features soft, sophisticated contouring and delicate styling.',
    includes: [
      'Luxury Soft-Focus dewy Bridal Makeup',
      'Modern Editorial Hair Artistry (textured updos or sleek braids)',
      'Hydra-Infusion Glow Facial (1 day prior)',
      'Express Mani-Pedi with premium nail styling',
      'Duppata styling & jewelry setting',
    ],
  },
  {
    id: 'bridal-3',
    name: 'Bridal Party Luxe (Group of 3+)',
    price: 'PKR 14,000 / person',
    tagline: 'Curated premium services for bridesmaids, mother of the bride, and sisters',
    description: 'Keep the entire bridal court looking cohesive, stunning, and camera-ready. Includes customized party makeup and hairstyles.',
    includes: [
      'Flawless HD Party Makeup matching dress tones',
      'Signature hair curling, blowouts, or elegant updos',
      'Lashes and setting sprays optimized for long-wear',
      'Nail polish application',
    ],
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Zaria Khan',
    role: 'Founder & Chief Bridal Stylist',
    specialty: 'Royal Pakistani Bridal Makeups',
    bio: 'With over 12 years of experience trained in London and Paris, Zaria is famous in Lahore and Karachi for crafting standard-setting bridal portraits that merge heritage elegance with modern dewy skins.',
    imageUrl: salonImages.team1,
    instagram: '@zaria_salon_official',
  },
  {
    id: 'team-2',
    name: 'Anum Jahangir',
    role: 'Master Hair Artisan & Colorist',
    specialty: 'Balayages, Highlights & Keratin Rebounds',
    bio: 'Certificated by L\'Oréal Académie, Anum has pioneered multi-dimensional Parisian balayage techniques customized for dark Asian hair types, ensuring zero damage and rich gloss.',
    imageUrl: salonImages.team2,
    instagram: '@anum_hair_artistry',
  },
  {
    id: 'team-3',
    name: 'Dr. Sarah Malik',
    role: 'Medical Aesthetician & Skin Consultant',
    specialty: 'Anti-aging Facials & Advanced Hydra-Therapy',
    bio: 'Combining dermatology expertise with cosmetic beauty, Dr. Sarah customizes skin rejuvenation cocktails to ensure our clients and brides obtain natural, long-lasting glass-like skin structures.',
    imageUrl: salonImages.team3,
    instagram: '@dr_sarah_skin',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Amina Shah',
    location: 'Gulberg, Lahore',
    service: 'Royal Heritage Bridal Package',
    text: 'Zaria and her team made my bridal dream a reality. The makeup stayed absolutely flawless for 14 hours straight, through tears and heat. The private bridal lounge made me feel so calm and pampered.',
    rating: 5,
  },
  {
    id: 'test-2',
    name: 'Zainab Yusuf',
    location: 'DHA, Karachi',
    service: 'Parisian Balayage & Blow-Dry',
    text: 'Best balayage in Pakistan! Anum understands exactly how to lift dark hair without turning it brassy. The texture of my hair feels incredibly soft and the color matches the sun perfectly.',
    rating: 5,
  },
  {
    id: 'test-3',
    name: 'Mariam Lodhi',
    location: 'F-7, Islamabad',
    service: '24K Gold Illuminating Facial',
    text: 'A truly relaxing experience. The Hydra facial and 24K gold facial left my face looking so plump and glowing. Dr. Sarah explained everything clearly. I highly recommend this premium space.',
    rating: 5,
  },
];

export const timelineEvents: TimelineEvent[] = [
  {
    year: '2016',
    title: 'The Inception',
    description: 'Zaria Khan launched a premium boutique styling studio in DHA, Lahore, with a mission to bring high-end European hair and skin concepts to Pakistani brides.',
  },
  {
    year: '2019',
    title: 'Flagship Expansion',
    description: 'Moved into a sprawling, architect-designed space featuring high-ceilings, Italian marble, and private luxury bridal suites to elevate client comfort.',
  },
  {
    year: '2022',
    title: 'National Acclaim & Virtual Tour',
    description: 'Won the "Luxury Salon of the Year" award. Launched advanced medical skin treatments and digitized booking systems with real-time support.',
  },
  {
    year: '2026',
    title: 'New Horizons',
    description: 'Introducing virtual consultation hubs and a second premium branch in DHA Phase 6, Karachi, to satisfy our growing coastal client base.',
  },
];

export const openingHours = {
  days: 'Tuesday – Sunday',
  hours: '11:00 AM – 8:00 PM',
  closed: 'Monday',
  address: 'Block K, Gulberg III, Lahore, Pakistan / Phase 6, DHA, Karachi, Pakistan',
  phone: '+92 (42) 3578-9011',
  whatsapp: '+92 300 1234567',
  email: 'appointments@zariasalon.pk',
};
