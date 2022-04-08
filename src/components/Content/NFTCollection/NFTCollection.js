import { useContext, useRef, createRef } from "react";
import web3 from "../../../connection/web3";
import Web3Context from "../../../store/web3-context";
import CollectionContext from "../../../store/collection-context";
import MarketplaceContext from "../../../store/marketplace-context";
import { formatPrice } from "../../../helpers/utils";
import plooygon from "../../../assets/img/plooygon.png";
import eth from "../../../assets/img/eth.png";

const NFTCollection = () => {
  const web3Ctx = useContext(Web3Context);
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);

  const priceRefs = useRef([]);
  if (priceRefs.current.length !== collectionCtx.collection.length) {
    priceRefs.current = Array(collectionCtx.collection.length)
      .fill()
      .map((_, i) => priceRefs.current[i] || createRef());
  }

  const makeOfferHandler = (event, id, key) => {
    event.preventDefault();

    const enteredPrice = web3.utils.toWei(
      priceRefs.current[key].current.value,
      "ether"
    );

    collectionCtx.contract.methods
      .approve(marketplaceCtx.contract.options.address, id)
      .send({ from: web3Ctx.account })
      .on("transactionHash", (hash) => {
        marketplaceCtx.setMktIsLoading(true);
      })
      .on("receipt", (receipt) => {
        marketplaceCtx.contract.methods
          .makeOffer(id, enteredPrice)
          .send({ from: web3Ctx.account })
          .on("error", (error) => {
            window.alert("Something went wrong when pushing to the blockchain");
            marketplaceCtx.setMktIsLoading(false);
          });
      });
  };

  const buyHandler = (event) => {
    const buyIndex = parseInt(event.target.value);
    marketplaceCtx.contract.methods
      .fillOffer(marketplaceCtx.offers[buyIndex].offerId)
      .send({
        from: web3Ctx.account,
        value: marketplaceCtx.offers[buyIndex].price,
      })
      .on("transactionHash", (hash) => {
        marketplaceCtx.setMktIsLoading(true);
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
        marketplaceCtx.setMktIsLoading(false);
      });
  };

  const cancelHandler = (event) => {
    const cancelIndex = parseInt(event.target.value);
    marketplaceCtx.contract.methods
      .cancelOffer(marketplaceCtx.offers[cancelIndex].offerId)
      .send({ from: web3Ctx.account })
      .on("transactionHash", (hash) => {
        marketplaceCtx.setMktIsLoading(true);
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
        marketplaceCtx.setMktIsLoading(false);
      });
  };

  return (
    <section className="nftcard-sec pt-5">
      <div class="container">
        <div className="row py-5">
          <div class="col-12 section-heading text-center">
            <div class="dream-dots justify-content-center">
              <span>Our Top Collections</span>
            </div>
            <h2>Discover, collect, and sell extraordinary NFTs</h2>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          {collectionCtx.collection.map((NFT, key) => {
            const index = marketplaceCtx.offers
              ? marketplaceCtx.offers.findIndex((offer) => offer.id === NFT.id)
              : -1;
            const owner =
              index === -1 ? NFT.owner : marketplaceCtx.offers[index].user;
            const price =
              index !== -1
                ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2)
                : null;

            return (
              <div key={key} className="col-3 mb-3 service_single_content">
                <div class="pricing-item text-center">
                  <div class="wraper">
                    <div className="card collection-item mb-0">
                      <img
                        src={`https://ipfs.infura.io/ipfs/${NFT.img}`}
                        className="card-img-top"
                        alt={`NFT ${key}`}
                      />
                      <div className={"card-body collection_info"}>
                        <h6 className="card-title text-start mb-3">
                          {NFT.title}
                        </h6>
                        <p className="fw-light fs-6 text-start mb-4">{`${owner.substr(
                          0,
                          7
                        )}...${owner.substr(owner.length - 7)}`}</p>
                        {index !== -1 ? (
                          owner !== web3Ctx.account ? (
                            <div className="d-flex justify-content-between align-items-center">
                              <div className="">
                                <button
                                  onClick={buyHandler}
                                  value={index}
                                  className="btn btn-success more-btn"
                                >
                                  BUY
                                </button>
                              </div>
                              <div className="d-flex justify-content-start">
                                <img
                                  src={plooygon}
                                  width="25"
                                  height="25"
                                  className="align-center float-start rounded me-2"
                                  alt="price icon"
                                ></img>
                                <p className="text-start m-0">
                                  <b>{`${price}`}</b>
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="row">
                              <div className="d-grid gap-2 col-5 mx-auto">
                                <button
                                  onClick={cancelHandler}
                                  value={index}
                                  className="btn btn-danger"
                                >
                                  CANCEL
                                </button>
                              </div>
                              <div className="col-7 d-flex justify-content-end">
                                <img
                                  src={eth}
                                  width="25"
                                  height="25"
                                  className="align-center float-start"
                                  alt="price icon"
                                ></img>
                                <p className="text-start">
                                  <b>{`${price}`}</b>
                                </p>
                              </div>
                            </div>
                          )
                        ) : owner === web3Ctx.account ? (
                          <form
                            className="row g-2"
                            onSubmit={(e) => makeOfferHandler(e, NFT.id, key)}
                          >
                            <div className="col-5 d-grid gap-2">
                              <button
                                type="submit"
                                className="btn btn-secondary more-btn"
                              >
                                OFFER
                              </button>
                            </div>
                            <div className="col-7">
                              <input
                                type="number"
                                step="0.01"
                                placeholder="ETH..."
                                className="form-control"
                                ref={priceRefs.current[key]}
                              />
                            </div>
                          </form>
                        ) : (
                          <p>
                            <br />
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NFTCollection;
