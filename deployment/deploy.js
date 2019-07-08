const etherlime = require('etherlime-lib');
const MyContract = require('../build/MyContract.json');
const LinkToken = require('../build/LinkToken.json');
const Oracle = require('../build/Oracle.json');

const deploy = async (network, secret, etherscanApiKey) => {

	let deployer;
	let contract;
	let linkToken;
	let oracle;

		deployer = new etherlime.EtherlimeGanacheDeployer();
		linkToken = await deployer.deploy(LinkToken);
		oracle = await deployer.deploy(Oracle, {}, linkToken.contractAddress);
		contract = await deployer.deploy(MyContract, {}, linkToken.contractAddress, oracle.contractAddress);

};


module.exports = {
	deploy
};