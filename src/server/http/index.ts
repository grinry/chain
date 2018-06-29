import * as Express from 'express';
import * as Http from 'http';

export default class HttpServer {

  constructor(
    private port: number
  ) {

  }

  public init(): void {

    let app = Express();

    let server = Http.createServer(app);

    server.listen(this.port, () => {
      console.log(`http server listening on *:${this.port}`);
    });

  }
}
