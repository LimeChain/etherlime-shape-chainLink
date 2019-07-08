const etherlime = require('etherlime-lib');
const MyContract = require('../build/MyContract.json');
const config = require('../config.json');

const deploy = async (network, secret, etherscanApiKey) => {

	let deployer;
	let contract;

	if (!config.deployAndVerify) {
		// example for deploying on Ropsten
		deployer = new etherlime.InfuraPrivateKeyDeployer(config.deployerPrivateKey, config.network, config.infuraApikey);
		contract = await deployer.deploy(MyContract, {}, config.linkTokenRopstenAddress, config.oracleRopstenAddress);
		
	} else {
		// example for deploy (on Ropsten) and verify; To run it, change deployAndVerify in config.json to "true"
		deployer = new etherlime.InfuraPrivateKeyDeployer(config.deployerPrivateKey, config.network, config.infuraApikey);
		deployer.setVerifierApiKey(config.etherscanApiKey);
		contract = await deployer.deployAndVerify(MyContract, {}, config.linkTokenRopstenAddress, config.oracleRopstenAddress);
	}

};


module.exports = {
	deploy
};