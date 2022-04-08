import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Web3Context from "../../../store/web3-context";
import CollectionContext from "../../../store/collection-context";


const ipfsClient = require("ipfs-http-client");
const ipfs = ipfsClient.create({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
});

const MintForm = () => {
    let navigate = useNavigate();
    const [enteredName, setEnteredName] = useState("");
    const [descriptionIsValid, setDescriptionIsValid] = useState(true);

    const [enteredDescription, setEnteredDescription] = useState("");
    const [nameIsValid, setNameIsValid] = useState(true);

    const [capturedFileBuffer, setCapturedFileBuffer] = useState(null);
    const [fileIsValid, setFileIsValid] = useState(true);

    const web3Ctx = useContext(Web3Context);
    const collectionCtx = useContext(CollectionContext);

    const enteredNameHandler = (event) => {
        setEnteredName(event.target.value);
    };

    const enteredDescriptionHandler = (event) => {
        setEnteredDescription(event.target.value);
    };

    const captureFile = (event) => {
        event.preventDefault();

        const file = event.target.files[0];

        const reader = new window.FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
            setCapturedFileBuffer(Buffer(reader.result));
        };
    };

    const submissionHandler = (event) => {
        event.preventDefault();

        enteredName ? setNameIsValid(true) : setNameIsValid(false);
        enteredDescription
            ? setDescriptionIsValid(true)
            : setDescriptionIsValid(false);
        capturedFileBuffer ? setFileIsValid(true) : setFileIsValid(false);

        const formIsValid = enteredName && enteredDescription && capturedFileBuffer;

        // Upload file to IPFS and push to the blockchain
        const mintNFT = async () => {
            // Add file to the IPFS
            const fileAdded = await ipfs.add(capturedFileBuffer);
            if (!fileAdded) {
                console.error("Something went wrong when updloading the file");
                return;
            }

            const metadata = {
                title: "Asset Metadata",
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: enteredName,
                    },
                    description: {
                        type: "string",
                        description: enteredDescription,
                    },
                    image: {
                        type: "string",
                        description: fileAdded.path,
                    },
                },
            };

            const metadataAdded = await ipfs.add(JSON.stringify(metadata));
            if (!metadataAdded) {
                console.error("Something went wrong when updloading the file");
                return;
            }

            collectionCtx.contract.methods
                .safeMint(metadataAdded.path)
                .send({ from: web3Ctx.account })
                .on("transactionHash", (hash) => {
                    collectionCtx.setNftIsLoading(true);
                })
                .on("error", (e) => {
                    window.alert("Something went wrong when pushing to the blockchain");
                    collectionCtx.setNftIsLoading(false);
                });
            setTimeout(() => {
                navigate("/discover");
            },20000);
        };

        formIsValid && mintNFT();
    };

    const nameClass = nameIsValid ? "form-control" : "form-control is-invalid";
    const descriptionClass = descriptionIsValid
        ? "form-control"
        : "form-control is-invalid";
    const fileClass = fileIsValid ? "form-control" : "form-control is-invalid";

    return (
        <section className="formsection py-5">
            <div className="container">
                <form onSubmit={submissionHandler}>
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-6 formcontai p-5 rounded">
                            <div className="row justify-content-center">
                                <h2 class="dream-dots justify-content-center">
                                    <span>Create Item</span>
                                </h2>
                                <div className="col-12 mb-4">
                                    <p className="w-text">Upload Item File</p>
                                    <div className="group-file">
                                        <p className="g-text">
                                            PNG, GIF, WEBP, MP4 or MP3. Max 100mb
                                        </p>
                                        <br />
                                        <input
                                            type="file"
                                            className={`${fileClass} mb-1`}
                                            onChange={captureFile}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mb-4">
                                    <div class="group">
                                        <input
                                            type="text"
                                            className={`${nameClass} mb-1`}
                                            placeholder="Name..."
                                            value={enteredName}
                                            onChange={enteredNameHandler}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 mb-4">
                                    <div class="group">
                                        <input
                                            type="text"
                                            className={`${descriptionClass} mb-1`}
                                            placeholder="Description..."
                                            value={enteredDescription}
                                            onChange={enteredDescriptionHandler}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 text-center">
                                    <button
                                        type="submit"
                                        className="btn btn-lg btn-info text-white btn-block more-btn"
                                    >
                                        MINT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default MintForm;
