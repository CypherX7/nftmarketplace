import React from "react";
import SlideOne from "../../assets/img/homeslider.jpg";

export default function Slider() {
  return (
    <section className="slider">
      <div
        id="carouselExampleSlidesOnly"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={SlideOne} className="d-block w-100" alt="..." />
            <div className="carousel-caption d-none d-md-block">
              <div className="container">
                <div className="row">
                  <div className="col-6 text-start">
                    <h3 class="special-head gradient-text mb-5">
                      All NFTs You need in One Marketplace
                    </h3>
                    <h2 className="mb-4">
                      The Best Place to Collect, <br /> Buy and Sell{" "}
                      <span className="gradient-t">Awesome NFTs</span>
                    </h2>
                    <p className="mb-4">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Eveniet dolorem blanditiis ad perferendis, labore delectus
                      dolor adipisicing elit sit amet, adipisicing elit. Eveniet
                      adipisicing elit.
                    </p>
                    <button
                      type="button"
                      className="btn btn-explore more-btn me-3"
                    >Explore More</button><button
                    type="button"
                    className="btn btn-explore more-btn"
                  >Collect NFT</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
