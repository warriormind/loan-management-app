import React, { useEffect } from 'react';

export function PortfolioDetails() {
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

  return (
    <div className="portfolio-details-page">
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
              <li><a href="#hero" className="active">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#services">Services</a></li>
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
            <h1 className="mb-2 mb-lg-0">Portfolio Details</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">Portfolio Details</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Portfolio Details Section */}
        <section id="portfolio-details" className="portfolio-details section">
          <div className="container" data-aos="fade-up">
            <div className="row gy-4 g-lg-5">
              <div className="col-lg-6">
                <div className="portfolio-gallery">
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                    className="img-fluid mb-4"
                    alt="Portfolio item 1"
                    data-aos="zoom-in"
                    data-aos-delay="100"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                    className="img-fluid mb-4"
                    alt="Portfolio item 2"
                    data-aos="zoom-in"
                    data-aos-delay="200"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                    className="img-fluid mb-4"
                    alt="Portfolio item 3"
                    data-aos="zoom-in"
                    data-aos-delay="300"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                    className="img-fluid mb-4"
                    alt="Portfolio item 4"
                    data-aos="zoom-in"
                    data-aos-delay="400"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                    className="img-fluid mb-4"
                    alt="Portfolio item 5"
                    data-aos="zoom-in"
                    data-aos-delay="500"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                    className="img-fluid mb-4"
                    alt="Portfolio item 6"
                    data-aos="zoom-in"
                    data-aos-delay="600"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
                    className="img-fluid mb-4"
                    alt="Portfolio item 7"
                    data-aos="zoom-in"
                    data-aos-delay="700"
                  />
                </div>
              </div>

              <div className="col-lg-6">
                <div className="position-sticky" style={{ top: '40px' }}>
                  <div className="portfolio-description">
                    <h2 data-aos="fade-up">LoanPro Management System</h2>
                    <p data-aos="fade-up" data-aos-delay="100">
                      Our comprehensive loan management system provides end-to-end solutions for financial institutions.
                      Built with modern technology stack and user-centric design, it offers seamless loan processing,
                      risk assessment, and customer management capabilities.
                    </p>
                    <p data-aos="fade-up" data-aos-delay="200">
                      The system features advanced analytics, real-time reporting, and automated workflows that
                      streamline the entire loan lifecycle from application to disbursement. With robust security
                      measures and compliance features, it ensures data protection and regulatory adherence.
                    </p>

                    <div className="testimonial-item" data-aos="fade-up" data-aos-delay="300">
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        <span>
                          This loan management system has revolutionized our operations. The intuitive interface
                          and powerful features have significantly improved our efficiency and customer satisfaction.
                        </span>
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                      <div>
                        <img
                          src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face"
                          className="testimonial-img"
                          alt="Sarah Johnson"
                        />
                        <h3>Sarah Johnson</h3>
                        <h4>Chief Operations Officer</h4>
                      </div>
                    </div>

                    <p data-aos="fade-up" data-aos-delay="400">
                      Key features include automated credit scoring, document management, payment processing,
                      and comprehensive reporting tools. The system supports multiple loan types and integrates
                      seamlessly with existing banking infrastructure.
                    </p>

                    <p data-aos="fade-up" data-aos-delay="500">
                      With mobile-responsive design and cloud-based architecture, users can access the system
                      from anywhere, ensuring continuous productivity and real-time collaboration across teams.
                    </p>
                  </div>

                  <div className="portfolio-info mt-5" data-aos="fade-up" data-aos-delay="600">
                    <h3>Project Information</h3>
                    <ul>
                      <li><strong>Category</strong> Financial Technology</li>
                      <li><strong>Client</strong> Multiple Financial Institutions</li>
                      <li><strong>Project Date</strong> January 2024</li>
                      <li><strong>Technologies</strong> React, Node.js, PostgreSQL</li>
                      <li><strong>Status</strong> Live & Operational</li>
                      <li>
                        <a
                          href="#"
                          className="btn-visit align-self-start"
                          data-aos="zoom-in"
                          data-aos-delay="700"
                        >
                          View Live Demo
                        </a>
                      </li>
                    </ul>
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