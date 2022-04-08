import Navbar from "../components/Layout/Navbar";
import NFTCollection from "../components/Content/NFTCollection/NFTCollection";
import Footer from "../components/Layout/Footer";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";

const Discover = () => {
  return (
    <>
      <Navbar />
      <Breadcrumb namePage="Discover" title="Discover" />
      <NFTCollection />
      <Footer />
    </>
  );
};
export default Discover;
