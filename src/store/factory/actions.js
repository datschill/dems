/* eslint-disable */
import {
  Contract,
  utils,
  getProvider,
} from '../ethers/ethersConnect'
import PancakeFactoryV2 from '@/config/abi/PancakeFactoryV2'
import erc20 from '@/config/abi/erc20'
import PancakePair from '@/config/abi/PancakePair'
import { multicall, multicallChain, multicallParallelChain } from '@/utils/multicall'

const addressFactoryV2 = '0xca143ce32fe78f1f7019d7d551a6402fc5350c73' // TODO : Put elsewhere
const outputTokenAddress = [
  '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
  '0x55d398326f99059ff775485246999027b3197955', // BUSD
  '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' // CAKE
]
const maxCallMulticall = 1000

function fetchPairs() {
  const factoryContract = new Contract(addressFactoryV2, PancakeFactoryV2, getProvider())
  return factoryContract.allPairsLength()
  .then(allPairsLength => {
    let nbPairs = parseInt(allPairsLength.toLocaleString())
    console.log('nbPairs ', nbPairs)

    nbPairs = 5000

    let calls = [...Array(nbPairs)].map((x, index) => {
      return {
        address: addressFactoryV2,
        name: 'allPairs',
        params: [index]
      }
    })

    return multicallParallelChain(PancakeFactoryV2, calls)
    // return multicallChain(PancakeFactoryV2, calls)
    .then(pairsAddress => {
      console.log('pairsAddress', pairsAddress.length)
      return pairsAddress
    })
  })
}

function fetchPairsDetails(pairsAddress) {
  console.log('pairsAddress:', pairsAddress.length)

  let calls = pairsAddress.reduce((acc, address, index) => {
    let t0 = {
      address,
      name: 'token0'
    }
    let t1 = {
      address,
      name: 'token1'
    }
    acc.push(t0)
    acc.push(t1)
    return acc
  }, [])

  return multicallChain(PancakePair, calls)
  .then(tokensAddress => {
    console.log('tokensAddress', tokensAddress.length)
    // Create pair object
    let pairs = pairsAddress.map((address, index) => {
      let indexT0 = index * 2
      let indexT1 = index * 2 + 1
      let token0 = tokensAddress[indexT0].toLowerCase()
      let token1 = tokensAddress[indexT1].toLowerCase()
      if (outputTokenAddress.includes(token0)) {
        let outputAddress = token0
        token0 = token1
        token1 = outputAddress
      }
      return {
        pair: address.toLowerCase(),
        token0,
        token1,
        time: Date.now() - (5 * 60 * 1000)
      }
    })
    return pairs
  })
}

function fetchTokensDetails(tokensAddress) {
  let calls = tokensAddress.reduce((acc, address) => {
    let symbol = {
      address: address,
      name: 'symbol',
    }
    let name = {
      address: address,
      name: 'name',
    }
    let decimals = {
      address: address,
      name: 'decimals',
    }
    acc.push(symbol)
    acc.push(name)
    acc.push(decimals)
    return acc
  }, [])
  return multicallChain(erc20, calls)
}

export default {
  async subscribePairCreated(ctx) {
    const factoryContract = new Contract(addressFactoryV2, PancakeFactoryV2, getProvider())
    console.log('subscribePairCreated', factoryContract)
    factoryContract.on('PairCreated', (token0, token1, pair, noname) => {
      let token0Address = token0.toLowerCase()
      let token1Address = token1.toLowerCase()
      if (outputTokenAddress.includes(token0Address)) {
        let outputAddress = token0Address
        token0Address = token1Address
        token1Address = outputAddress
      }
      let tokensPair = {
        token0: token0Address,
        token1: token1Address,
        pair,
        time: Date.now()
      }

      let calls = [
        {
          address: token0Address,
          name: 'symbol',
        },
        {
          address: token0Address,
          name: 'name',
        },
        {
          address: token0Address,
          name: 'decimals',
        },
        {
          address: token1Address,
          name: 'symbol',
        },
        {
          address: token1Address,
          name: 'name',
        },
        {
          address: token1Address,
          name: 'decimals',
        }
      ]

      multicall(erc20, calls)
      .then(data => {
        const [ symbolToken0, nameToken0, decimalsToken0, symbolToken1, nameToken1, decimalsToken1 ] = data
        let t0 = {
          address: token0Address,
          symbol: symbolToken0,
          name: nameToken0,
          decimals: decimalsToken0
        }
        let t1 = {
          address: token1Address,
          symbol: symbolToken1,
          name: nameToken1,
          decimals: decimalsToken1
        }
        // Update token (create if necessary)
        ctx.commit('updateToken', t0)
        ctx.commit('updateToken', t1)
        // Add pair
        ctx.commit('addPair', tokensPair)
      })
      
      console.log('Pair Created')
      console.log('#token0 :', token0)
      console.log('#token1 :', token1)
      console.log('#pair :', pair)
      console.log('#noname :', noname)
    })
  },
  async retrieveAllPairs(ctx) {
    fetchPairs()
    .then(fetchPairsDetails)
    .then(pairs => {
      let tokensAddress = []
      pairs.forEach(pair => {
        if (!tokensAddress.includes(pair.token0)) {
          tokensAddress.push(pair.token0)
        }
        if (!tokensAddress.includes(pair.token1)) {
          tokensAddress.push(pair.token1)
        }
      })
      fetchTokensDetails(tokensAddress)
      .then(tokensDetails => {
        console.log('tokensDetails', tokensDetails.length)
        let tokens = tokensAddress.map((address, index) => {
          let indexSymbol = index * 3
          let indexName = index * 3 + 1
          let indexDecimals = index * 3 + 2
          return {
            address: address,
            symbol: tokensDetails[indexSymbol],
            name: tokensDetails[indexName],
            decimals: tokensDetails[indexDecimals]
          }
        })
        
        tokens.forEach(token => {
          ctx.commit('updateToken', token)
        })

        pairs.forEach(pair => {
          ctx.commit('addPair', pair)
        })
      })
    })
  }
}
