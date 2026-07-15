import { useState, useEffect, useRef, FormEvent } from 'react';
import {
  Sparkles,
  Calendar,
  MapPin,
  Clock,
  Phone,
  Mail,
  Instagram,
  ChevronDown,
  ChevronUp,
  Check,
  Star,
  Award,
  ShieldCheck,
  Scissors,
  Heart,
  Compass,
  ArrowRight,
  UserCheck,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Sub-components
import Navbar from './components/Navbar';
import ThreeHeroCanvas from './components/ThreeHeroCanvas';
import ThreeVirtualTour from './components/ThreeVirtualTour';
import TiltCard from './components/TiltCard';

// Data
import {
  servicesData,
  bridalPackages,
  teamMembers,
  testimonials,
  timelineEvents,
  openingHours,
  salonImages,
  Service,
} from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [activeServiceCategory, setActiveServiceCategory] = useState<'all' | 'hair' | 'color' | 'skin' | 'makeup' | 'nails'>('all');
  
  // Testimonials rotation
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Booking Form State
  const [bookingName, setBookingName] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingService, setBookingService] = useState('');
  const [bookingStylist, setBookingStylist] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  // Section Refs for smooth scrolling and scroll tracking
  const sectionsRef = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    services: useRef<HTMLElement>(null),
    packages: useRef<HTMLElement>(null),
    tour: useRef<HTMLElement>(null),
    team: useRef<HTMLElement>(null),
    booking: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  // Smooth scroll to target section
  const scrollToSection = (id: string) => {
    const target = sectionsRef[id as keyof typeof sectionsRef]?.current;
    if (target) {
      const offset = 80; // Navbar offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  // Scroll Spy to detect current visible section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // offset for triggers

      for (const [sectionId, ref] of Object.entries(sectionsRef)) {
        const element = ref.current;
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filtered Services List
  const filteredServices = activeServiceCategory === 'all'
    ? servicesData
    : servicesData.filter((s) => s.category === activeServiceCategory);

  // Handle Booking Form Submission
  const handleBookingSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingPhone || !bookingService || !bookingDate) return;

    // Trigger success animations
    setIsBooked(true);

    // Build pre-filled WhatsApp link for direct connection to Pakistan branch
    const formattedDate = new Date(bookingDate).toLocaleDateString('en-PK', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const text = `*New Appointment Request - Zaria Premium Salon*%0A%0A` +
      `• *Name:* ${bookingName}%0A` +
      `• *Phone:* ${bookingPhone}%0A` +
      `• *Service:* ${bookingService}%0A` +
      `• *Stylist:* ${bookingStylist || 'Any Master Stylist'}%0A` +
      `• *Preferred Date:* ${formattedDate}%0A` +
      `• *Preferred Time:* ${bookingTime || 'Flexible (11 AM - 8 PM)'}%0A%0A` +
      `Please confirm availability for this slot. Thank you!`;

    // Opens custom pre-filled message directly in WhatsApp with Pak country code +92
    const whatsappUrl = `https://wa.me/923001234567?text=${text}`;

    // Wait 2 seconds so the user can enjoy the visual gold confetti success state, then open WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white overflow-hidden font-sans selection:bg-[#d4af37] selection:text-[#111827]">
      
      {/* Floating Pulse WhatsApp Button */}
      <a
        href="https://wa.me/923001234567?text=Hi%20Zaria%20Salon!%20I'd%20like%20to%20inquire%20about%20your%20premium%20hair%20and%20bridal%20packages."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 p-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center justify-center border-2 border-white/20"
        aria-label="Connect via WhatsApp"
        id="whatsapp-floating-trigger"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 opacity-75 animate-ping -z-10"></span>
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.022-.015-.022-.015-.314-.16-.291-.144-1.725-.851-1.99-.947-.266-.097-.459-.144-.656.15-.197.293-.762.961-.933 1.157-.171.196-.341.22-.656.074-.315-.148-1.332-.491-2.536-1.565-.937-.837-1.57-1.871-1.753-2.184-.183-.311-.02-.48.137-.635.141-.139.314-.366.471-.549.157-.183.21-.314.314-.523.105-.21.053-.393-.026-.549-.079-.157-.656-1.58-.9-.217-.238-.57-.452-1.242-.452-1.242s-.19-.015-.314-.015c-.122 0-.323.045-.494.229-.171.183-.656.642-.656 1.568 0 .926.674 1.82 1.71 1.956.105.014 2.052 3.13 4.97 4.39.694.3 1.237.479 1.662.614.698.22 1.332.189 1.833.114.558-.083 1.725-.705 1.972-1.383.247-.678.247-1.258.173-1.382-.074-.124-.275-.197-.57-.344zM12.004 2c-5.518 0-10 4.482-10 10 0 1.761.458 3.477 1.332 5.003L2 22l5.161-1.353C8.683 21.439 10.323 22 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm.001 18.257c-1.54 0-3.051-.413-4.375-1.194l-.313-.187-3.249.85.865-3.168-.206-.327c-.856-1.359-1.31-2.929-1.31-4.545 0-4.542 3.694-8.236 8.236-8.236 4.543 0 8.237 3.694 8.237 8.236 0 4.544-3.694 8.237-8.237 8.237z" />
        </svg>
        <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-mono font-medium tracking-wide py-1.5 px-3 rounded-xl border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          WhatsApp Fast Booking
        </span>
      </a>

      {/* Navigation Bar */}
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />

      {/* 1. HOME / HERO SECTION */}
      <section
        ref={sectionsRef.home}
        id="home"
        className="min-h-screen relative flex items-center justify-center pt-24 pb-12 lg:py-0 px-6 md:px-8 bg-gradient-to-br from-[#111827] via-[#022c22]/30 to-[#1e1b4b]/45"
      >
        {/* Subtle Luxury Grid Lines */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Hero Left Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left order-2 lg:order-1">
            
            {/* Elegant luxury badge with fade slide-in */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#d4af37]/10 border border-[#d4af37]/35 rounded-full px-4 py-1.5 mb-6 hover:bg-[#d4af37]/15 transition-all duration-300"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span className="font-sans text-[10px] md:text-xs text-[#dfb48c] tracking-[0.25em] uppercase font-bold">
                THE AWARD-WINNING SANCTUARY
              </span>
            </motion.div>

            {/* Title / Heading in Luxury Serif */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-white tracking-tight leading-[1.1] mb-6 font-medium"
            >
              Where Legacy Meets <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#dfb48c] to-[#d4af37] bg-[size:200%_auto] animate-pulse italic">
                Couture Artistry
              </span>
            </motion.h1>

            {/* Subtitle / Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-gray-300 font-sans text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mb-10 font-light"
            >
              Discover Pakistan’s premier beauty experience in Lahore & Karachi. Empowering your signature beauty with world-class hair coloring, royal bridal makeups, and bespoke dermatological skin facials.
            </motion.p>

            {/* Actions Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
            >
              <button
                onClick={() => scrollToSection('booking')}
                className="group relative bg-gradient-to-r from-[#d4af37] to-[#dfb48c] text-[#111827] px-8 py-4 rounded-full font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-2xl shadow-[#d4af37]/25 hover:shadow-[#d4af37]/45 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Reserve Appointment</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <a
                href="https://wa.me/923001234567?text=Hi%20Zaria%20Salon!%20I'd%20like%20to%20inquire%20about%20your%20bridal%20makeup%20packages."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#d4af37]/40 hover:border-[#d4af37] text-white hover:bg-[#d4af37]/5 px-8 py-4 rounded-full font-sans font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4 fill-[#d4af37]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.022-.015-.022-.015-.314-.16-.291-.144-1.725-.851-1.99-.947-.266-.097-.459-.144-.656.15-.197.293-.762.961-.933 1.157-.171.196-.341.22-.656.074-.315-.148-1.332-.491-2.536-1.565-.937-.837-1.57-1.871-1.753-2.184-.183-.311-.02-.48.137-.635.141-.139.314-.366.471-.549.157-.183.21-.314.314-.523.105-.21.053-.393-.026-.549-.079-.157-.656-1.58-.9-.217-.238-.57-.452-1.242-.452-1.242s-.19-.015-.314-.015c-.122 0-.323.045-.494.229-.171.183-.656.642-.656 1.568 0 .926.674 1.82 1.71 1.956.105.014 2.052 3.13 4.97 4.39.694.3 1.237.479 1.662.614.698.22 1.332.189 1.833.114.558-.083 1.725-.705 1.972-1.383.247-.678.247-1.258.173-1.382-.074-.124-.275-.197-.57-.344zM12.004 2c-5.518 0-10 4.482-10 10 0 1.761.458 3.477 1.332 5.003L2 22l5.161-1.353C8.683 21.439 10.323 22 12.004 22c5.518 0 10-4.482 10-10s-4.482-10-10-10zm.001 18.257c-1.54 0-3.051-.413-4.375-1.194l-.313-.187-3.249.85.865-3.168-.206-.327c-.856-1.359-1.31-2.929-1.31-4.545 0-4.542 3.694-8.236 8.236-8.236 4.543 0 8.237 3.694 8.237 8.236 0 4.544-3.694 8.237-8.237 8.237z" />
                </svg>
                <span>WhatsApp Us</span>
              </a>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-14 grid grid-cols-3 gap-6 sm:gap-10 border-t border-[#d4af37]/10 pt-8 w-full max-w-md font-sans"
            >
              <div>
                <span className="block text-2xl font-serif text-[#d4af37] font-semibold">15k+</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Happy Brides</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#d4af37] font-semibold">12+</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Global Certs</span>
              </div>
              <div>
                <span className="block text-2xl font-serif text-[#d4af37] font-semibold">99.4%</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">5★ Reviews</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right 3D Interactive Canvas */}
          <div className="lg:col-span-5 h-[400px] sm:h-[480px] lg:h-[550px] w-full flex items-center justify-center order-1 lg:order-2 relative select-none">
            {/* Soft glowing particle backing */}
            <div className="absolute inset-0 bg-radial-gradient from-[#d4af37]/10 to-transparent blur-3xl rounded-full" />
            
            {/* The Real Interactive 3D Canvas */}
            <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
              <ThreeHeroCanvas />
            </div>

            {/* Interactive hint floating label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#111827]/90 border border-[#d4af37]/25 px-4 py-1.5 rounded-full backdrop-blur-md pointer-events-none flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-[10px] text-gray-300 font-mono tracking-widest uppercase">
                Move Mouse to Tilt 3D Vessel
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. ABOUT US SECTION */}
      <section
        ref={sectionsRef.about}
        id="about"
        className="py-24 sm:py-32 relative bg-gradient-to-b from-[#111827] to-[#022c22]/15 px-6 md:px-8 border-t border-[#d4af37]/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
            
            {/* Left Column: Image Reveal with Clip Path / Custom Shadow */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative group"
            >
              {/* Back glowing frame */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#d4af37]/20 to-transparent blur-xl opacity-70 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative rounded-3xl overflow-hidden border border-[#d4af37]/20 shadow-2xl">
                <img
                  src={salonImages.hairStyling}
                  alt="Premium hair styling inside Zaria Salon"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/10 to-transparent" />
                
                {/* Mini card inside the image for 3D depth layer */}
                <div className="absolute bottom-6 left-6 right-6 bg-[#111827]/90 backdrop-blur-md p-5 rounded-2xl border border-[#d4af37]/20 flex items-center gap-4">
                  <div className="p-3 bg-[#d4af37]/15 rounded-xl text-[#d4af37]">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold text-[#dfb48c] tracking-wide">Luxury Salon of the Year</h4>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-mono">Pakistan Esthetics Association</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Salon Story */}
            <div className="lg:col-span-7 text-left flex flex-col justify-center">
              <span className="font-sans text-xs text-[#d4af37] font-bold tracking-[0.25em] uppercase mb-3">
                OUR SACRED HERITAGE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight mb-6 font-medium">
                Pioneering Luxury & Elegance Since 2016
              </h2>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 font-light">
                Zaria Premium Salon was founded with a single, uncompromising vision: to revolutionize the beauty landscape of Pakistan. We believed local women deserved more than cookie-cutter hair washes and heavy, mask-like makeups. They deserved a personalized, couture sanctuary.
              </p>
              
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8 font-light">
                We combine prestigious European-certified methods with deep respect for local bridal traditions. From our state-of-the-art styling decks to our sterile dermal therapy rooms, every coordinate of Zaria is engineered to deliver meticulous excellence, physical comfort, and deep soul pampering.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <Scissors className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-[#dfb48c] mb-1">Couture Craft</h4>
                    <p className="text-xs text-gray-400">Customized color mixtures and precise hair geometry matching your bone structure.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-[#dfb48c] mb-1">Uncompromising Hygiene</h4>
                    <p className="text-xs text-gray-400">Hospital-grade autoclave tool sterilization and Single-Use-Only skin sponges.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Timeline Style Our Journey section */}
          <div className="mt-28">
            <div className="text-center mb-16">
              <span className="font-sans text-[10px] text-[#d4af37] font-bold tracking-[0.3em] uppercase mb-2 block">
                OUR STEADY GROWTH
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-white tracking-wide">
                A Timeline of Unrivaled Standards
              </h3>
              <p className="text-gray-400 text-xs sm:text-sm font-sans max-w-md mx-auto mt-2">
                Tracing our evolution from a boutique hair studio to Pakistan’s leading luxury beauty destination.
              </p>
            </div>

            {/* Interactive Timeline with 3D depth layout */}
            <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
              {/* Center vertical linking line */}
              <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#d4af37] via-[#d4af37]/20 to-transparent" />

              <div className="space-y-12 sm:space-y-16">
                {timelineEvents.map((event, index) => {
                  const isEven = index % 2 === 0;
                  return (
                    <motion.div
                      key={event.year}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`relative flex flex-col sm:flex-row items-center justify-between ${
                        isEven ? 'sm:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Anchor Timeline Ring */}
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#111827] border-2 border-[#d4af37] z-10 shadow-lg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-ping" />
                      </div>

                      {/* Content Card wrapped in TiltCard */}
                      <div className="w-full sm:w-[45%] mt-6 sm:mt-0">
                        <TiltCard intensity={5} className="bg-[#111827] border border-[#d4af37]/15 p-6 rounded-2xl hover:border-[#d4af37]/45 transition-colors">
                          <span className="font-serif text-2xl text-[#d4af37] font-bold block mb-2">{event.year}</span>
                          <h4 className="font-serif text-md text-[#dfb48c] tracking-wide mb-1.5 font-medium">{event.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed font-sans">{event.description}</p>
                        </TiltCard>
                      </div>

                      {/* Spacer column */}
                      <div className="hidden sm:block w-[45%]" />
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. SERVICES SECTION */}
      <section
        ref={sectionsRef.services}
        id="services"
        className="py-24 sm:py-32 relative bg-gradient-to-b from-[#022c22]/15 via-[#111827] to-[#1e1b4b]/20 px-6 md:px-8 border-t border-[#d4af37]/5"
      >
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="font-sans text-xs text-[#d4af37] font-bold tracking-[0.25em] uppercase mb-3 block">
              COUTURE TREATMENT INDEX
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-medium">
              Curated Services & Pricing
            </h2>
            <p className="text-gray-400 text-sm font-sans max-w-lg mx-auto mt-4 font-light leading-relaxed">
              Every service is personalized, starting with a consultation. Pricing in PKR is based on hair length, density, and customized formulas.
            </p>
          </div>

          {/* Service Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 max-w-3xl mx-auto">
            {['all', 'hair', 'color', 'skin', 'makeup', 'nails'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveServiceCategory(cat as any);
                  setExpandedServiceId(null);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-sans font-semibold tracking-widest uppercase transition-all duration-300 border cursor-pointer ${
                  activeServiceCategory === cat
                    ? 'bg-[#d4af37] text-[#111827] border-[#d4af37] shadow-lg shadow-[#d4af37]/15'
                    : 'bg-white/5 text-gray-300 border-white/5 hover:bg-white/10 hover:text-white'
                }`}
              >
                {cat === 'all' ? 'All Treatments' : cat}
              </button>
            ))}
          </div>

          {/* Services Grid with 3D Tilt Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredServices.map((service, index) => {
                const isExpanded = expandedServiceId === service.id;
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    key={service.id}
                    className="h-full"
                  >
                    <TiltCard intensity={7} className="h-full flex flex-col bg-[#111827]/80 border border-[#d4af37]/15 hover:border-[#d4af37]/55 transition-colors rounded-3xl">
                      
                      {/* Top ribbon based on category */}
                      <div className="px-6 pt-6 pb-4 flex justify-between items-start">
                        <span className="font-mono text-[9px] text-[#d4af37] uppercase tracking-[0.2em] bg-[#d4af37]/10 px-2.5 py-1 rounded-md font-bold">
                          {service.category}
                        </span>
                        <span className="text-xs text-gray-400 font-mono font-medium">
                          {service.duration}
                        </span>
                      </div>

                      {/* Header info */}
                      <div className="px-6 pb-4">
                        <h3 className="font-serif text-lg md:text-xl text-white tracking-wide font-medium min-h-[56px] flex items-center">
                          {service.name}
                        </h3>
                        <div className="text-md font-mono text-[#dfb48c] font-semibold mt-2">
                          {service.priceRange}
                        </div>
                      </div>

                      {/* Short description */}
                      <p className="px-6 pb-6 text-gray-400 text-xs leading-relaxed font-sans">
                        {service.description}
                      </p>

                      {/* Expanded Section Accordion */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden bg-[#1f2937]/30 border-t border-[#d4af37]/10"
                          >
                            <div className="p-6 text-left">
                              <h4 className="font-sans text-[10px] text-[#dfb48c] font-bold tracking-widest uppercase mb-3">
                                Included Benefits
                              </h4>
                              <ul className="space-y-2 mb-4">
                                {service.benefits.map((benefit, bIdx) => (
                                  <li key={bIdx} className="flex items-center gap-2 text-xs text-gray-300">
                                    <Check className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                                    <span>{benefit}</span>
                                  </li>
                                ))}
                              </ul>
                              
                              <button
                                onClick={() => {
                                  setBookingService(service.name);
                                  scrollToSection('booking');
                                }}
                                className="w-full bg-[#d4af37]/10 hover:bg-[#d4af37] text-[#d4af37] hover:text-[#111827] border border-[#d4af37]/30 hover:border-[#d4af37] py-2 rounded-xl text-xs font-sans font-bold tracking-widest uppercase transition-all cursor-pointer"
                              >
                                Select Treatment
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Accordion Expand Trigger */}
                      <div className="mt-auto border-t border-[#d4af37]/5">
                        <button
                          onClick={() => setExpandedServiceId(isExpanded ? null : service.id)}
                          className="w-full py-4 text-center text-[10px] font-mono tracking-[0.2em] uppercase text-gray-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>{isExpanded ? 'Less Info' : 'More Details'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3 text-[#d4af37]" /> : <ChevronDown className="w-3 h-3 text-[#d4af37]" />}
                        </button>
                      </div>

                    </TiltCard>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* 4. BRIDAL & PARTY PACKAGES */}
      <section
        ref={sectionsRef.packages}
        id="packages"
        className="py-24 sm:py-32 relative bg-gradient-to-b from-[#1e1b4b]/20 via-[#111827] to-[#111827] px-6 md:px-8 border-t border-[#d4af37]/5"
      >
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            
            {/* Left Header info */}
            <div className="lg:col-span-6 text-left">
              <span className="font-sans text-xs text-[#d4af37] font-bold tracking-[0.25em] uppercase mb-3 block">
                ROYAL EMBELLISHMENTS
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-medium leading-[1.1]">
                Exquisite Bridal & Party Tiers
              </h2>
              <p className="text-gray-300 text-sm sm:text-base font-sans mt-4 max-w-xl font-light leading-relaxed">
                Make your wedding day, Nikkah, or formal party memories truly flawless. At Zaria, brides are pampered in private luxury suites with custom champagne and dessert pairings, while our artists craft unforgettable editorial skins.
              </p>
            </div>

            {/* Right signature Pakistani Bridal makeup visual with 3D Layer effect */}
            <div className="lg:col-span-6 relative flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden border border-[#d4af37]/20 shadow-2xl group"
              >
                <div className="absolute -inset-1 rounded-3xl bg-[#d4af37]/20 blur-xl opacity-60 pointer-events-none" />
                <img
                  src={salonImages.bridal}
                  alt="Traditional high-fashion Pakistani bridal makeup with gold jewelry"
                  className="w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Visual Depth overlay elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/10 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-black/45 backdrop-blur-md px-4 py-3.5 rounded-2xl border border-white/5 flex items-center justify-between">
                  <div>
                    <span className="block text-[10px] text-gray-400 font-mono uppercase tracking-widest">Bridal Portfolios</span>
                    <span className="block text-xs font-serif font-medium text-white tracking-wide">Signature Blush Glow by Zaria Khan</span>
                  </div>
                  <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37] animate-pulse" />
                </div>
              </motion.div>
            </div>

          </div>

          {/* Three Packages Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 items-stretch">
            {bridalPackages.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="h-full flex"
              >
                <TiltCard
                  intensity={6}
                  className={`relative flex flex-col justify-between w-full p-8 rounded-3xl border h-full transition-all duration-500 ${
                    pkg.popular
                      ? 'bg-gradient-to-b from-[#022c22]/40 via-[#111827] to-[#111827] border-[#d4af37] shadow-xl shadow-[#d4af37]/5'
                      : 'bg-[#111827] border-slate-800'
                  }`}
                >
                  {/* Popular Crown Ribbon badge */}
                  {pkg.popular && (
                    <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-[#d4af37] to-[#dfb48c] text-[#111827] text-[9px] font-sans font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-10">
                      <Star className="w-3 h-3 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  )}

                  <div>
                    <div className="mb-4">
                      <h3 className="font-serif text-xl sm:text-2xl text-white tracking-wide font-semibold">
                        {pkg.name}
                      </h3>
                      <p className="text-[11px] text-gray-400 font-sans tracking-wide italic mt-1.5 leading-relaxed min-h-[36px]">
                        {pkg.tagline}
                      </p>
                    </div>

                    <div className="my-6 border-y border-slate-800 py-4 flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-bold text-[#dfb48c]">{pkg.price}</span>
                      <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest">/ Complete treatment</span>
                    </div>

                    <p className="text-gray-300 text-xs leading-relaxed font-sans mb-6">
                      {pkg.description}
                    </p>

                    <div className="space-y-3">
                      <span className="block text-[9px] text-[#dfb48c] font-mono tracking-[0.2em] uppercase font-bold mb-1">
                        Luxury Inclusions:
                      </span>
                      {pkg.includes.map((inc, incIdx) => (
                        <div key={incIdx} className="flex items-start gap-2 text-xs text-gray-300">
                          <Check className="w-4 h-4 text-[#d4af37] mt-0.5 shrink-0" />
                          <span className="leading-tight">{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => {
                        setBookingService(pkg.name);
                        scrollToSection('booking');
                      }}
                      className={`w-full py-3 px-4 rounded-xl text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-[#d4af37] to-[#dfb48c] text-[#111827] shadow-lg shadow-[#d4af37]/20 hover:scale-[1.02] active:scale-95'
                          : 'bg-white/5 border border-white/10 text-[#dfb48c] hover:bg-[#d4af37]/10 hover:text-white hover:border-[#d4af37]'
                      }`}
                    >
                      Reserve Package
                    </button>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. VIRTUAL STUDIO TOUR */}
      <section
        ref={sectionsRef.tour}
        id="tour"
        className="py-24 sm:py-32 relative bg-gradient-to-b from-[#111827] via-[#111827] to-[#022c22]/10 px-6 md:px-8 border-t border-[#d4af37]/5"
      >
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="font-sans text-xs text-[#d4af37] font-bold tracking-[0.25em] uppercase mb-3 block">
              IMMERSIVE 3D VISUALIZATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-medium">
              Virtual Studio Tour
            </h2>
            <p className="text-gray-400 text-sm font-sans max-w-xl mx-auto mt-4 leading-relaxed font-light">
              Step inside our flagships. Drag your mouse or finger inside the interactive viewer below to look around 360-degrees. Tap the hotspot ring icons to explore our private suites, manicure hubs, and master hair styling decks.
            </p>
          </div>

          {/* Interactive 3D Panoramic Sphere viewer */}
          <div className="max-w-5xl mx-auto mt-10">
            <ThreeVirtualTour />
          </div>

        </div>
      </section>

      {/* 6. MEET THE TEAM */}
      <section
        ref={sectionsRef.team}
        id="team"
        className="py-24 sm:py-32 relative bg-gradient-to-b from-[#022c22]/10 via-[#111827] to-[#1e1b4b]/20 px-6 md:px-8 border-t border-[#d4af37]/5"
      >
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="font-sans text-xs text-[#d4af37] font-bold tracking-[0.25em] uppercase mb-3 block">
              OUR MASTER ARTISANS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-medium">
              Meet the Virtuosos
            </h2>
            <p className="text-gray-400 text-sm font-sans max-w-lg mx-auto mt-4 font-light leading-relaxed">
              Internationally trained, hygiene-certified, and passionate. Meet the team crafting standard-setting esthetics.
            </p>
          </div>

          {/* 3D Flip-on-Hover Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="group h-[450px] [perspective:1200px] select-none"
              >
                {/* Card Inner with 3D Flip state */}
                <div className="relative w-full h-full rounded-3xl transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl">
                  
                  {/* Front Side of Card */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden [backface-visibility:hidden] border border-[#d4af37]/15">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Shadow overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/10 to-transparent" />
                    
                    {/* Front info text */}
                    <div className="absolute bottom-6 left-6 right-6 text-left">
                      <span className="font-mono text-[9px] text-[#d4af37] uppercase tracking-[0.25em] font-bold">
                        {member.role}
                      </span>
                      <h3 className="font-serif text-xl text-white tracking-wide font-medium mt-1">
                        {member.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-[#dfb48c] mt-2 font-mono">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{member.specialty}</span>
                      </div>
                    </div>

                    {/* Hint tag */}
                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[8px] text-gray-300 font-mono tracking-widest px-2.5 py-1 rounded-full uppercase border border-white/5">
                      Hover to Read Bio
                    </div>
                  </div>

                  {/* Back Side of Card (Flipped) */}
                  <div className="absolute inset-0 w-full h-full rounded-3xl bg-slate-900 border-2 border-[#d4af37]/35 p-8 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    
                    <div className="text-left">
                      <div className="p-3.5 bg-[#d4af37]/10 rounded-2xl w-fit text-[#d4af37] mb-6">
                        <Scissors className="w-6 h-6" />
                      </div>
                      
                      <span className="font-mono text-[9px] text-[#d4af37] uppercase tracking-[0.25em] font-bold block mb-1">
                        Biography & Specialty
                      </span>
                      
                      <h3 className="font-serif text-lg text-[#dfb48c] tracking-wide font-medium mb-4">
                        {member.name}
                      </h3>
                      
                      <p className="text-gray-300 text-xs leading-relaxed font-sans">
                        {member.bio}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-800 pt-5">
                      <a
                        href={`https://instagram.com`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-[#d4af37] transition-all font-mono"
                      >
                        <Instagram className="w-4 h-4 text-[#d4af37]" />
                        <span>{member.instagram}</span>
                      </a>
                      
                      <button
                        onClick={() => {
                          setBookingStylist(member.name);
                          scrollToSection('booking');
                        }}
                        className="bg-[#d4af37] hover:bg-[#dfb48c] text-slate-950 text-[10px] font-sans font-bold tracking-widest uppercase px-4 py-2 rounded-xl transition-colors cursor-pointer"
                      >
                        Select Artist
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Testimonials Slideshow Sub-Section */}
          <div className="mt-28 bg-[#111827]/80 border border-[#d4af37]/10 p-8 sm:p-12 rounded-3xl max-w-4xl mx-auto text-center relative overflow-hidden">
            
            {/* Ambient gold glow behind testimonial */}
            <div className="absolute -top-12 -left-12 w-48 h-48 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
            
            <span className="font-sans text-[10px] text-[#d4af37] font-bold tracking-[0.3em] uppercase block mb-4">
              TESTIMONIALS
            </span>

            <div className="min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <div className="flex justify-center gap-1">
                    {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
                    ))}
                  </div>

                  <p className="font-serif text-lg sm:text-xl text-white italic tracking-wide leading-relaxed max-w-2xl mx-auto">
                    "{testimonials[testimonialIndex].text}"
                  </p>

                  <div className="pt-4">
                    <span className="block font-sans text-xs text-[#dfb48c] font-bold tracking-widest uppercase">
                      {testimonials[testimonialIndex].name}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono tracking-widest uppercase">
                      {testimonials[testimonialIndex].location} • {testimonials[testimonialIndex].service}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Testimonials Navigation dots */}
            <div className="flex justify-center gap-2 mt-8 z-10 relative">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    testimonialIndex === idx ? 'bg-[#d4af37] w-6' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* 7. BOOK AN APPOINTMENT SECTION */}
      <section
        ref={sectionsRef.booking}
        id="booking"
        className="py-24 sm:py-32 relative bg-gradient-to-b from-[#111827] via-[#111827] to-[#1e1b4b]/20 px-6 md:px-8 border-t border-[#d4af37]/5"
      >
        {/* Glowing background meshes */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-[#d4af37]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="font-sans text-xs text-[#d4af37] font-bold tracking-[0.25em] uppercase mb-3 block">
              SECURE SLOT RESERVATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-tight font-medium">
              Book Your Experience
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm font-sans max-w-md mx-auto mt-3 font-light leading-relaxed">
              Provide your details below to request a priority slot. We coordinate confirmation directly via WhatsApp Business for prompt, bespoke service.
            </p>
          </div>

          {/* Booking card */}
          <div className="bg-[#111827] border border-[#d4af37]/25 p-8 sm:p-12 rounded-3xl shadow-2xl relative">
            
            <AnimatePresence mode="wait">
              {!isBooked ? (
                <motion.form
                  key="booking-form"
                  onSubmit={handleBookingSubmit}
                  className="space-y-6 text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={bookingName}
                        onChange={(e) => setBookingName(e.target.value)}
                        placeholder="e.g. Amina Yusuf"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#d4af37] px-4 py-3 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none transition-colors font-sans"
                      />
                    </div>

                    {/* Phone / Whatsapp */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={bookingPhone}
                        onChange={(e) => setBookingPhone(e.target.value)}
                        placeholder="e.g. +92 300 1234567"
                        className="w-full bg-white/5 border border-white/10 focus:border-[#d4af37] px-4 py-3 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service Selection */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold">
                        Treatment / Package *
                      </label>
                      <select
                        required
                        value={bookingService}
                        onChange={(e) => setBookingService(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 focus:border-[#d4af37] px-4 py-3 rounded-xl text-xs text-white focus:outline-none transition-colors font-sans"
                      >
                        <option value="" disabled>Select a treatment...</option>
                        <optgroup label="Couture Hair & Color">
                          <option value="Couture Haircut & Blow-Dry">Couture Haircut & Blow-Dry</option>
                          <option value="Advanced Keratin Treatment">Advanced Keratin Treatment</option>
                          <option value="Parisian Balayage / Ombré">Parisian Balayage / Ombré</option>
                          <option value="Full Luxury Signature Tint">Full Luxury Signature Tint</option>
                        </optgroup>
                        <optgroup label="Skin & Facials">
                          <option value="24K Gold Luxury Illuminating Facial">24K Gold Luxury Illuminating Facial</option>
                          <option value="Hydra-Infusion Deep Cleansing">Hydra-Infusion Deep Cleansing</option>
                        </optgroup>
                        <optgroup label="Bridal & Party Packages">
                          <option value="The Royal Heritage Bride">The Royal Heritage Bride (PKR 65k)</option>
                          <option value="The Modern Minimalist Bride">The Modern Minimalist Bride (PKR 45k)</option>
                          <option value="Bridal Party Luxe (Group of 3+)">Bridal Party Luxe</option>
                          <option value="Signature Glam / Party Makeup">Signature Glam / Party Makeup</option>
                        </optgroup>
                        <optgroup label="Nail Sanctuaries">
                          <option value="Champagne Spa Manicure & Pedicure">Champagne Spa Manicure & Pedicure</option>
                          <option value="Sculpted Gel / Acrylic Extensions">Sculpted Gel / Acrylic Extensions</option>
                        </optgroup>
                      </select>
                    </div>

                    {/* Master Stylist */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold">
                        Preferred Stylist / Consultant
                      </label>
                      <select
                        value={bookingStylist}
                        onChange={(e) => setBookingStylist(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 focus:border-[#d4af37] px-4 py-3 rounded-xl text-xs text-white focus:outline-none transition-colors font-sans"
                      >
                        <option value="">Any Master Stylist</option>
                        <option value="Zaria Khan">Zaria Khan (Chief Bridal Stylist)</option>
                        <option value="Anum Jahangir">Anum Jahangir (Master Hair Artisan)</option>
                        <option value="Dr. Sarah Malik">Dr. Sarah Malik (Skin Dermatologist)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Preferred Date */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-[#d4af37] px-4 py-3 rounded-xl text-xs text-white focus:outline-none transition-colors font-mono"
                      />
                    </div>

                    {/* Preferred Time */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono tracking-widest uppercase text-gray-400 font-bold">
                        Preferred Time Slot
                      </label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 focus:border-[#d4af37] px-4 py-3 rounded-xl text-xs text-white focus:outline-none transition-colors font-sans"
                      >
                        <option value="">Any Time (11:00 AM - 8:00 PM)</option>
                        <option value="Morning (11:00 AM - 1:00 PM)">Morning (11:00 AM - 1:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                        <option value="Evening (5:00 PM - 8:00 PM)">Evening (5:00 PM - 8:00 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#d4af37] to-[#dfb48c] text-[#111827] py-4 rounded-xl text-xs font-sans font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-xl shadow-[#d4af37]/15 hover:shadow-[#d4af37]/35 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Confirm & Open WhatsApp</span>
                    </button>
                    
                    <span className="block text-center text-[9px] text-gray-500 font-mono uppercase tracking-widest mt-3.5">
                      * Required fields. Standard validation applies.
                    </span>
                  </div>

                </motion.form>
              ) : (
                <motion.div
                  key="booking-success"
                  className="py-12 flex flex-col items-center text-center space-y-6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-16 h-16 bg-[#d4af37]/10 border-2 border-[#d4af37] text-[#d4af37] rounded-full flex items-center justify-center animate-bounce">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  
                  <div>
                    <h3 className="font-serif text-2xl text-[#dfb48c] tracking-wide font-medium">Slot Pre-Reserved!</h3>
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-mono mt-1">Connecting to WhatsApp Business API</p>
                  </div>

                  <p className="text-gray-300 text-sm leading-relaxed max-w-md mx-auto font-sans">
                    Thank you, <strong className="text-white">{bookingName}</strong>. Your inquiry details are pre-formatted. We are opening WhatsApp Web or your phone app so you can send your booking directly to our front desk in seconds!
                  </p>

                  <div className="bg-[#1f2937]/50 border border-slate-800 p-4 rounded-2xl w-full text-left font-mono text-[11px] space-y-2 text-gray-300">
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>CLIENT:</span>
                      <span className="text-white font-sans">{bookingName}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>TREATMENT:</span>
                      <span className="text-[#dfb48c] font-sans font-medium">{bookingService}</span>
                    </div>
                    <div className="flex justify-between border-b border-white/5 pb-1">
                      <span>DATE:</span>
                      <span className="text-white">{bookingDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PHONE:</span>
                      <span className="text-white">{bookingPhone}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsBooked(false);
                      setBookingName('');
                      setBookingPhone('');
                      setBookingService('');
                    }}
                    className="text-xs font-mono text-gray-400 hover:text-white underline cursor-pointer"
                  >
                    [Back to booking form]
                  </button>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>
      </section>

      {/* 8. CONTACT & LOCATION SECTION */}
      <section
        ref={sectionsRef.contact}
        id="contact"
        className="py-24 sm:py-32 relative bg-gradient-to-b from-[#1e1b4b]/20 via-[#111827] to-[#0d1117] px-6 md:px-8 border-t border-[#d4af37]/5"
      >
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Contact & Hours Panel */}
            <div className="lg:col-span-5 text-left space-y-10">
              <div>
                <span className="font-sans text-xs text-[#d4af37] font-bold tracking-[0.25em] uppercase mb-3 block">
                  LOCATIONS & CONTACTS
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white tracking-tight font-medium leading-[1.1]">
                  Visit the Flagships
                </h2>
                <p className="text-gray-400 text-sm font-sans mt-3 font-light leading-relaxed">
                  We look forward to hosting you. Drop in or call our reservation managers in Karachi or Lahore.
                </p>
              </div>

              {/* Opening Hours Info Card */}
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-[#d4af37]/10 rounded-2xl text-[#d4af37] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-[#dfb48c] mb-1">Operating Hours</h4>
                    <p className="text-xs text-white font-mono">{openingHours.days}</p>
                    <p className="text-xs text-gray-300 font-mono mt-0.5">{openingHours.hours}</p>
                    <p className="text-xs text-rose-400 font-mono font-medium mt-1 uppercase tracking-wider">{openingHours.closed} Closed</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-white/5 pt-6">
                  <div className="p-3 bg-[#d4af37]/10 rounded-2xl text-[#d4af37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-[#dfb48c] mb-1.5">Addresses</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[10px] text-[#dfb48c] font-mono uppercase tracking-wider font-bold">Lahore flagship:</span>
                        <p className="text-xs text-gray-300 leading-normal">Block K, Gulberg III, Lahore, Pakistan</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#dfb48c] font-mono uppercase tracking-wider font-bold">Karachi flagship:</span>
                        <p className="text-xs text-gray-300 leading-normal">Phase 6, DHA, Karachi, Pakistan</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4 border-t border-white/5 pt-6">
                  <div className="p-3 bg-[#d4af37]/10 rounded-2xl text-[#d4af37] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold tracking-widest uppercase text-[#dfb48c] mb-1">Direct Contacts</h4>
                    <p className="text-xs text-white font-mono">{openingHours.phone}</p>
                    <p className="text-xs text-gray-300 font-mono mt-0.5">{openingHours.whatsapp} (WhatsApp)</p>
                    <p className="text-xs text-gray-300 font-mono mt-0.5">{openingHours.email}</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Map Panel with Parallax background design */}
            <div className="lg:col-span-7 h-[400px] sm:h-[480px] lg:h-[550px] w-full rounded-3xl overflow-hidden border border-[#d4af37]/20 shadow-2xl relative">
              {/* Actual Embedded Google Map representing central luxury Lahore/Karachi */}
              <iframe
                title="Zaria Salon Flagship Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108924.96023531123!2d74.3015464!3d31.4801121!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919050d4d440db7%3A0x6b44f0b2f5ed6854!2sGulberg%20III%2C%20Lahore%2C%20Pakistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                className="w-full h-full border-none opacity-85 hover:opacity-100 transition-opacity duration-500"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              
              {/* Overlay styling bounds */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent pointer-events-none" />
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0b0f17] border-t border-white/5 py-12 px-6 md:px-8 text-center text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="font-serif text-xl text-white tracking-widest font-bold uppercase">ZARIA</span>
            <span className="text-[9px] text-[#d4af37] uppercase tracking-[0.3em] font-mono leading-none mt-1">Premium Beauty Salon</span>
          </div>

          <p className="text-xs font-sans font-light">
            © 2026 Zaria Premium Salon. Crafted with visual excellence for Pakistan’s elite. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 border border-white/5 hover:border-[#d4af37]/30 text-gray-300 hover:text-[#d4af37] rounded-full transition-all">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 border border-white/5 hover:border-[#d4af37]/30 text-gray-300 hover:text-[#d4af37] rounded-full transition-all">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a href={`mailto:${openingHours.email}`} className="p-2.5 bg-white/5 border border-white/5 hover:border-[#d4af37]/30 text-gray-300 hover:text-[#d4af37] rounded-full transition-all">
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
