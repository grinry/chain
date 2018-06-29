import container from './container';
import args from './arguments';
import HttpServer from './server/http';

if (args.hasOwnProperty('http-server')) {
  const httpPort = args['http-port'] || 8080;
  const http = new HttpServer(httpPort);
  http.init();
}

console.log('Running!');
