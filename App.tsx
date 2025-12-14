import React, { useState, useEffect, useCallback } from 'react';

// --- Types ---

interface NavLink {
  label: string;
  href: string;
}

interface Feature {
  iconSvg: string;
  title: string;
  description: string;
}

interface BlogPost {
  image: string;
  date: string;
  title: string;
  excerpt: string;
}

interface Testimonial {
  image: string;
  quote: string;
  author: string;
}

interface Destination {
  image: string;
  title: string;
  rating: number; // 0-5
  reviews: number;
}

// --- Data ---

const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Hotels', href: '#' },
  { label: 'About Us', href: '#' },
  { label: 'Gallery', href: '#' },
  { label: 'News', href: '#' },
  { label: 'Contact', href: '#' },
];

const FEATURES: Feature[] = [
  {
    iconSvg: 'https://preview.colorlib.com/theme/hepta/fonts/flaticon/svg/001-breakfast.svg',
    title: 'Good Foods',
    description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
  {
    iconSvg: 'https://preview.colorlib.com/theme/hepta/fonts/flaticon/svg/002-planet-earth.svg',
    title: 'Travel Anywhere',
    description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
  {
    iconSvg: 'https://preview.colorlib.com/theme/hepta/fonts/flaticon/svg/003-airplane.svg',
    title: 'Airplane',
    description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
  {
    iconSvg: 'https://preview.colorlib.com/theme/hepta/fonts/flaticon/svg/004-beach.svg',
    title: 'Beach Resort',
    description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
  {
    iconSvg: 'https://preview.colorlib.com/theme/hepta/fonts/flaticon/svg/005-mountains.svg',
    title: 'Mountain Climbing',
    description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
  {
    iconSvg: 'https://preview.colorlib.com/theme/hepta/fonts/flaticon/svg/006-hot-air-balloon.svg',
    title: 'Hot Air Balloon',
    description: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
];

const SLIDER_IMAGES = [
  'https://preview.colorlib.com/theme/hepta/images/slider-1.jpg',
  'https://preview.colorlib.com/theme/hepta/images/slider-2.jpg',
  'https://preview.colorlib.com/theme/hepta/images/slider-3.jpg',
  'https://preview.colorlib.com/theme/hepta/images/slider-4.jpg',
  'https://preview.colorlib.com/theme/hepta/images/slider-5.jpg',
  'https://preview.colorlib.com/theme/hepta/images/slider-6.jpg',
];

const BLOG_POSTS: BlogPost[] = [
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/img_1.jpg',
    date: 'February 26, 2018',
    title: '45 Best Places To Unwind',
    excerpt: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/img_2.jpg',
    date: 'February 26, 2018',
    title: '45 Best Places To Unwind',
    excerpt: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/img_3.jpg',
    date: 'February 26, 2018',
    title: '45 Best Places To Unwind',
    excerpt: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/person_1.jpg',
    quote: '“Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.”',
    author: 'Clare Gupta'
  },
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/person_2.jpg',
    quote: '“Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.”',
    author: 'Rogie Slater'
  },
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/person_3.jpg',
    quote: '“Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.”',
    author: 'John Doe'
  },
];

const DESTINATIONS: Destination[] = [
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/img_1.jpg',
    title: 'Food & Wines',
    rating: 3.5,
    reviews: 3239
  },
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/img_2.jpg',
    title: 'Resort & Spa',
    rating: 4.5,
    reviews: 4921
  },
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/img_3.jpg',
    title: 'Hotel Rooms',
    rating: 5,
    reviews: 2112
  },
  {
    image: 'https://preview.colorlib.com/theme/hepta/images/img_4.jpg',
    title: 'Mountain Climbing',
    rating: 4,
    reviews: 6301
  },
];

// --- Components ---

const Rating = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i} className="ion-android-star text-brand-primary text-lg"></span>);
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i} className="ion-android-star-half text-brand-primary text-lg"></span>);
    } else {
      stars.push(<span key={i} className="ion-android-star-outline text-brand-primary text-lg"></span>);
    }
  }
  return <div className="flex space-x-1">{stars}</div>;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-white/5 py-4 backdrop-blur-sm' : 'py-[30px] sm:py-[50px]'}`}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="w-1/3">
              <a href="#" className={`font-abril text-3xl font-bold ${isMenuOpen ? 'text-black' : 'text-white'}`}>Hepta</a>
            </div>
            <div className="w-2/3 flex justify-end">
              <div 
                className={`site-menu-toggle js-site-menu-toggle ${isMenuOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
      >
        <nav>
          <ul className="text-center space-y-4">
            {NAV_LINKS.map((link, idx) => (
              <li key={idx}>
                <a 
                  href={link.href} 
                  className={`font-abril text-4xl block transition-colors duration-300 ${idx === 0 ? 'text-brand-primary' : 'text-black hover:text-brand-primary'}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

const Hero = () => {
  return (
    <section className="site-hero relative h-screen min-h-[700px] flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url("https://preview.colorlib.com/theme/hepta/images/hero_1.jpg")' }}
      />
      {/* Overlay - Dark overlay rgba(0,0,0,0.2) */}
      <div className="absolute inset-0 bg-black/20 z-0" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-[-50px]">
        <h1 className="font-abril text-white text-5xl sm:text-7xl md:text-[80px] font-bold mb-6 leading-tight">
          Travel & Tours
        </h1>
        <p className="text-white text-lg sm:text-2xl md:text-[30px] font-mukta mb-10 opacity-90">
          A free template by <a href="#" className="border-b-2 border-white/20 hover:border-white transition-colors pb-1">Colorlib</a>. Download and share!
        </p>
        <button className="btn-outline-light inline-block bg-transparent border-2 border-white text-white font-mukta uppercase tracking-wider py-4 px-8 rounded hover:bg-white hover:text-brand-dark-gray transition-colors text-sm font-bold tracking-[.2em]">
          Visit Colorlib
        </button>
      </div>

      {/* Scroll Down */}
      <a href="#next-section" className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 text-white font-mukta text-xs font-bold uppercase tracking-widest hover:text-white/80 transition-colors flex items-center gap-2">
        <i className="fa fa-play text-xs rotate-90 transform"></i>
        Scroll Down
      </a>
    </section>
  );
};

const WelcomeSection = () => {
  return (
    <section id="next-section" className="py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <img 
              src="https://preview.colorlib.com/theme/hepta/images/img_1_long.jpg" 
              alt="Welcome" 
              className="w-full h-auto object-cover rounded shadow-sm"
            />
          </div>
          <div className="lg:pl-4">
            <h2 className="font-abril text-4xl sm:text-5xl text-black mb-6">Welcome To Our Website</h2>
            <p className="font-mukta text-brand-gray text-lg mb-6 leading-relaxed">
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
            </p>
            <p className="font-mukta text-brand-gray text-lg mb-10 leading-relaxed">
              A small river named Duden flows by their place and supplies it with the necessary regelialia.
            </p>
            <a href="#" className="group flex items-center gap-4 text-black uppercase font-bold tracking-widest text-sm hover:opacity-80 transition-opacity">
              <div className="w-[50px] h-[50px] rounded-full border-2 border-[#e6e6e6] flex items-center justify-center transition-colors group-hover:border-[#1a1a1a] group-hover:bg-[#1a1a1a]">
                <i className="fa fa-play ml-1 group-hover:text-white transition-colors"></i>
              </div>
              <span>Watch The Video</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  return (
    <section className="py-24 sm:py-32 bg-brand-light border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-abril text-4xl sm:text-6xl text-black mb-4">Experience Once In Your Life Time</h2>
          <p className="font-mukta text-brand-gray text-xl leading-relaxed">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="bg-transparent p-4 flex flex-col items-start text-left">
              <div className="mb-6 h-[70px]">
                {/* SVG Filter to match Brand Primary Teal #65c0ba */}
                <img src={feature.iconSvg} alt={feature.title} className="w-[60px] h-[60px]" style={{ filter: 'brightness(0) saturate(100%) invert(80%) sepia(21%) saturate(760%) hue-rotate(123deg) brightness(87%) contrast(83%)' }} />
              </div>
              <h3 className="font-abril text-2xl text-black mb-4">{feature.title}</h3>
              <p className="font-mukta text-brand-gray text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
const SliderSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);
  }, []);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="slider-section py-24 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-abril text-4xl sm:text-6xl text-black mb-4">International Tour Management.</h2>
          <p className="font-mukta text-brand-gray text-xl leading-relaxed">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>
        </div>
        {/* Custom Slider Implementation */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex items-center">
            {/* Left Arrow - Outside image */}
            <button 
              onClick={prevSlide}
              className="flex-shrink-0 w-20 h-20 flex items-center justify-center transition-opacity z-30 text-black hover:opacity-70"
            >
              <i className="fa fa-chevron-left text-5xl"></i>
            </button>
            
            {/* Slider Container */}
            <div className="relative h-[400px] md:h-[700px] flex-grow">
              {SLIDER_IMAGES.map((img, idx) => {
                const isActive = idx === currentSlide;

                return (
                  <div 
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${isActive ? 'opacity-100 z-20' : 'opacity-0 z-0 invisible'}`}
                  >
                    <img 
                      src={img} 
                      alt={`Slide ${idx}`} 
                      className="w-full h-full object-cover rounded shadow-lg" 
                    />
                    {/* Dots inside active image */}
                    <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-5 z-30">
                      {SLIDER_IMAGES.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => setCurrentSlide(dotIdx)}
                          className={`w-7 h-7 rounded-full transition-all duration-300 ${dotIdx === currentSlide ? 'bg-brand-primary' : 'bg-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Right Arrow - Outside image */}
            <button 
              onClick={nextSlide}
              className="flex-shrink-0 w-20 h-20 flex items-center justify-center transition-opacity z-30 text-black hover:opacity-70"
            >
              <i className="fa fa-chevron-right text-5xl"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogSection = () => {
  return (
    <section className="relative pt-48 pb-24 sm:pb-32 bg-brand-primary -mt-24 z-10 slant-bg">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-abril text-4xl sm:text-6xl text-black mb-4">Recent Blog Post</h2>
          <p className="font-mukta text-white/70 text-xl leading-relaxed">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post, idx) => (
            <div key={idx} className="bg-white rounded-none overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-300 group cursor-pointer">
              <div className="overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <span className="block text-gray-400 text-sm font-mukta uppercase tracking-wider mb-3">{post.date}</span>
                <h3 className="font-abril text-2xl text-black mb-4 group-hover:text-brand-primary transition-colors">
                  <a href="#">{post.title}</a>
                </h3>
                <p className="font-mukta text-brand-gray text-base leading-relaxed mb-0">
                  {post.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="testimonial-section py-24 sm:py-32 bg-brand-light">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-abril text-4xl sm:text-6xl text-black mb-4">Happy Customers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="bg-transparent p-6">
              <div className="mb-6">
                <img 
                  src={t.image} 
                  alt={t.author} 
                  className="w-[70px] h-[70px] rounded-full object-cover"
                />
              </div>
              <blockquote className="mb-6">
                <p className="font-mukta text-black text-xl italic leading-relaxed">
                  {t.quote}
                </p>
              </blockquote>
              <p className="font-mukta text-brand-gray text-base italic font-bold">
                — {t.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DestinationsSection = () => {
  return (
    <section className="visit-section py-24 sm:py-32 bg-white">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-abril text-4xl sm:text-6xl text-black mb-4">Top Destination</h2>
          <p className="font-mukta text-brand-gray text-xl leading-relaxed">
            Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DESTINATIONS.map((dest, idx) => (
            <div key={idx} className="group cursor-pointer">
              <div className="mb-4 overflow-hidden rounded-none shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 transform">
                <img 
                  src={dest.image} 
                  alt={dest.title} 
                  className="w-full h-64 object-cover"
                />
              </div>
              <h3 className="font-abril text-xl text-black mb-2 group-hover:text-brand-primary transition-colors">
                <a href="#">{dest.title}</a>
              </h3>
              <div className="flex items-center justify-between font-mukta text-sm">
                <Rating rating={dest.rating} />
                <span className="text-gray-400 italic">{dest.reviews.toLocaleString()} reviews</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark-gray text-white pt-24 pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Link */}
          <div>
            <h3 className="font-abril text-xl mb-6 text-white">Quick Link</h3>
            <ul className="space-y-3 font-mukta text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Help</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rooms</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-abril text-xl mb-6 text-white">Support</h3>
            <ul className="space-y-3 font-mukta text-white/70">
              <li><a href="#" className="hover:text-white transition-colors">Our Location</a></li>
              <li><a href="#" className="hover:text-white transition-colors">The Hosts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Restaurant</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-abril text-xl mb-6 text-white">Contact Info</h3>
            <div className="space-y-4 font-mukta text-white/70">
              <p>
                <span className="block text-white font-bold mb-1">Address:</span>
                98 West 21th Street, Suite 721 New York NY 10016
              </p>
              <p>
                <span className="block text-white font-bold mb-1">Phone:</span>
                (+1) 435 3533
              </p>
              <p>
                <span className="block text-white font-bold mb-1">Email:</span>
                info@yourdomain.com
              </p>
            </div>
          </div>

          {/* Subscribe */}
          <div>
            <h3 className="font-abril text-xl mb-6 text-white">Subscribe</h3>
            <p className="font-mukta text-white/50 mb-6">
              Sign up for our newsletter
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="relative">
              <input 
                type="email" 
                placeholder="Your email..." 
                className="w-full bg-transparent border-b border-white/20 py-3 pr-10 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors font-mukta italic"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white hover:text-brand-primary transition-colors"
                aria-label="Subscribe"
              >
                <i className="fa fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-12 text-center">
          <p className="font-mukta text-white/50 mb-6">
            Copyright © {new Date().getFullYear()} All rights reserved | This template is made with <span className="inline-block text-white/70"><i className="fa fa-heart" aria-hidden="true"></i></span> by Colorlib
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-white/50 hover:text-white transition-colors"><i className="fa fa-facebook text-xl"></i></a>
            <a href="#" className="text-white/50 hover:text-white transition-colors"><i className="fa fa-twitter text-xl"></i></a>
            <a href="#" className="text-white/50 hover:text-white transition-colors"><i className="fa fa-instagram text-xl"></i></a>
            <a href="#" className="text-white/50 hover:text-white transition-colors"><i className="fa fa-linkedin text-xl"></i></a>
            <a href="#" className="text-white/50 hover:text-white transition-colors"><i className="fa fa-youtube text-xl"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const App = () => {
  return (
    <div className="font-sans antialiased text-brand-gray">
      <Header />
      <Hero />
      <WelcomeSection />
      <FeaturesSection />
      <SliderSection />
      <BlogSection />
      <TestimonialsSection />
      <DestinationsSection />
      <Footer />
    </div>
  );
};

export default App;