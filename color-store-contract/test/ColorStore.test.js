const ColorStore = artifacts.require("ColorStore");
const ColorCoin = artifacts.require("ColorCoin");

contract('ColorStore', (accounts) => {

  const [deployerAccount, account] = accounts;

  it('should be possible to buy NFT', async () => {
    const colorStoreInstance = await ColorStore.deployed();
    const colorCoinInstance = await ColorCoin.deployed();

    const initAmountOwnedByStore = await colorCoinInstance.balanceOf.call(ColorStore.address);
    await colorStoreInstance.buyToken(0x9BB7D4, {value: 100000000000, from: account});
    const currAmountOwnedByStore = await colorCoinInstance.balanceOf.call(ColorStore.address);
    const currAmountOwnedByAccount = await colorCoinInstance.balanceOf.call(account);

    assert.equal(initAmountOwnedByStore - currAmountOwnedByStore, 1);
    assert.equal(currAmountOwnedByAccount, 1);
  });

  it('should not be possible to buy NFT by sending the amount which is less than the rate', async () => {
    const colorStoreInstance = await ColorStore.deployed();
    try {
      await colorStoreInstance.buyToken(0xC74375, {value: 10000000000, from: account});
    } catch (err) {
      assert.equal(err.reason, 'Not enough funds provided to buy a token');
      return;
    }
    assert.fail('Expected an exception!');
  });

  it('should be possible to sell NFT', async () => {
    const colorStoreInstance = await ColorStore.deployed();
    const colorCoinInstance = await ColorCoin.deployed();

    const initAmountOwnedByStore = await colorCoinInstance.balanceOf.call(ColorStore.address);
    await colorCoinInstance.setApprovalForAll(ColorStore.address, true, {from: account});
    await colorStoreInstance.sellToken(0x9BB7D4, {from: account});
    const currAmountOwnedByStore = await colorCoinInstance.balanceOf.call(ColorStore.address);
    const currAmountOwnedByAccount = await colorCoinInstance.balanceOf.call(account);

    assert.equal(currAmountOwnedByStore - initAmountOwnedByStore, 1);
    assert.equal(currAmountOwnedByAccount, 0);
  });

  it('should not be possible to buy random NFT if contract owns no coins', async () => {
    const colorStoreInstance = await ColorStore.deployed();
    const colorCoinInstance = await ColorCoin.deployed();

    const initAmountOwnedByStore = await colorCoinInstance.balanceOf.call(ColorStore.address);
    for (var i = 1; i <= initAmountOwnedByStore; i++) {
        await colorStoreInstance.sendTransaction({from: account, to: ColorStore.address, value: 100000000000});
    }
    const currAmountOwnedByStore = await colorCoinInstance.balanceOf.call(ColorStore.address);
    const currAmountOwnedByAccount = await colorCoinInstance.balanceOf.call(account);

    assert.equal(currAmountOwnedByStore, 0);
    assert.equal(currAmountOwnedByAccount.toNumber(), initAmountOwnedByStore.toNumber());

    try {
      await colorStoreInstance.sendTransaction({from: account, to: ColorStore.address, value: 100000000000});
    } catch (err) {
      assert.equal(err.reason, 'No tokens owned by this contract');
      return;
    }
    assert.fail('Expected an exception!');
  });

});
