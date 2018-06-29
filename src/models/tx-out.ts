export class TxOut {
  public address: string;
  public amount: number;
  public contractData: string;

  constructor(address: string, amount: number, contractData?: string) {
    this.address = address;
    this.amount = amount;
    this.contractData = contractData;
  }
}
