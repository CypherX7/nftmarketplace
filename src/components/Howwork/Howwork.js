import Animi from "../../assets/img/benft.webp";

const Howwork = () => {
  return (
    <section className="howworsec py-5">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-12 col-md-3 text-center">
            <div class="pricing-item text-center">
              <div class="wraper">
                <img src={Animi} className="img-fluid" />
                <button type="button" class="btn btn-explore more-btn mt-4 mb-3">
                  Explore More
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div class="text-center">
              <div class="section-heading text-center">
                <div class="dream-dots justify-content-center">
                  <span>How Does It Work?</span>
                </div>
                <h2 className="mb-3">Why Buy Burn & Earn NFTs?</h2>
              </div>
              <p className="m-0 mb-3">
                Meet the Burn & Earn NFT Art Character (Ordinary Jack). This
                (Ordinary Jack) is Known for BURNING & EARNING their crypto!
                (Ordinary Jack) is the only species of their kind and is excited
                to meet their new owners. This NFT gives you access to VIP
                community-level status! No other Coin Being exists on Earth
                right now!
              </p>
              <p className="m-0 mb-3">
                Burn & Earn io has found a way to help Coin & Token holders grow
                their main portfolios by supporting the Burn & Earn NFT Art
                Series! New Burn & Earn NFT Art Series will be released every 90
                days!
              </p>
              <p className="m-0 mb-3 text-decoration-underline">
                1000 Burn & Earn NFTs will sell Presale for $125 in Polygon.
              </p>
              <p className="m-0 mb-3 text-decoration-underline">
                9000 Burn & Earn NFTs will sell Public sales for $150 in
                Polygon.
              </p>
              <p className="m-0 mb-3 text-decoration-underline">
                70% of ALL sales will be BURNED!
              </p>
              <p className="m-0 mb-3 text-decoration-underline">
                10,000 NFT Art Release for Series #1
              </p>
              <p className="m-0 mb-3">
                A Burn & Earn NFT purchase helps BURN the total supply of a Coin
                or Token that is voted on by the Burn & Earn NFT community. You
                will only be able to Vote if your wallet is holding a Burn &
                Earn NFT.
              </p>
              <p className="m-0 mb-3">
                1 Time every month during the Burn & Earn AMA the Burn & Earn
                Team will BURN 70% of the total sales made by the NFTs sold
                during the release.
              </p>
              <p className="m-0 mb-3">
                When all 10,000 NFTs sell, 1 Million Dollars+ worth of a Coin or
                Token will be sent to a BURN wallet of that specific chain of
                the Coin/Token.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-3 text-center">
            <div class="pricing-item text-center">
              <div class="wraper">
                <img src={Animi} className="img-fluid" />
                <button type="button" class="btn btn-explore more-btn mt-4 mb-3">
                  Explore More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Howwork;
