class TxIn {
    public txOutId: string;
    public txOutIndex: number;
    public signature: string;
}

class TxOut {
    public address: string;
    public amount: number;
    public contractData: string;

    constructor(address: string, amount: number, contractData: string) {
        this.address = address;
        this.amount = amount;
        this.contractData = contractData;
    }
}

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public timestamp: number;
    public data: Transaction[];
    public difficulty: number;
    public nonce: number;

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        timestamp: number,
        data: Transaction[],
        difficulty: number,
        nonce: number
    ) {
        this.index = index;
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.data = data;
        this.hash = hash;
        this.difficulty = difficulty;
        this.nonce = nonce;
    }
}

class Transaction {
    public id: string;

    public txIns: TxIn[];
    public txOuts: TxOut[];
    public contractData: string;
}
