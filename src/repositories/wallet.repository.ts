import Wallet from "../models/wallet";
import { Injectable } from "container-ioc";

@Injectable()
export class WalletRepository {
    private wallets: {[socketId: string]: Wallet} = {};

    add(wallet: Wallet): void {
        this.wallets[wallet.address] = wallet;
    }

    getWalletByAddress(address: string): Wallet {
        return Object.values(this.wallets).filter((wallet: Wallet) => wallet.address === address)[0];
    }

    remove(wallet: Wallet): void {
        delete this.wallets[wallet.address];
    }
}
