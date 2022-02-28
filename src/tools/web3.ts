import store from '@/store'
import contracts from '@/tools/contracts'
const Web3 = (window as any).Web3 // 引用全局的web3 在index.html文件cdn引入<script src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"></script>
const Moralis = (window as any).Moralis // 引用全局的Moralis 在index.html文件cdn引入<script src="https://cdn.jsdelivr.net/npm/moralis@latest/dist/moralis.min.js"></script>

// 登录钱包
const login = async () => {
    const ethereum = (window as any).ethereum // 获取小狐狸实例
    console.log(ethereum);
    if (!ethereum) {
        alert('not dapp')
        alert('install MetaMask！')
    }
    return ethereum.request({ method: 'eth_requestAccounts' })
}

// 账户列表
const getAccounts = async () => {
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const res = await web3.eth.getAccounts()
    console.log(`---------->:getAccounts`, res)
    return res;
}

// 查询余额
const getBalance = async (id: string) => {
    const { abi, address }  = (contracts as any)['nft']
    const web3 = new Web3((window as any).ethereum) // 创建一个新的web3 对象
    const contract = new web3.eth.Contract(abi, address) // 创建合约
    let res = await contract.methods.batchBalanceOf(id).call();
    return res;
}

export default {
    login,
    getBalance,
}
