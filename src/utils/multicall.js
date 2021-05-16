import {
    Contract,
    utils,
    getProvider,
} from '@/store/ethers/ethersConnect'
import MultiCallAbi from '@/config/abi/Multicall.json'

const Interface = utils.Interface

const multicall = async (abi, calls) => {
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

export default multicall
