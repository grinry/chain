import { Block } from '../models/block';
import { Transaction } from '../models/transaction';
import { TxIn } from '../models/tx-in';
import { TxOut } from '../models/tx-out';

const genesisTx: Transaction = new Transaction(
  'e655f6a5f26dc9b4cac6e46f52336428287759cf81ef5ff10854f69d68f43fa3',
  [new TxIn(null, 0, null)],
  [new TxOut('04bfd', 50)]
);
let blockchain: Block = new Block(
  0,
  '0x0',
  '',
  1456,
  [genesisTx],
  0,
  0
);
