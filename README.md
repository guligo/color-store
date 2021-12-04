# Color Store

## About

Color Store is a market place for buying, selling and exchanging NFTs that represent different colors. This repo consists
of front-end in React, back-end in Spring Boot, and Solidity smart contracts. Requires MetaMask wallet to interact with it.

This is just a playground project with purpose of learning about smart contract development.

## Dev Notes

### Commands

Before launching the project, run `ifconfig` and get the network address of the host in the local network. It
is important in case MetaMask browser / wallet is used, for example, from mobile phone to access the user interface. In
case user interface and MetaMask will always be accessed from the local machine, use `127.0.0.1`. Adjust IP in following
configuration files:

- _./color-store-be/src/main/java/application.yaml_

- _./color-store-contract/.env_

- _./color-store-fe/.env_

In order to run the project:

1. Start [Ganache](https://trufflesuite.com/ganache/) node on `http://0.0.0.0:8545`

1. Build, test and deploy Solidity smart contracts project:<br />
```
(cd color-store-contract \
    && truffle test \
    && truffle migrate --reset --network test \
    && cp build/contracts/* ../color-store-fe/src/contracts)
```

1. Build and run Spring Boot back-end project:<br />
`(cd color-store-be && mvn spring-boot:run)`

1. Build and run React front-end project (run in different shell):<br />
`(cd color-store-fe && npm start)`

### Useful Links

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
