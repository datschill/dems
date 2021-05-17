import {
    Contract,
    utils,
    getProvider,
} from '@/store/ethers/ethersConnect'
import MultiCallAbi from '@/config/abi/Multicall.json'

const Interface = utils.Interface

const maxCallMulticall = 1000

export const multicall = async (abi, calls) => {
    let addressMultical = '0x1Ee38d535d541c55C9dae27B12edf090C608E6Fb' // TODO : Put it elsewhere
    let provider = getProvider()
    let multicall = new Contract(addressMultical, MultiCallAbi, provider)
    const itf = new Interface(abi)

    const calldata = calls.map((call) => [call.address.toLowerCase(), itf.encodeFunctionData(call.name, call.params)])
    return multicall.aggregate(calldata)
    .then(resultMulticall => {
        const { returnData } = resultMulticall
        const res = returnData.map((call, i) => itf.decodeFunctionResult(calls[i].name, call)[0])
        return res
    })
}

export const multicallParallelChain = (abi, calls) => {
    let nbCalls = calls.length
    console.log('nbcalls :', nbCalls)
    if (nbCalls) {
        let nbMulticall = parseInt(nbCalls/maxCallMulticall)

        let nbLeftCalls = nbCalls%maxCallMulticall
        if (nbLeftCalls) {
            // Do one last call for leftover calls
            nbMulticall++
        }

        let multicallPromises = [...Array(nbMulticall)].map((v, indexMulticall) => {
            let indexStart = maxCallMulticall * indexMulticall
            let indexEnd = indexStart + maxCallMulticall
            let currentCalls = calls.slice(indexStart, indexEnd)
            return multicall(abi, currentCalls)
        })

        return Promise.all(multicallPromises)
        .then(results => {
            return results.reduce((acc, value) => {
                return acc.concat(value)
            }, [])
        })
    }
    return Promise.resolve([])
}

export const multicallChain = (abi, calls) => {
    let nbCalls = calls.length
    console.log('nbcalls :', nbCalls)
    if (nbCalls) {
        let nbMulticall = parseInt(nbCalls/maxCallMulticall)

        let nbLeftCalls = nbCalls%maxCallMulticall
        if (nbLeftCalls) {
            // Do one last call for leftover calls
            nbMulticall++
        }
    
        return [...Array(nbMulticall)].reduce((promiseChain, v, indexMulticall) => {
            let indexStart = maxCallMulticall * indexMulticall
            let indexEnd = indexStart + maxCallMulticall
            let currentCalls = calls.slice(indexStart, indexEnd)
            return promiseChain.then(allResults => {
                return multicall(abi, currentCalls)
                .then(result => {
                    return allResults.concat(result)
                })
            })
        }, Promise.resolve([]))
    }
    return Promise.resolve([])
}
