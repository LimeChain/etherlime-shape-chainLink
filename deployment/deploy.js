const etherlime = require('etherlime-lib');
const MyContract = require('../build/MyContract.json');
const LinkToken = require('../build/LinkToken.json');
const Oracle = require('../build/Oracle.json');

const deploy = async (network, secret, etherscanApiKey) => {

	let deployer = new etherlime.EtherlimeGanacheDeployer();
	let linkToken = await deployer.deploy(LinkToken);
	let oracle = await deployer.deploy(Oracle, {}, linkToken.contractAddress);
	let contract = await deployer.deploy(MyContract, {}, linkToken.contractAddress, oracle.contractAddress);

};


module.exports = {
	deploy
};