const TPFToken = artifacts.require("TPFToken");
const BN = web3.utils.BN;
function ether(n) {
  return web3.utils.toWei(new BN(n), "ether");
}
module.exports = async function(_deployer, network, accounts) {
  // Use deployer to state migration tasks.
  const admin = accounts[0];
  const name = "TopFlower";
  const symbol = "TPF";
  // 500 000 000 tokens
  const totalSupply = ether("500000000");     
  const tokenDeployer = await _deployer.deploy(TPFToken, name, symbol, totalSupply, admin);
  const token = await TPFToken.deployed();
  await token.mint(admin, totalSupply, { from: admin });
};
