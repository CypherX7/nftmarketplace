import Navbar from "../components/Layout/Navbar";
import MintForm from "../components/Content/MintNFT/MintForm";
import Footer from "../components/Layout/Footer";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const Mint = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb namePage="Create NFT" />
      <MintForm />
      <Footer />
    </>
  );
};
export default Mint;
