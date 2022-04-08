import React from "react";
import { Link } from "react-router-dom";
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
                      Burn & Earn has found a way to help Coin & token holders
                      grow their main portfolio BURNING the total supply of a
                      Popular Coin or Token by dedicating 70% of every sale to
                      be burned. All NFT Owners will Vote on what popular coin
                      gets burned monthly.{" "}
                    </p>
                    <Link
                      to="/discover"
                      type="button"
                      className="btn btn-explore more-btn me-3"
                    >
                      Explore More
                    </Link>
                    <Link
                      to="/mint"
                      type="button"
                      className="btn btn-explore more-btn"
                    >
                      Create NFT
                    </Link>
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
