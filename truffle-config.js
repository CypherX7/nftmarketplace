require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
//const privateKeys = process.env.PRIVATE_KEYS;
const mnemonicPhrase = process.env.MNEMONIC;
module.exports = {
    networks: {
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*" // Match any network id
        },
        matic: {
            provider: () => new HDWalletProvider({
                mnemonic: {
                    phrase: mnemonicPhrase
                },
                providerOrUrl: `wss://polygon-mumbai.g.alchemy.com/v2/${process.env.INFURA_API_KEY}`, 
                numberOfAddresses: 1,
                shareNonce: true,
                derivationPath: "m/44'/1'/0'/0/"
            }),
            network_id: 80001,
            //gas: 5500000,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        }
    },
    contracts_directory: './src/contracts/',
    contracts_build_directory: './src/abis/',
    compilers: {
        solc: {
            version: "^0.8.0",
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    }
}
