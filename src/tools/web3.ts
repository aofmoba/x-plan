import store from '@/store'
import contracts from '@/tools/contracts'
const Web3 = (window as any).Web3
const Moralis = (window as any).Moralis

const login = async () => {
    const ethereum = (window as any).ethereum
    console.log(ethereum);
    if (!ethereum) {
        alert('not dapp')
        alert('install MetaMask！')
    }
    return ethereum.request({ method: 'eth_requestAccounts' })
}

const getAccounts = async () => {
    const web3 = new Web3((window as any).ethereum)
    const res = await web3.eth.getAccounts()
    console.log(`---------->:getAccounts`, res)
    return res;
}

const getBalance = async (id: string) => {
    const { abi, address }  = (contracts as any)['nft']
    const web3 = new Web3((window as any).ethereum)
    const contract = new web3.eth.Contract(abi, address)
    let res = await contract.methods.batchBalanceOf(id).call();
    return res;
}

export default {
    login,
    getBalance,
}
