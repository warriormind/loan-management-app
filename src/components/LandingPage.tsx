import React from 'react';
import { Button } from './ui/button';
import {
  Banknote,
  Users,
  CreditCard,
  Shield,
  PiggyBank,
  TrendingUp,
  FileText,
  Calculator,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  MapPin,
  Phone,
  Mail,
  Clock
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const services = [
    {
      icon: Banknote,
      title: 'Loan Management',
      description: 'Comprehensive loan processing, approval, and monitoring system for efficient lending operations.',
      number: '01'
    },
    {
      icon: Users,
      title: 'Client Management',
      description: 'Complete client profiles, KYC verification, and credit assessment tools.',
      number: '02'
    },
    {
      icon: CreditCard,
      title: 'Repayment Tracking',
      description: 'Automated repayment scheduling, payment processing, and delinquency management.',
      number: '03'
    },
    {
      icon: Shield,
      title: 'Risk Assessment',
      description: 'Advanced credit scoring, risk analysis, and collateral management features.',
      number: '04'
    },
    {
      icon: PiggyBank,
      title: 'Savings Management',
      description: 'Savings account management with interest calculations and withdrawal tracking.',
      number: '05'
    },
    {
      icon: TrendingUp,
      title: 'Financial Reporting',
      description: 'Comprehensive reports, analytics, and financial statements for informed decision making.',
      number: '06'
    }
  ];

  const testimonials = [
    {
      content: "LoanPro has transformed our lending operations. The automation features have saved us countless hours and improved our customer experience significantly.",
      author: "Sarah Johnson",
      role: "Operations Manager",
      rating: 5
    },
    {
      content: "The platform's intuitive interface and powerful analytics have helped us make better lending decisions and reduce risk exposure.",
      author: "Michael Chen",
      role: "Risk Manager",
      rating: 5
    },
    {
      content: "Outstanding customer support and seamless integration with our existing systems. Highly recommended for financial institutions.",
      author: "Emma Rodriguez",
      role: "IT Director",
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Basic',
      price: '29',
      period: '/month',
      features: [
        'Up to 100 clients',
        'Basic loan management',
        'Standard reporting',
        'Email support'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '79',
      period: '/month',
      features: [
        'Up to 1,000 clients',
        'Advanced loan management',
        'Custom reporting',
        'Priority support',
        'API access'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '199',
      period: '/month',
      features: [
        'Unlimited clients',
        'Full feature access',
        'White-label solution',
        'Dedicated support',
        'Custom integrations'
      ],
      popular: false
    }
  ];

  return (
    <div className="index-page">
      {/* Header */}
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a href="#hero" className="logo d-flex align-items-center me-auto me-xl-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-glow hover-tilt mr-3">
              <Banknote className="w-7 h-7 text-white transition-transform hover:rotate-12" />
            </div>
            <div>
              <h1 className="sitename text-2xl font-bold text-gradient">LoanPro</h1>
              <p className="text-sm text-white/70">Management System</p>
            </div>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#pricing">Pricing</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <div className="header-social-links">
            <Button
              variant="ghost"
              onClick={onGetStarted}
              className="text-white/90 hover:text-white hover:bg-white/10 glass transition-all duration-300"
            >
              Login
            </Button>
            <Button
              onClick={onGetStarted}
              className="btn-modern px-6 py-2 rounded-lg font-semibold shadow-glow hover-bounce"
            >
              Get Started
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="hero section">
        <div className="hero-background">
          <div className="hero-overlay"></div>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row justify-content-center text-center">
            <div className="col-lg-10">
              <div className="hero-content" data-aos="fade-up" data-aos-delay="200">
                <h1>Innovative Business Solutions for Tomorrow</h1>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.</p>

                <div className="hero-btns" data-aos="fade-up" data-aos-delay="300">
                  <Button
                    onClick={onGetStarted}
                    className="btn btn-primary hover-lift"
                  >
                    Start Your Journey
                  </Button>
                  <Button
                    variant="outline"
                    onClick={onGetStarted}
                    className="btn btn-outline glightbox hover-lift"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="hero-image-container" data-aos="zoom-in" data-aos-delay="400">
                <div className="hero-image">
                  <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-glow-lg">
                    <Banknote className="w-24 h-24 text-white" />
                  </div>
                  <div className="image-decoration"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="hero-stats" data-aos="fade-up" data-aos-delay="500">
                <div className="stat-item">
                  <div className="stat-icon">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3><span data-purecounter-start="0" data-purecounter-end="1247" data-purecounter-duration="1" className="purecounter">1,247</span>+</h3>
                  <p>Active Clients</p>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Banknote className="w-6 h-6" />
                  </div>
                  <h3><span data-purecounter-start="0" data-purecounter-end="850" data-purecounter-duration="1" className="purecounter">850</span>+</h3>
                  <p>Loans Processed</p>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <h3><span data-purecounter-start="0" data-purecounter-end="95" data-purecounter-duration="1" className="purecounter">95</span>%</h3>
                  <p>Success Rate</p>
                </div>
                <div className="stat-item">
                  <div className="stat-icon">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3><span data-purecounter-start="0" data-purecounter-end="12" data-purecounter-duration="1" className="purecounter">12</span>+</h3>
                  <p>Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about section">
        <div className="container section-title" data-aos="fade-up">
          <span className="description-title">About</span>
          <h2>About</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gx-0 gx-lg-5 gy-5 align-items-center">
            <div className="col-lg-6" data-aos="zoom-out" data-aos-delay="200">
              <div className="image-wrapper">
                <div className="image-box">
                  <div className="w-full h-96 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-glow-lg">
                    <Calculator className="w-24 h-24 text-white" />
                  </div>
                </div>
                <div className="experience-box" data-aos="zoom-in" data-aos-delay="300">
                  <div className="years">15+</div>
                  <div className="text">Years of<br />Experience</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
              <div className="content">
                <div className="section-header">
                  <h2>Empowering Businesses Through Innovative Solutions</h2>
                </div>

                <p className="highlight-text">Agile methodologies drive our collaborative approach, ensuring optimal outcomes across diverse industry verticals.</p>

                <div className="features-list">
                  <div className="feature-item" data-aos="zoom-in" data-aos-delay="300">
                    <div className="icon-box">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="text">
                      <h4>Expert Consulting</h4>
                      <p>In today's dynamic market landscape, strategic implementation of emerging technologies drives competitive advantage and sustainable growth trajectories.</p>
                    </div>
                  </div>

                  <div className="feature-item" data-aos="zoom-in" data-aos-delay="400">
                    <div className="icon-box">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div className="text">
                      <h4>Innovative Solutions</h4>
                      <p>Leveraging cutting-edge frameworks and methodologies to deliver scalable solutions that address complex business challenges effectively.</p>
                    </div>
                  </div>

                  <div className="feature-item" data-aos="zoom-in" data-aos-delay="500">
                    <div className="icon-box">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div className="text">
                      <h4>Growth Strategy</h4>
                      <p>Our comprehensive approach to digital transformation enables organizations to achieve sustainable competitive advantages in their respective markets.</p>
                    </div>
                  </div>
                </div>

                <div className="cta-buttons">
                  <Button
                    onClick={onGetStarted}
                    className="btn btn-primary hover-lift"
                  >
                    Learn More
                  </Button>
                  <Button
                    onClick={onGetStarted}
                    variant="outline"
                    className="btn btn-outline hover-lift"
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section">
        <div className="container section-title" data-aos="fade-up">
          <span className="description-title">Services</span>
          <h2>Services</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="services-container">
            <div className="row g-4">
              {services.map((service, index) => (
                <div key={index} className="col-lg-6" data-aos="fade-up" data-aos-delay={200 + index * 100}>
                  <div className="service-item hover-lift">
                    <div className="service-icon">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <div className="service-content">
                      <span className="service-number">{service.number}</span>
                      <h3 className="service-title">{service.title}</h3>
                      <p className="service-text">{service.description}</p>
                      <a href="#" className="service-link">
                        Learn More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-wrapper mt-5 text-center" data-aos="fade-up" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="cta-box">
                  <div className="row align-items-center">
                    <div className="col-lg-4">
                      <div className="cta-image" data-aos="zoom-in" data-aos-delay="200">
                        <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-glow-lg mx-auto">
                          <Banknote className="w-16 h-16 text-white" />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="cta-content text-lg-start" data-aos="fade-left" data-aos-delay="300">
                        <h3>Need a Custom Solution?</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
                        <Button
                          onClick={onGetStarted}
                          className="btn btn-primary hover-lift"
                        >
                          Schedule a Consultation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials section light-background">
        <div className="container section-title" data-aos="fade-up">
          <span className="description-title">Testimonials</span>
          <h2>Testimonials</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="testimonials-slider swiper init-swiper">
            <div className="swiper-wrapper">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="swiper-slide">
                  <div className="testimonial-card hover-lift">
                    <div className="testimonial-content">
                      <p>
                        <i className="bi bi-quote quote-icon"></i>
                        {testimonial.content}
                      </p>
                    </div>
                    <div className="testimonial-profile">
                      <div className="rating">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <div className="profile-info">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3>{testimonial.author}</h3>
                          <h4>{testimonial.role}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="swiper-pagination"></div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing section">
        <div className="container section-title" data-aos="fade-up">
          <span className="description-title">Pricing</span>
          <h2>Pricing</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row g-4">
            {pricingPlans.map((plan, index) => (
              <div key={index} className="col-lg-4" data-aos="fade-up" data-aos-delay={200 + index * 100}>
                <div className={`pricing-card ${plan.popular ? 'featured' : ''} hover-lift`}>
                  <div className="pricing-header">
                    <h3>{plan.name}</h3>
                    <div className="price">
                      <span className="currency">$</span>
                      <span className="amount">{plan.price}</span>
                      <span className="period">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="features-list">
                    {plan.features.map((feature, i) => (
                      <li key={i}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="text-center">
                    <Button
                      onClick={onGetStarted}
                      className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} hover-lift`}
                    >
                      Choose Plan
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section">
        <div className="container section-title" data-aos="fade-up">
          <span className="description-title">Contact</span>
          <h2>Contact</h2>
          <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
        </div>

        <div className="container">
          <div className="contact-wrapper">
            <div className="contact-info-panel">
              <div className="contact-info-header">
                <h3>Contact Information</h3>
                <p>Dignissimos deleniti accusamus rerum voluptate. Dignissimos rerum sit maiores reiciendis voluptate inventore ut.</p>
              </div>

              <div className="contact-info-cards">
                <div className="info-card">
                  <div className="icon-container">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="card-content">
                    <h4>Our Location</h4>
                    <p>4952 Hilltop Dr, Anytown, CA 90210</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="icon-container">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="card-content">
                    <h4>Email Us</h4>
                    <p>info@loanpro.com</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="icon-container">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="card-content">
                    <h4>Call Us</h4>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="info-card">
                  <div className="icon-container">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div className="card-content">
                    <h4>Working Hours</h4>
                    <p>Monday-Saturday: 9AM - 7PM</p>
                  </div>
                </div>
              </div>

              <div className="social-links-panel">
                <h5>Follow Us</h5>
                <div className="social-icons">
                  <a href="#"><i className="bi bi-facebook"></i></a>
                  <a href="#"><i className="bi bi-twitter-x"></i></a>
                  <a href="#"><i className="bi bi-instagram"></i></a>
                  <a href="#"><i className="bi bi-linkedin"></i></a>
                  <a href="#"><i className="bi bi-youtube"></i></a>
                </div>
              </div>
            </div>

            <div className="contact-form-panel">
              <div className="map-container">
                <div className="w-full h-80 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-white" />
                </div>
              </div>

              <div className="form-container">
                <h3>Send Us a Message</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipiscing elit mauris hendrerit faucibus imperdiet nec eget felis.</p>

                <form className="php-email-form">
                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="nameInput" name="name" placeholder="Full Name" required />
                    <label htmlFor="nameInput">Full Name</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input type="email" className="form-control" id="emailInput" name="email" placeholder="Email Address" required />
                    <label htmlFor="emailInput">Email Address</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="subjectInput" name="subject" placeholder="Subject" required />
                    <label htmlFor="subjectInput">Subject</label>
                  </div>

                  <div className="form-floating mb-3">
                    <textarea className="form-control" id="messageInput" name="message" rows={5} placeholder="Your Message" style={{ height: '150px' }} required></textarea>
                    <label htmlFor="messageInput">Your Message</label>
                  </div>

                  <div className="my-3">
                    <div className="loading">Loading</div>
                    <div className="error-message"></div>
                    <div className="sent-message">Your message has been sent. Thank you!</div>
                  </div>

                  <div className="d-grid">
                    <Button
                      type="submit"
                      className="btn btn-primary hover-lift"
                    >
                      Send Message <i className="bi bi-send-fill ms-2"></i>
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="footer light-background">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-geo-alt icon"></i>
              <div className="address">
                <h4>Address</h4>
                <p>A108 Adam Street</p>
                <p>New York, NY 535022</p>
                <p></p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-telephone icon"></i>
              <div>
                <h4>Contact</h4>
                <p>
                  <strong>Phone:</strong> <span>+1 5589 55488 55</span><br />
                  <strong>Email:</strong> <span>info@loanpro.com</span><br />
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-clock icon"></i>
              <div>
                <h4>Opening Hours</h4>
                <p>
                  <strong>Mon-Sat:</strong> <span>11AM - 23PM</span><br />
                  <strong>Sunday</strong>: <span>Closed</span>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4>Follow Us</h4>
              <div className="social-links d-flex">
                <a href="#" className="twitter"><i className="bi bi-twitter-x"></i></a>
                <a href="#" className="facebook"><i className="bi bi-facebook"></i></a>
                <a href="#" className="instagram"><i className="bi bi-instagram"></i></a>
                <a href="#" className="linkedin"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>© <span>Copyright</span> <strong className="px-1 sitename">LoanPro</strong> <span>All Rights Reserved</span></p>
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>

      {/* Scroll Top */}
      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      {/* Preloader */}
      <div id="preloader"></div>
    </div>
  );
}