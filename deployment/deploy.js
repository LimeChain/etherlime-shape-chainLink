const etherlime = require('etherlime-lib');
const MyContract = require('../build/MyContract.json');
const LinkToken = require('../build/LinkToken.json');
const Oracle = require('../build/Oracle.json');
const config = require('../config.json');

const deploy = async (network, secret, etherscanApiKey) => {

	let deployer;
	let contract;
	let linkToken;
	let oracle;

	if (!config.deployAndVerify) {

		if (config.network === 'local') {

			deployer = new etherlime.EtherlimeGanacheDeployer();
			linkToken = await deployer.deploy(LinkToken);
			oracle = await deployer.deploy(Oracle, {}, linkToken.contractAddress);
			contract = await deployer.deploy(MyContract, {}, linkToken.contractAddress, oracle.contractAddress);
	
		} else {
			// example for deploying on Ropsten
			deployer = new etherlime.InfuraPrivateKeyDeployer(config.deployerPrivateKey, config.network, config.infuraApikey);
			contract = await deployer.deploy(MyContract, {}, config.linkTokenRopstenAddress, config.oracleRopstenAddress);
	
		}
		
	} else {
		// example for deploy (on Ropsten) and verify; To run it, change deployAndVerify in config.json ot "true"
		deployer = new etherlime.InfuraPrivateKeyDeployer(config.deployerPrivateKey, config.network, config.infuraApikey);
		deployer.setVerifierApiKey(config.etherscanApiKey);
		contract = await deployer.deployAndVerify(MyContract, {}, config.linkTokenRopstenAddress, config.oracleRopstenAddress);
	}

	

};


module.exports = {
	deploy
};