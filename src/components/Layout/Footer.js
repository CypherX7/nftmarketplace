import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="main-footer text-center">
        <div className="widgets-section padding-top-small padding-bottom-small">
          <div className="container">
            <div className="row clearfix d-flex justify-content-center">
              <div className="footer-column col-md-4 col-sm-6 col-xs-12">
                <div className="footer-widget about-widget">
                  <h3 className="has-line-center">About Us</h3>
                  <div className="widget-content">
                    <div className="text">
                      Burn & Earn is the first ecosystem to reward you for
                      burning
                    </div>
                    <ul class="social-links">
                      <li>
                        <a href="#" target="blank">
                          <span class="fa fa-facebook-f"></span>
                        </a>
                      </li>
                      <li>
                        <a href="https://twitter.com/burnandearnio" target="blank">
                          <span class="fa fa-twitter"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="blank">
                          <span class="fa fa-google-plus"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="blank">
                          <span class="fa fa-linkedin"></span>
                        </a>
                      </li>
                      <li>
                        <a href="#" target="blank">
                          <span class="fa fa-instagram"></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* <div className="footer-column col-md-4 col-sm-6 col-xs-12">
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
                      Don’t miss our future updates! Get Subscribed Today!
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
              </div> */}

            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="auto-container">
            <div className="copyright-text">
            ©2018-2022 Burn & Earn - All Rights Reserved. Created by <a href="https://infoversetech.com/" target="blank">www.infoversetech.com</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
