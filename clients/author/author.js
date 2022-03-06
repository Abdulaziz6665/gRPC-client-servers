const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = __dirname + '/author.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  arrays: true
});

const authorProto = grpc.loadPackageDefinition(packageDefinition).authors;


const PORT = '0.0.0.0:40000'

const authorClient = new authorProto.ManageAuthors(PORT, grpc.credentials.createInsecure());

module.exports = authorClient;