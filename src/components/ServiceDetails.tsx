import React, { useEffect } from 'react';

export function ServiceDetails() {
  useEffect(() => {
    // Add scroll effect to header
    const handleScroll = () => {
      const header = document.querySelector('#header');
      if (header && window.scrollY > 100) {
        document.body.classList.add('scrolled');
      } else {
        document.body.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceFeatures = [
    {
      icon: 'bi-graph-up-arrow',
      title: 'Analytics & Reporting',
      description: 'Comprehensive tracking and performance analysis'
    },
    {
      icon: 'bi-people',
      title: 'Audience Targeting',
      description: 'Precise demographic and behavioral targeting'
    },
    {
      icon: 'bi-megaphone',
      title: 'Multi-Channel Campaigns',
      description: 'Integrated social media and search marketing'
    },
    {
      icon: 'bi-gear',
      title: 'Strategy Optimization',
      description: 'Continuous refinement for maximum ROI'
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: 'Discovery & Analysis',
      description: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae.'
    },
    {
      number: '02',
      title: 'Strategy Development',
      description: 'Donec rutrum congue leo eget malesuada. Cras ultricies ligula sed magna dictum porta. Vestibulum ante ipsum primis in faucibus.'
    },
    {
      number: '03',
      title: 'Implementation',
      description: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Mauris blandit aliquet elit eget tincidunt nibh pulvinar.'
    },
    {
      number: '04',
      title: 'Monitoring & Optimization',
      description: 'Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Proin eget tortor risus donec sollicitudin molestie.'
    }
  ];

  const services = [
    { name: 'Digital Marketing', active: true },
    { name: 'Web Development', active: false },
    { name: 'Brand Strategy', active: false },
    { name: 'Content Creation', active: false },
    { name: 'SEO Optimization', active: false }
  ];

  return (
    <div className="service-details-page">
      {/* Header */}
      <header id="header" className="header d-flex align-items-center sticky-top">
        <div className="container position-relative d-flex align-items-center justify-content-between">
          <a href="#hero" className="logo d-flex align-items-center me-auto me-xl-0">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-glow mr-3">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h1 className="sitename text-2xl font-bold text-gradient">LoanPro</h1>
          </a>

          <nav id="navmenu" className="navmenu">
            <ul>
              <li><a href="#hero">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services" className="active">Services</a></li>
              <li><a href="#portfolio">Portfolio</a></li>
              <li><a href="#team">Team</a></li>
              <li className="dropdown">
                <a href="#">
                  <span>More</span>
                  <i className="bi bi-chevron-down toggle-dropdown"></i>
                </a>
                <ul>
                  <li><a href="#testimonials">Testimonials</a></li>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#faq">FAQ</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </li>
            </ul>
            <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
          </nav>

          <div className="header-social-links">
            <a href="#" className="twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="linkedin">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Page Title */}
        <div className="page-title light-background">
          <div className="container d-lg-flex justify-content-between align-items-center">
            <h1 className="mb-2 mb-lg-0">Service Details</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Service Details</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Service Details Section */}
        <section id="service-details" className="service-details section">
          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="row gy-5">
              <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
                <div className="service-hero">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
                    alt="Digital Marketing Service"
                    className="img-fluid"
                  />
                  <div className="service-badge">
                    <span>Premium Service</span>
                  </div>
                </div>

                <div className="service-content">
                  <div className="service-header">
                    <h2>Loan Management & Digital Solutions</h2>
                    <p className="service-intro">
                      Our comprehensive loan management system combines cutting-edge technology with
                      user-centric design to provide seamless financial services. From application processing
                      to risk assessment and automated workflows, we deliver end-to-end solutions that
                      streamline the entire loan lifecycle.
                    </p>
                  </div>

                  <div className="service-features">
                    <h4>What You'll Get</h4>
                    <div className="row gy-3">
                      {serviceFeatures.map((feature, index) => (
                        <div key={index} className="col-md-6">
                          <div className="feature-item" data-aos="zoom-in" data-aos-delay={300 + index * 100}>
                            <div className="feature-icon">
                              <i className={`bi ${feature.icon}`}></i>
                            </div>
                            <div className="feature-content">
                              <h5>{feature.title}</h5>
                              <p>{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="service-process">
                    <h4>Our Process</h4>
                    <div className="process-steps">
                      {processSteps.map((step, index) => (
                        <div key={index} className="process-step" data-aos="fade-right" data-aos-delay={400 + index * 100}>
                          <div className="step-number">{step.number}</div>
                          <div className="step-content">
                            <h5>{step.title}</h5>
                            <p>{step.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="service-gallery" data-aos="fade-up" data-aos-delay="800">
                    <h4>Project Showcase</h4>
                    <div className="row gy-3">
                      <div className="col-md-4">
                        <img
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop"
                          alt="Project 1"
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-md-4">
                        <img
                          src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
                          alt="Project 2"
                          className="img-fluid rounded"
                        />
                      </div>
                      <div className="col-md-4">
                        <img
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
                          alt="Project 3"
                          className="img-fluid rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4" data-aos="fade-up" data-aos-delay="400">
                <div className="service-sidebar">
                  <div className="service-menu">
                    <h4>Our Services</h4>
                    <div className="menu-list">
                      {services.map((service, index) => (
                        <a
                          key={index}
                          href="#"
                          className={`menu-item ${service.active ? 'active' : ''}`}
                          data-aos="fade-left"
                          data-aos-delay={500 + index * 50}
                        >
                          <i className="bi bi-arrow-right"></i>
                          <span>{service.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="service-info">
                    <h4>Service Details</h4>
                    <div className="info-list">
                      <div className="info-item">
                        <span className="info-label">Duration:</span>
                        <span className="info-value">3-6 months</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Team Size:</span>
                        <span className="info-value">4-6 specialists</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Delivery:</span>
                        <span className="info-value">Bi-weekly reports</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Support:</span>
                        <span className="info-value">24/7 monitoring</span>
                      </div>
                    </div>
                  </div>

                  <div className="contact-card">
                    <div className="contact-content">
                      <h4>Need Help?</h4>
                      <p>
                        Ready to transform your loan management process? Our team of experts
                        is here to help you implement the perfect solution for your needs.
                      </p>
                      <div className="contact-info">
                        <div className="contact-item">
                          <i className="bi bi-telephone"></i>
                          <span>+260 211 123456</span>
                        </div>
                        <div className="contact-item">
                          <i className="bi bi-envelope"></i>
                          <span>info@loanpro.com</span>
                        </div>
                      </div>
                      <a href="#" className="btn btn-primary">Get Quote</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer" className="footer light-background">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-geo-alt icon"></i>
              <div className="address">
                <h4>Address</h4>
                <p>Lusaka, Zambia</p>
                <p>Central Business District</p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-telephone icon"></i>
              <div>
                <h4>Contact</h4>
                <p>
                  <strong>Phone:</strong> <span>+260 211 123456</span><br />
                  <strong>Email:</strong> <span>info@loanpro.com</span><br />
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 d-flex">
              <i className="bi bi-clock icon"></i>
              <div>
                <h4>Support Hours</h4>
                <p>
                  <strong>Mon-Fri:</strong> <span>8AM - 6PM</span><br />
                  <strong>Sat-Sun:</strong> <span>9AM - 4PM</span>
                </p>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4>Follow Us</h4>
              <div className="social-links d-flex">
                <a href="#" className="twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="#" className="facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="linkedin">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="container copyright text-center mt-4">
          <p>
            © <span>Copyright</span> <strong className="px-1 sitename">LoanPro</strong>{' '}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits">
            Designed with ❤️ for Financial Excellence
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