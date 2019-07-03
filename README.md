# etherlime-shape-chainLink
This project presents smart contract that uses Chainlink ecosystem (a decentralized oracle that can provide external data to smart contracts).
It contains Chainlinked contract that has the ability to send request to CoinMarketCap Professional API for the most recent price for the given coin on the given market. It also record the received data on the Blockchain. The project comes with scripts for local and test net deployment and tests. You can specify your preferences in the config.json file.
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
The options for deployment method are predefined in config.json file. It is now set to deploy on Ropsten testnet.

```
    npm run deploy
```

Remember that if you want to send requests from the newly deployed contract, you must first fulfill it with LINK token. Use Chainlink Faucet for Ropsten testnet: https://ropsten.chain.link/.

You have also the availability to verify you smart contract within the deployment. To to do it, just go to config.json file and set "deployAndVerify" property to `true`.


For local deployment change the network to "local" in config.json and run `npm run deployment` again. Don't forget to run the local ganache `etherlime ganache`.


# 4.Run tests
Etherlime Chainlink project includes tests.
```
    npm run test
```

The provided tests shows examples for local usage of the contract and examples with already deployd on Ropsten network and fulfilled with Link tokens in order to create requests.
