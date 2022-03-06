const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/book.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  arrays: true
});

const bookProto = grpc.loadPackageDefinition(packageDefinition).books;

const PORT = '0.0.0.0:4001'

const bookClient = new bookProto.Books(PORT, grpc.credentials.createInsecure());

module.exports = bookClient;