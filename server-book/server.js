const PROTO_PATH = __dirname + '/proto/book.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).books;

const data = [{
  id: '1',
  name: 'Book',
  author_id: '1'
}]

function Get(_, callback) {
  callback(null, {books: data});
}

function GetOne({request}, callback) {
  const oneBook = data.find(e => e.id === request.id)
  callback(null, oneBook);
}

function start() {
  const server = new grpc.Server();
  server.addService(bookProto.Books.service, {Get:Get, GetOne: GetOne});
  server.bindAsync('0.0.0.0:4001', grpc.ServerCredentials.createInsecure(), () => {
    console.log('server running on 4001')
    server.start()
  });
  
}
start();