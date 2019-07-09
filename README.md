# etherlime-shape-chainLink
This project presents smart contract that uses Chainlink ecosystem (a decentralized oracle that can provide external data to smart contracts).
It contains Chainlinked contract that has the ability to send request to CoinMarketCap Professional API for the most recent price for the given coin on the given market. It also record the received data on the Blockchain. The project comes with scripts for local and test net (Ropsten) deployment and tests.
Please follow the steps bellow:


# 1.Let's start
First you need to install Etherlime and to download the shape. In a new empty folder run the following commands:
```
    npm install -g etherlime
    etherlime shape chainLink
```

# 2.Compilation
The smart contract is written for version 0.4.24 of the Solidity compiler, so you need to specify the version within the compile command or to run the provided script: 

```
    npm run compile
```

# 3. Deployment
The project has two deployment files with relevant scripts for local and test net deployment.

#### Local deployment

With the command `npm run deployment` your smart contract will be deployed on your local Blockchain. Don't forget that you have to have built it in advance. Use `etherlime ganache`.


#### Test net deployment
The provided scripts for test net are set to deploy the smart contract on Ropsten and to verify it. To run it you must pass your secret key as a param within the following command:

```
    npm run deployRopsten 'yourPrivateKeyGoesHere'
```

Remember that if you want to send requests from the newly deployed contract, you must first fulfill it with LINK token. Use Chainlink Faucet for Ropsten testnet: https://ropsten.chain.link/.


# 4.Run tests
Etherlime Chainlink project includes tests.

```
    npm run test
```

The provided tests shows examples for local usage of the contract. Also is given an example with already deployed on Ropsten contract that is fulfilled with Link tokens in order to create requests. You must fill your private key in the example.
