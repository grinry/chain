import { WalletRepository } from "./repositories/wallet.repository";
import { Container } from "container-ioc";


const container = new Container();
container.register([
  { token: WalletRepository, useClass: WalletRepository },
]);

export default container;
