const PROTO_PATH = __dirname + '/proto/author.proto';

const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
  arrays: true
});

const authorProto = grpc.loadPackageDefinition(packageDefinition).authors;

const data = [{
  id: '1',
  name: 'Abdulaziz'
}]

function Get(_, callback) {
  callback(null, {author: data});
}

function start() {
  const server = new grpc.Server();
  server.addService(authorProto.ManageAuthors.service, {Get:Get});
  server.bindAsync('0.0.0.0:4000', grpc.ServerCredentials.createInsecure(), () => {
    console.log('server running on 4000')
    server.start()
  });
  
}
start();