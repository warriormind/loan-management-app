import React, { useEffect } from 'react';

interface StarterPageProps {
  title?: string;
  description?: string;
  content?: React.ReactNode;
  sectionTitle?: string;
  sectionDescription?: string;
}

export function StarterPage({
  title = "Starter Page",
  description = "Use this page as a starter for your own custom pages.",
  content,
  sectionTitle = "Starter Section",
  sectionDescription = "Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit"
}: StarterPageProps) {
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
    <div className="starter-page-page">
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
            <h1 className="mb-2 mb-lg-0">{title}</h1>
            <nav className="breadcrumbs">
              <ol>
                <li><a href="/">Home</a></li>
                <li className="current">{title}</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Starter Section */}
        <section id="starter-section" className="starter-section section">
          {/* Section Title */}
          <div className="container section-title" data-aos="fade-up">
            <span className="description-title">{sectionTitle}</span>
            <h2>{sectionTitle}</h2>
            <p>{sectionDescription}</p>
          </div>

          <div className="container" data-aos="fade-up" data-aos-delay="100">
            <div className="content-wrapper">
              {content ? (
                content
              ) : (
                <div className="default-content">
                  <p>{description}</p>

                  {/* Example content sections */}
                  <div className="row mt-5 gy-4">
                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-lightbulb text-white fs-5"></i>
                            </div>
                            <h5 className="card-title mb-0">Getting Started</h5>
                          </div>
                          <p className="card-text text-muted">
                            This is a starter page template that you can customize for your specific needs.
                            Add your content, images, and functionality as required.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-success rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-gear text-white fs-5"></i>
                            </div>
                            <h5 className="card-title mb-0">Customization</h5>
                          </div>
                          <p className="card-text text-muted">
                            Easily customize this template by passing different props for title, description,
                            and content. The layout adapts to your specific requirements.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-info rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-code-slash text-white fs-5"></i>
                            </div>
                            <h5 className="card-title mb-0">Development Ready</h5>
                          </div>
                          <p className="card-text text-muted">
                            Built with modern React and TypeScript, this component is fully typed and
                            ready for production use with proper error handling and performance optimization.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
                      <div className="card h-100 border-0 shadow-sm">
                        <div className="card-body p-4">
                          <div className="d-flex align-items-center mb-3">
                            <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center me-3" style={{width: '50px', height: '50px'}}>
                              <i className="bi bi-lightning text-white fs-5"></i>
                            </div>
                            <h5 className="card-title mb-0">Performance Optimized</h5>
                          </div>
                          <p className="card-text text-muted">
                            Optimized for performance with lazy loading, efficient animations, and
                            responsive design that works seamlessly across all devices and screen sizes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="text-center mt-5" data-aos="fade-up" data-aos-delay="600">
                    <div className="bg-gradient-primary p-5 rounded-3 shadow">
                      <h3 className="text-white mb-3">Ready to Get Started?</h3>
                      <p className="text-white-50 mb-4">
                        Customize this starter page to create amazing experiences for your users.
                      </p>
                      <button className="btn btn-light btn-lg px-4 py-2">
                        <i className="bi bi-rocket-takeoff me-2"></i>
                        Start Building
                      </button>
                    </div>
                  </div>
                </div>
              )}
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