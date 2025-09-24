import { BrowserProvider, Contract } from 'ethers'
import TodoAbi from '../contracts/Todo.json'
import addressJson from '../contracts/address.json'

export async function getProvider() {
  if (!window.ethereum) throw new Error('MetaMask not found')
  const provider = new BrowserProvider(window.ethereum)
  return provider
}

export async function getContract(signerOrProvider?: any) {
  const addr = (addressJson as any).address as string
  const abi = (TodoAbi as any).abi
  const provider = signerOrProvider ?? (await getProvider())
  const signer = 'getSigner' in provider ? await provider.getSigner() : undefined
  const used = signerOrProvider ? signerOrProvider : signer ?? provider
  return new Contract(addr, abi, used)
}
