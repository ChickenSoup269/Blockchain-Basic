const hash = require("crypto-js/sha256")

// TODO: làm một cái blockchain lưu trữ dữ liệu
class Block {
  constructor(prevHash, data) {
    this.prevHash = prevHash
    this.data = data
    this.timeStamp = new Date()

    this.hash = this.calculateHash()
  }
  calculateHash() {
    return hash(
      this.prevHash + JSON.stringify(this.data) + this.timeStamp
    ).toString()
  }
}

// const block = new Block("", {
//   name: "Thiendeptrai",
// })

class Blockchain {
  constructor() {
    const genesisBlock = new Block("0000", {
      isGenesis: true,
    })
    this.chain = [genesisBlock]
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1]
  }

  addBlock(data) {
    const lastBlock = this.getLastBlock()
    const newBlock = new Block(lastBlock.hash, data)

    this.chain.push(newBlock)
  }

  // Kiểm tra xem dữ liệu có bị chuyển đổi không?
  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i]
      const prevBlock = this.chain[i - 1]

      if (currentBlock.hash != currentBlock.calculateHash()) {
        return false
      }

      if (currentBlock.prevHash != prevBlock.hash) {
        return false
      }
    }
    return true
  }
}

const thienChain = new Blockchain()
console.log(thienChain)

thienChain.addBlock({ from: "thien", to: "bank", amount: "1000000" })
thienChain.addBlock({ from: "thien", to: "steam", amount: "500000" })
thienChain.addBlock({ from: "thien", to: "ghedep", amount: "900000" })

console.log(thienChain.chain)
console.log("chain valid: ", thienChain.isValid())
