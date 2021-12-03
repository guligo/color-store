# Notes

## Commands

Before executing commands below, run `ifconfig` and get the network address of your machine.

1. Start Ganache node on `http://0.0.0.0:8545`

1. Build, test and deploy Solidity smart contracts project:<br />
`(cd color-store-contract && truffle test && truffle migrate --reset --network test)`

1. Build and run Spring Boot back-end project:<br />
`(cd color-store-be && mvn spring-boot:run)`

1. Build and run React front-end project (run in different shell):<br />
`(cd color-store-fe && npm start)`

## Useful Links

- ERC-721 Non-Fungible Token Standard:<br />
https://ethereum.org/en/developers/docs/standards/tokens/erc-721/

- Web3j: Interacting with a Node:<br />
https://docs.web3j.io/4.8.7/getting_started/interacting_with_node/

- Web3j: Filters and Events:<br />
http://docs.web3j.io/4.8.7/advanced/filters_and_events/

- React: Getting Started:<br />
https://reactjs.org/docs/getting-started.html

- Material-UI:<br />
https://mui.com/

- MetaMask Docs: Create A Simple Dapp:<br />
https://docs.metamask.io/guide/create-dapp.html

## To-Dos

- [x] Refactor `AboutDialog` into `ContractDialog` and use 2 instances of it for each of the contracts
- [x] Move color list retrieval logic into `AssetList`
- [x] Configure CORS globally
- [x] Refresh color-list in UI on any blockchain action
- [ ] Make IP adjustable for cases when address of the host changes
- [ ] Clean up project directory structure
- [ ] (Optional) Clean up MetaMask connection flow as it currently feels a bit "shaky"
- [ ] (Optional) Consider storing user information in local Postgres
- [ ] (Optional) Consider introducing tests for BE
- [x] (Optional) (Pre-)cache images
