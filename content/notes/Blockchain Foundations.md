A blockchain is a ledger of facts, replicated across several computers assembled in a peer-to-peer network. Facts can be anything from monetary transactions to content signature. Members of the network are anonymous individuals called nodes.

All communication inside the network takes advantage of cryptography to securely identify the sender and the receiver. When a node wants to add a fact to the ledger, a consensus forms in the network to determine where this fact should appear in the ledger; this consensus is called a block.

### Blockchain technology
- [Ethereum](https://ethereum.org/en/) protocol adding turing complete code execution and speed improvements
- [æternity](https://aeternity.com) protocol alternative to Ethereum
- [Web3](https://web3.foundation/about/) technologies to make the web more decentralized, verifiable and secure. Goals:
    - trustless infrastructure
    - removing intermediaries
    - giving users power and ownership over their data, identity, security and transactions
   	Focus now shifts from building core technology products to building sustainable products. Somethings are more difficult or not possible like communication to users via email and receiving the first tokens to use an app is hard (only via exchange).
- [polkadot](https://polkadot.network/about/) connect blockchains together

### Use-cases 
- Decentralized cloud storage https://storj.io and S3 interface https://tardigrade.io https://filecoin.io
    - Messaging based on IPFS https://www.textile.io https://berty.tech
    - Vercel alternative http://fleek.co	
- Distributed Finance: 
    - Peer to peer loans https://smartcredit.io https://www.assetify.net https://blockfi.com
    - Investments https://genervest.org 
    - Global payments https://ripple.com
    - Credit worthiness https://protocol.utu.io
    - Real estate https://www.meridio.co
- Data and hardware management https://homeport.network
- Voting
- Food supply chain tracking https://www.simsupplychain.com
    - https://www.plus.nl/info-herkomst-bananen
    - https://t2f.io/ah/egg/
- Shipping and tracking of packages
- Health care records 
- Decentralized social networks https://akasha.world https://superhero.com/faq
- Crowed funding https://www.crowdholding.com/
    - Software to build distributed platforms (investment, marketplace etc) https://ampnet.io
- Event ticketing https://abendpayments.com https://guts.tickets
- Music streaming https://audius.co

### Questions
- Where are tokens stored? In a block?
- When mining blocks, why do you get tokens for finding a valid block? Where do they come from?
- Tokens vs coins? Extrinsic tokens are a stake or other external value while coins are intrinsic value because they are scarce. You can buy tokens with coins but you can't buy coins with tokens. You can create your own  tokens e.g. on Etherum, but not more coins.

### Proof of Work
Mining blocks by changing the nounce of a block until it's hash is below a "difficulty" hash. E.g. `hash(block + nounce) < 00010000`. 
The more computing power a miner has, the more likely they are to find a valid block. Downsides: 
- Bad for the environment and high transaction fees because lots of energy is used for computation
- Slow transaction speed because mining a new block needs lots of computation time   

### Proof of Stake
Forging blocks by providing stake (currency). Forgers are rewarded for their stake, if  a block includes a fraudulent transaction, they loose stake. 
- Lower transaction costs (no compute)
Problems:
- Small stakeholders won't get the opportunity to create a block

It's possible to be come a stakeholder (called validator in Ethereum 2.0) and earn on the rewards.
- https://stake.fish/en/ethereum/

### Proof of importance
?

### Source
- [Wikipedia](https://en.wikipedia.org/wiki/Blockchain)
- [Coursera course](https://www.coursera.org/learn/blockchain-foundations-and-use-cases/lecture/W6TLG/lesson-2-the-brief-brief-history-of-blockchain)
- [Smart contracts with æternity](https://dacade.org/ae-dev-101/introduction)
- [Video What Exactly is Web 3.0? Juan Benet](https://www.youtube.com/watch?v=l44z35vabvA)
- [Video Opening Keynote with Juan Benet](https://youtu.be/4tt7QBT__lk?t=329)
- [Web3 Growth Handbook](https://s3-us-west-1.amazonaws.com/simpleid.xyz/Web3GrowthHandbook.pdf)


#published 