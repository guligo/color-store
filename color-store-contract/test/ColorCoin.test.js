const ColorCoin = artifacts.require("ColorCoin");

contract('ColorCoin', (accounts) => {

  const [deployerAccount, account] = accounts;

  it('should return token URI of NFT', async () => {
    const colorCoinInstance = await ColorCoin.deployed();
    const tokenURI = await colorCoinInstance.tokenURI.call(0x9BB7D4);

    assert.equal(tokenURI.valueOf(), 'http://127.0.0.1:8080/meta/' + 0x9BB7D4);
  });

  it('should be possible for owner to mint new NFT', async () => {
    const colorCoinInstance = await ColorCoin.deployed();

    await colorCoinInstance.createColor(account, 0x00FF00);
    const amount = await colorCoinInstance.balanceOf.call(account);

    assert.equal(amount.valueOf(), 1);
  });

  it('should not be possible for non-owner to mint new NFT', async () => {
    const colorCoinInstance = await ColorCoin.deployed();

    try {
      await colorCoinInstance.createColor(account, 0x0000FF, {from: account});
    } catch (err) {
      assert.equal(err.reason, 'Ownable: caller is not the owner');
      return;
    }
    assert.fail('Expected an exception!');
  });

});
