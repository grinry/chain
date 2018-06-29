export default class Wallet {
  address: string;
  constructor() {

  }

  toJSON() {
    return {
      address: this.address,
    };
  }
}
