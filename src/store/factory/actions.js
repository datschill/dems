/* eslint-disable */
import {
  Contract,
  utils,
  getProvider,
} from '../ethers/ethersConnect'
import PancakeFactoryV2 from '@/config/abi/PancakeFactoryV2'
import erc20 from '@/config/abi/erc20'
import multicall from '@/utils/multicall'

export default {
  async subscribePairCreated(ctx) {
    let addressFactoryV2 = '0xca143ce32fe78f1f7019d7d551a6402fc5350c73' // TODO : Put elsewhere
    const factoryContract = new Contract(addressFactoryV2, PancakeFactoryV2, getProvider())

    let outputTokenAddress = [
      '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c', // WBNB
      '0x55d398326f99059ff775485246999027b3197955', // BUSD
      '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82' // CAKE
    ]

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
  }
}
