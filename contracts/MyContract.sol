pragma solidity ^0.4.24;

import "chainlink/contracts/ChainlinkClient.sol";

contract MyContract is ChainlinkClient {

    uint256 constant private oraclePayment = 1 * LINK;
    uint256 public currentPrice;

    constructor(address _link, address _oracle) public {
      setChainlinkToken(_link);
      setChainlinkOracle(_oracle);
    }


    function requestCoinMarketCapPrice (address _oracle, bytes32 _jobId, string _coin, string _market) public {
      Chainlink.Request memory req = buildChainlinkRequest(_jobId, this, this.fulfill.selector);
      req.add("sym", _coin);
      req.add("convert", _market);
      string[] memory path = new string[](5);
      path[0] = "data";
      path[1] = _coin;
      path[2] = "quote";
      path[3] = _market;
      path[4] = "price";
      req.addStringArray("copyPath", path);
      req.addInt("times", 100);
      sendChainlinkRequestTo(_oracle, req, oraclePayment);
    }

    
    function fulfill(bytes32 _requestId, uint256 _price) public recordChainlinkFulfillment(_requestId) {
      currentPrice = _price;
    }

}