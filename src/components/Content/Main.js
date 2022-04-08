import { useContext } from "react";
import style from "../../components/Content/style.css";
// import MintForm from "./MintNFT/MintForm";
import NFTCollection from "./NFTCollection/NFTCollection";
import CollectionContext from "../../store/collection-context";
import MarketplaceContext from "../../store/marketplace-context";
import Spinner from "../Layout/Spinner";
import Slider from "../Slider/Slider";
import Howwork from "../Howwork/Howwork";
import Founders from "../Founders/Founders";
import { Link } from "react-router-dom";

const Main = () => {
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);

  return (
    <>
      <Slider />
      {!marketplaceCtx.mktIsLoading && <NFTCollection />}
      <div className="text-center mb-4">
        <Link
          to="/discover"
          type="button"
          class="btn btn-explore more-btn mt-4"
        >
          Explore More
        </Link>
      </div>
      {marketplaceCtx.mktIsLoading && <Spinner />}
      <Howwork />
      <Founders />
      {/* {!collectionCtx.nftIsLoading && <MintForm />} */}
      {collectionCtx.nftIsLoading && <Spinner />}
    </>
  );
};

export default Main;
