import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Web3Context from "../../store/web3-context";
import MarketplaceContext from "../../store/marketplace-context";
import web3 from "../../connection/web3";
import { formatPrice } from "../../helpers/utils";
import logo from "../../img/logo.png";

const Navbar = () => {
  const [fundsLoading, setFundsLoading] = useState(false);

  const web3Ctx = useContext(Web3Context);
  const marketplaceCtx = useContext(MarketplaceContext);

  const connectWalletHandler = async () => {
    try {
      // Request account access
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.error(error);
    }

    // Load accounts
    web3Ctx.loadAccount(web3);
  };

  const claimFundsHandler = () => {
    marketplaceCtx.contract.methods
      .claimFunds()
      .send({ from: web3Ctx.account })
      .on("transactionHash", (hash) => {
        setFundsLoading(true);
      })
      .on("error", (error) => {
        window.alert("Something went wrong when pushing to the blockchain");
        setFundsLoading(false);
      });
  };

  // Event ClaimFunds subscription
  marketplaceCtx.contract.events
    .ClaimFunds()
    .on("data", (event) => {
      marketplaceCtx.loadUserFunds(marketplaceCtx.contract, web3Ctx.account);
      setFundsLoading(false);
    })
    .on("error", (error) => {
      console.log(error);
    });

  let etherscanUrl;

  if (web3Ctx.networkId === 3) {
    etherscanUrl = "https://ropsten.etherscan.io";
  } else if (web3Ctx.networkId === 4) {
    etherscanUrl = "https://rinkeby.etherscan.io";
  } else if (web3Ctx.networkId === 5) {
    etherscanUrl = "https://goerli.etherscan.io";
  } else {
    etherscanUrl = "https://etherscan.io";
  }

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <nav
      className={
        scroll
          ? "navbar navbar-expand-lg navbar-white fixed-top shrink"
          : "navbar navbar-expand-lg navbar-white fixed-top"
      }
    >
      <div className="container">
        <a class="navbar-brand" href="#">
          <img src={logo} class="img-fluid" alt="" />
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav ms-auto text-white">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              Home
            </a>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/discover">
              Discover
            </Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link active" aria-current="page" to="/mint">
              Create Item
            </Link>
          </li>
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">
              MyNFT
            </a>
          </li>
          <li className="nav-item ms-3">
            {marketplaceCtx.userFunds > 0 && !fundsLoading && (
              <button
                type="button"
                className="btn btn-info login-btn"
                onClick={claimFundsHandler}
              >
                {`CLAIM ${formatPrice(marketplaceCtx.userFunds)} ETH`}
              </button>
            )}
            {fundsLoading && (
              <div class="d-flex justify-content-center text-info">
                <div class="spinner-border" role="status">
                  <span class="sr-only"></span>
                </div>
              </div>
            )}
          </li>
          <li className="nav-item">
            {web3Ctx.account && (
              <a
                className="nav-link small login-btn"
                href={`${etherscanUrl}/address/${web3Ctx.account}`}
                target="blank"
                rel="noopener noreferrer"
              >
                {(String(web3Ctx.account)).slice(0,4) + "..." + (String(web3Ctx.account)).slice(-3)}
              </a>
            )}
            {!web3Ctx.account && (
              <button
                type="button"
                className="btn btn-info login-btn"
                onClick={connectWalletHandler}
              >
                Connect your wallet
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
