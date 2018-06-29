import { TxIn } from './tx-in';
import { TxOut } from './tx-out';

export class Transaction {
  public id: string;

  public txIns: Array<TxIn>;
  public txOuts: Array<TxOut>;
  public contractData?: string;

  constructor(id: string, txIns: Array<TxIn>, txOuts: Array<TxOut>, contractData?: string) {
    this.id = id;
    this.txIns = txIns;
    this.txOuts = txOuts;
    this.contractData = contractData;
  }
}
