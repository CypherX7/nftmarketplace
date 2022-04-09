import React, { useContext, useEffect } from 'react';
import { BrowserRouter , Route , Routes } from 'react-router-dom';
import web3 from './connection/web3';
import Navbar from './components/Layout/Navbar';
import Main from './components/Content/Main';
import Web3Context from './store/web3-context';
import CollectionContext from './store/collection-context';
import MarketplaceContext from './store/marketplace-context'
import NFTCollection from './abis/NFTCollection.json';
import NFTMarketplace from './abis/NFTMarketplace.json';
import Footer from './components/Layout/Footer';
import Discover from './Views/Discover';
import Mint from './Views/Mint';
const App = () => {
    const web3Ctx = useContext(Web3Context);
    const collectionCtx = useContext(CollectionContext);
    const marketplaceCtx = useContext(MarketplaceContext);

    useEffect(() => {
        window.mobileAndTabletCheck = function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };

        // Check if the user has Metamask active
        if ((window.mobileAndTabletCheck()) === false){
            if(!web3) {
                window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
                return;
            }
        }

        // Function to fetch all the blockchain data
        const loadBlockchainData = async() => {
            if ((window.mobileAndTabletCheck()) === false) {
                try {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                } catch(error) {
                    console.error(error);
                }

                // Load account
                const account = await web3Ctx.loadAccount(web3);

                // Load Network ID
                const networkId = await web3Ctx.loadNetworkId(web3);

                // Load Contracts
                const nftDeployedNetwork = NFTCollection.networks[networkId];
                const nftContract = collectionCtx.loadContract(web3, NFTCollection, nftDeployedNetwork);

                const mktDeployedNetwork = NFTMarketplace.networks[networkId];
                const mktContract = marketplaceCtx.loadContract(web3, NFTMarketplace, mktDeployedNetwork);

                if(nftContract) {
                    // Load total Supply
                    const totalSupply = await collectionCtx.loadTotalSupply(nftContract);

                    // Load Collection
                    collectionCtx.loadCollection(nftContract, totalSupply);

                    // Event subscription
                    nftContract.events.Transfer()
                        .on('data', (event) => {
                            collectionCtx.updateCollection(nftContract, event.returnValues.tokenId, event.returnValues.to);
                            collectionCtx.setNftIsLoading(false);
                        })
                        .on('error', (error) => {
                            console.log(error);
                        });

                } else {
                    window.alert('NFTCollection contract not deployed to detected network.')
                }

                if(mktContract) {
                    // Load offer count
                    const offerCount = await marketplaceCtx.loadOfferCount(mktContract);

                    // Load offers
                    marketplaceCtx.loadOffers(mktContract, offerCount);

                    // Load User Funds
                    account && marketplaceCtx.loadUserFunds(mktContract, account);

                    // Event OfferFilled subscription
                    mktContract.events.OfferFilled()
                        .on('data', (event) => {
                            marketplaceCtx.updateOffer(event.returnValues.offerId);
                            collectionCtx.updateOwner(event.returnValues.id, event.returnValues.newOwner);
                            marketplaceCtx.setMktIsLoading(false);
                        })
                        .on('error', (error) => {
                            console.log(error);
                        });

                    // Event Offer subscription
                    mktContract.events.Offer()
                        .on('data', (event) => {
                            marketplaceCtx.addOffer(event.returnValues);
                            marketplaceCtx.setMktIsLoading(false);
                        })
                        .on('error', (error) => {
                            console.log(error);
                        });

                    // Event offerCancelled subscription
                    mktContract.events.OfferCancelled()
                        .on('data', (event) => {
                            marketplaceCtx.updateOffer(event.returnValues.offerId);
                            collectionCtx.updateOwner(event.returnValues.id, event.returnValues.owner);
                            marketplaceCtx.setMktIsLoading(false);
                        })
                        .on('error', (error) => {
                            console.log(error);
                        });

                } else {
                    window.alert('NFTMarketplace contract not deployed to detected network.')
                }

                collectionCtx.setNftIsLoading(false);
                marketplaceCtx.setMktIsLoading(false);

                // Metamask Event Subscription - Account changed
                window.ethereum.on('accountsChanged', (accounts) => {
                    web3Ctx.loadAccount(web3);
                    accounts[0] && marketplaceCtx.loadUserFunds(mktContract, accounts[0]);
                });

                // Metamask Event Subscription - Network changed
                window.ethereum.on('chainChanged', (chainId) => {
                    window.location.reload();
                });
            } 
        };

        loadBlockchainData();
    }, []);

const showNavbar = web3 && collectionCtx.contract && marketplaceCtx.contract;
const showContent = web3 && collectionCtx.contract && marketplaceCtx.contract && web3Ctx.account;

return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<React.Fragment>{showNavbar && <Navbar />}{<Main />}<Footer /></React.Fragment>} />
            <Route exact path="discover" element={<Discover />} />
            <Route exact path="mint" element={<Mint />} />
        </Routes>
    </BrowserRouter>
);
};

export default App;
