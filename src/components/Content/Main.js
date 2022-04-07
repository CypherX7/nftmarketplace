import { useContext } from "react";
import style from "../../components/Content/style.css";
import MintForm from "./MintNFT/MintForm";
import NFTCollection from "./NFTCollection/NFTCollection";
import CollectionContext from "../../store/collection-context";
import MarketplaceContext from "../../store/marketplace-context";
import Spinner from "../Layout/Spinner";
import Slider from "../Slider/Slider";

const Main = () => {
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);

  return (
    <>
      <Slider />
      {!marketplaceCtx.mktIsLoading && <NFTCollection />}
      {marketplaceCtx.mktIsLoading && <Spinner />}
      {!collectionCtx.nftIsLoading && <MintForm />}
      {collectionCtx.nftIsLoading && <Spinner />}
    </>
  );
};

export default Main;
