const etherlime = require('etherlime-lib');
const MyContract = require('../build/MyContract.json');
const LinkToken = require('../build/LinkToken.json');
const Oracle = require('../build/Oracle.json');
const ethers = require('ethers')
const chainHelper = require("chainlink-test-helpers");
const config = require('../config.json')

const ONE_ETH = '1000000000000000000'

describe('Example for local deployment and usage', () => {
    let aliceAccount = accounts[3];
    let deployer;
    let myContractInstance;
    let linkToken;
    let oracle;
    let request;

    before(async () => {
        deployer = new etherlime.EtherlimeGanacheDeployer(aliceAccount.secretKey);
        linkToken = await deployer.deploy(LinkToken)
        oracle = await deployer.deploy(Oracle, {}, linkToken.contractAddress)
        myContractInstance = await deployer.deploy(MyContract, {}, linkToken.contractAddress, oracle.contractAddress);
        let tx = await linkToken.transfer(myContractInstance.contractAddress, ONE_ETH)
        await linkToken.verboseWaitForTransaction(tx)
    });

    it('should send request to the market', async () => {
        let expectedEvent = 'ChainlinkRequested'
        let jobID = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('3fcbda4c30d94f9197fe75bd534f6543'));
		let coin = 'ETH'
		let market = 'USD'
        let tx = await myContractInstance.requestCoinMarketCapPrice(oracle.contractAddress, jobID, coin, market)
        let result = await myContractInstance.verboseWaitForTransaction(tx)
        request = chainHelper.decodeRunRequest(result.events[3])
        assert.equal(oracle.contractAddress, result.events[3].address)
        assert.equal(expectedEvent, result.events[0].event)
    })

    it('should receive value from request', async () => {
        let price = '50000'
        let priceToSend = ethers.utils.formatBytes32String(price)
        await chainHelper.fulfillOracleRequest(oracle, request, priceToSend, {gasLimit: 900000})
        let currentPrice = await myContractInstance.currentPrice()
        assert.equal(price, ethers.utils.parseBytes32String(currentPrice))
    })

});

describe('Example for Ropsten network usage with already deployed contract', () => {
   
    before(async () => {
        deployer = new etherlime.InfuraPrivateKeyDeployer(config.deployerPrivateKey, config.network, config.infuraApikey);
        myContractInstance = await deployer.wrapDeployedContract(MyContract, config.myContractRopstenAddress);
    });

    it('should send request to the market and receive actual ETH value in USD', async function () {
        this.timeout(5000)
        let jobID = ethers.utils.hexlify(ethers.utils.toUtf8Bytes('3fcbda4c30d94f9197fe75bd534f6543'));
		let coin = 'ETH'
		let market = 'USD'
        
        await myContractInstance.requestCoinMarketCapPrice(config.oracleRopstenAddress, jobID, coin, market);
        let currentPrice = await myContractInstance.currentPrice();
        
        assert(currentPrice.toNumber() > 0)
    })
})

