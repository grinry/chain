import Wallet from "../models/wallet";
import { Injectable } from "container-ioc";
import { Transaction } from '../models/transaction';
import { UnspentTxOut } from '../models/unspent-tx-out';
import { TxIn } from '../models/tx-in';
import * as _ from 'lodash';

@Injectable()
export class TransactionPoolRepository {
  private _pool: Array<Transaction> = [];

  public add(tx: Transaction, unspentTxOuts: Array<UnspentTxOut>): void {
    this._pool.push(tx);
  }

  public update(unspentTxOuts: Array<UnspentTxOut>): void {
    const invalidTxs = [];
    for (const tx of this._pool) {
      for (const txIn of tx.txIns) {
        if (!this.hasTxIn(txIn, unspentTxOuts)) {
          invalidTxs.push(tx);
          break;
        }
      }
    }
    if (invalidTxs.length > 0) {
      this._pool = _.without(this._pool, ...invalidTxs);
    }
  }

  public hasTxIn(txIn: TxIn, unspentTxOuts: Array<UnspentTxOut>): boolean {
    const foundTxIn = unspentTxOuts.find((uTxO: UnspentTxOut) => {
      return uTxO.txOutId === txIn.txOutId && uTxO.txOutIndex === txIn.txOutIndex;
    });
    return foundTxIn !== undefined;
  }

  private getTxPoolIns(pool: Array<Transaction>): Array<TxIn> {
    return _(pool).map(tx => tx.txIns).flatten().value();
  }

  private _isValidForPool(tx: Transaction, pool: Array<Transaction>): boolean {
    const txPoolIns = this.getTxPoolIns(pool);
    const containsTxIn = (txIns: Array<TxIn>, txIn: TxIn) => {
      return _.find(txPoolIns, txPoolIn => {
        return txIn.txOutIndex === txPoolIn.txOutIndex && txIn.txOutId === txPoolIn.txOutId;
      });
    };
    for (const txIn of tx.txIns) {
      if (containsTxIn(txPoolIns, txIn)) {
        return false;
      }
    }
    return true;
  }
}
