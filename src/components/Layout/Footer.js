import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="main-footer text-center">
        <div className="widgets-section padding-top-small padding-bottom-small">
          <div className="container">
            <div className="row clearfix">
              <div className="footer-column col-md-4 col-sm-6 col-xs-12">
                <div className="footer-widget about-widget">
                  <h3 className="has-line-center">About Us</h3>
                  <div className="widget-content">
                    <div className="text">
                      At the end of the day, going forward, a new normal that
                      has evolved generation X is on the runway heading towards
                      a streamlined cloud solution.
                    </div>
                    <ul class="social-links">
                      <li>
                        <a href="#">
                          <span class="fa fa-facebook-f"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span class="fa fa-twitter"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span class="fa fa-google-plus"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span class="fa fa-linkedin"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span class="fa fa-instagram"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="footer-column col-md-4 col-sm-6 col-xs-12">
                <div className="footer-widget contact-widget">
                  <h3 className="has-line-center">Contact Us</h3>
                  <div className="widget-content">
                    <ul class="contact-info">
                      <li>
                        <div class="icon">
                          <span class="flaticon-support"></span>
                        </div>
                      </li>
                      <li>10, Mc Donald Avenue, Sunset Park, Newyork</li>
                      <li>(+2) 01223072359</li>
                      <li>mohmadgamal1000@gmail.com</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="footer-column col-md-4 col-sm-12 col-xs-12">
                <div className="footer-widget newsletter-widget">
                  <h3 className="has-line-center">Newsletter</h3>
                  <div className="widget-content">
                    <div className="text">
                      Stay Updated with our latest news. We promise not to spam
                    </div>
                    <div className="newsletter-form">
                      <form method="post">
                        <div className="form-group">
                          <input
                            type="email"
                            name="field-name"
                            value=""
                            placeholder="Your Email"
                            required=""
                          />
                          <button type="submit" className="send-btn">
                            <span className="fa fa-paper-plane-o"></span>
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="copyright-text">
              Copyright ©. Converted to react.js by Mohmad Gamal
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
