'use strict';

var SshServer = require(__dirname+'/lib/ssh-server.js');
var should = require('should');
var grunt = require('grunt');
var log = require('npmlog');
console.log("dfdsfsdf");

console.log(SshServer);
var argv_str = process.argv.join(' ');
var log_stdout = argv_str.match("--stdout") || process.env["TEST_STDOUT"];
var log_verbose = argv_str.match("--verbose") || process.env["TEST_VERBOSE"];
var log_debug = argv_str.match("--debug") || process.env["TEST_DEBUG"];


grunt.options('verbose',log_verbose);
grunt.options('debug',log_debug);
grunt.loadNpmTasks('../tasks/');

describe('grunt-sftp-deploy, test suite', function () {

  var server = null;
  var server_options = {
    port:3658,
    authUser:'$ecretb@ckdoor',
    authPassword:'nsa',
    hostRsaKeyFile : __dirname + '/keys/host_rsa',
    hostDsaKeyFile : __dirname + '/keys/host_dsa',
    publicKeyFile : __dirname + '/keys/id_rsa.pub'
  };

  this.slow(2500);
  this.timeout(5000);

  before(function(done){

    log.level = log_verbose||log_debug||log_stdout?"info":"silent";
    log.info('stdout', '', "");

    server = new SshServer(server_options);
    server.start(done);
  });
  after(function(done){
    if( server ) server.stop(done);
    else done();
  });


  it('should transfer files', function(done) {

    var client_root = __dirname + '/client';
    var server_root = __dirname + '/server';

    grunt.file.delete( client_root );
    grunt.file.delete( server_root );

    grunt.file.mkdir( client_root );
    grunt.file.mkdir( server_root );

    grunt.file.write(client_root+"/hello.txt","Hello the world !");

    grunt.initConfig({
      'sftp-deploy': {
        test: {
          auth: {
            host: 'localhost',
            port: server_options.port,
            authKey: server_options.publicKeyFile
          },
          src: client_root,
          dest: server_root,
          exclusions: [],
          server_sep: '/'
        }
      }
    });
    grunt.tasks(["sftp-deploy:test"], null, function(){
      grunt.file.exists(client_root+"/hello.txt").should.be.true;
      done();
    });

  });
});
