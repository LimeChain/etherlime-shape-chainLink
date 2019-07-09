const etherlime = require('etherlime-lib');
const MyContract = require('../build/MyContract.json');

const linkTokenRopstenAddress = '0x20fE562d797A42Dcb3399062AE9546cd06f63280';
const oracleRopstenAddress = '0xc99B3D447826532722E41bc36e644ba3479E4365';
const infuraApikey = 'ede61953adb34beeb5106a2c0c61f200';

const deploy = async (network, secret, etherscanApiKey) => {

	// this script will deploy and verify MyContract
	let deployer = new etherlime.InfuraPrivateKeyDeployer(secret, network, infuraApikey);
	deployer.setVerifierApiKey(etherscanApiKey);
	let contract = await deployer.deployAndVerify(MyContract, {}, linkTokenRopstenAddress, oracleRopstenAddress);

};


module.exports = {
	deploy
};