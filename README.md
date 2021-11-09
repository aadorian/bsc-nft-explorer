# BSC NFT Explorer

Explore NFTs and key NFT metrics on Binance Smart chain

### Live Demo: https://bsc-nft-explorer.vercel.app/

## Implementation

The app relies on:

- [Covalent](https://www.covalenthq.com/) for the latest blockchain data
- [Next.js](https://nextjs.org/) and [Chakra UI](https://chakra-ui.com/) for the frontend

## Lightning-fast performance

Usually web apps face a trade-off between slowly fetching the latest data (requests take time) or quickly displaying static data (which is out of date).

BSC NFT Explorer loads lightning fast statically-generated pages whilst continiously displaying the latest data. This is made possible by the one of the latest features on Next.js, Incremental Static Regeneration (ISR).
