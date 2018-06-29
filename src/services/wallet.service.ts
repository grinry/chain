import { ec } from 'elliptic';
import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import * as _ from 'lodash';
import Wallet from '../models/wallet';
import { Injectable } from 'container-ioc';

// noinspection JSPotentiallyInvalidConstructorUsage
const EC = new ec('secp256k1');
const privateKeyLocation = process.env.PRIVATE_KEY || 'node/wallet/private_key';

@Injectable()
export class WalletService {
  public getPrivateFromWallet(): string {
    const buffer = readFileSync(privateKeyLocation, 'utf8');
    return buffer.toString();
  }

  public getPublicFromWallet(): string {
    const privateKey = this.getPrivateFromWallet();
    const key = EC.keyFromPrivate(privateKey, 'hex');
    return key.getPublic().encode('hex');
  }

  public generatePrivateKey(): string {
    const keyPair = EC.genKeyPair();
    const privateKey = keyPair.getPrivate();
    return privateKey.toString(16);
  }

  public initWallet(): void {
    // let's not override existing private keys
    if (existsSync(privateKeyLocation)) {
      return;
    }
    const newPrivateKey = this.generatePrivateKey();

    writeFileSync(privateKeyLocation, newPrivateKey);
    console.log('new wallet with private key created to : %s', privateKeyLocation);
  }

  public deleteWallet(): void {
    if (existsSync(privateKeyLocation)) {
      unlinkSync(privateKeyLocation);
    }
  }

  public getBalance(address: string, unspentTxOuts: Array<any>): number {
    return _(this.findUnspentTxOuts(address, unspentTxOuts))
      .map((uTx0) => uTx0.amount)
      .sum();
  }

  public findUnspentTxOuts(ownerAddress: string, unspentTxOuts: Array<any>): Array<any> {
    return _.filter(unspentTxOuts, (uTx0) => uTx0.address === ownerAddress);
  }

}


// const findTxOutsForAmount = (amount: number, myUnspentTxOuts: UnspentTxOut[]) => {
//   let currentAmount = 0;
//   const includedUnspentTxOuts = [];
//   for (const myUnspentTxOut of myUnspentTxOuts) {
//     includedUnspentTxOuts.push(myUnspentTxOut);
//     currentAmount = currentAmount + myUnspentTxOut.amount;
//     if (currentAmount >= amount) {
//       const leftOverAmount = currentAmount - amount;
//       return {includedUnspentTxOuts, leftOverAmount};
//     }
//   }
//
//   const eMsg = 'Cannot create transaction from the available unspent transaction outputs.' +
//     ' Required amount:' + amount + '. Available unspentTxOuts:' + JSON.stringify(myUnspentTxOuts);
//   throw Error(eMsg);
// };
//
// const createTxOuts = (receiverAddress: string, myAddress: string, amount, leftOverAmount: number) => {
//   const txOut1: TxOut = new TxOut(receiverAddress, amount);
//   if (leftOverAmount === 0) {
//     return [txOut1];
//   } else {
//     const leftOverTx = new TxOut(myAddress, leftOverAmount);
//     return [txOut1, leftOverTx];
//   }
// };
//
// const filterTxPoolTxs = (unspentTxOuts: UnspentTxOut[], transactionPool: Transaction[]): UnspentTxOut[] => {
//   const txIns: TxIn[] = _(transactionPool)
//     .map((tx: Transaction) => tx.txIns)
//     .flatten()
//     .value();
//   const removable: UnspentTxOut[] = [];
//   for (const unspentTxOut of unspentTxOuts) {
//     const txIn = _.find(txIns, (aTxIn: TxIn) => {
//       return aTxIn.txOutIndex === unspentTxOut.txOutIndex && aTxIn.txOutId === unspentTxOut.txOutId;
//     });
//
//     if (txIn === undefined) {
//
//     } else {
//       removable.push(unspentTxOut);
//     }
//   }
//
//   return _.without(unspentTxOuts, ...removable);
// };
//
// const createTransaction = (receiverAddress: string, amount: number, privateKey: string,
//                            unspentTxOuts: UnspentTxOut[], txPool: Transaction[]): Transaction => {
//
//   console.log('txPool: %s', JSON.stringify(txPool));
//   const myAddress: string = getPublicKey(privateKey);
//   const myUnspentTxOutsA = unspentTxOuts.filter((uTxO: UnspentTxOut) => uTxO.address === myAddress);
//
//   const myUnspentTxOuts = filterTxPoolTxs(myUnspentTxOutsA, txPool);
//
//   // filter from unspentOutputs such inputs that are referenced in pool
//   const {includedUnspentTxOuts, leftOverAmount} = findTxOutsForAmount(amount, myUnspentTxOuts);
//
//   const toUnsignedTxIn = (unspentTxOut: UnspentTxOut) => {
//     const txIn: TxIn = new TxIn();
//     txIn.txOutId = unspentTxOut.txOutId;
//     txIn.txOutIndex = unspentTxOut.txOutIndex;
//     return txIn;
//   };
//
//   const unsignedTxIns: TxIn[] = includedUnspentTxOuts.map(toUnsignedTxIn);
//
//   const tx: Transaction = new Transaction();
//   tx.txIns = unsignedTxIns;
//   tx.txOuts = createTxOuts(receiverAddress, myAddress, amount, leftOverAmount);
//   tx.id = getTransactionId(tx);
//
//   tx.txIns = tx.txIns.map((txIn: TxIn, index: number) => {
//     txIn.signature = signTxIn(tx, index, privateKey, unspentTxOuts);
//     return txIn;
//   });
//
//   return tx;
// };
//
// export {createTransaction, getPublicFromWallet,
//   getPrivateFromWallet, getBalance, generatePrivateKey, initWallet, deleteWallet, findUnspentTxOuts};