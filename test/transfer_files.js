'use strict';

var should = require('should');
var grunt = require('grunt');
var log = require('npmlog');

var argv_str = process.argv.join(' ');
var log_stdout = argv_str.match("--stdout") || process.env["TEST_STDOUT"];
var log_verbose = argv_str.match("--verbose") || process.env["TEST_VERBOSE"];
var log_debug = argv_str.match("--debug") || process.env["TEST_DEBUG"];

log_verbose = true;

describe('grunt-sftp-deploy nicely fails to unavailable hosts', function () {

    this.slow(2500);
    this.timeout(10000);

    before(function(){
        grunt.file.mkdir("test/fixture/src");
        var c =0;
        for(var i=0;i<10000;i++)c+="test1";
        grunt.file.write("test/fixture/src/test1",c)
    });

    after(function(){
        grunt.file.delete("test/fixture/src")
        grunt.file.delete("test/fixture/dest")
        grunt.file.delete("sftpCache.json")
    });

    it('should transfer files correctly with private key', function(done) {
        open_grunt(['sftp-deploy:ok_transfer_privateKey'],function(code,stdout,stderr){
            stdout.should.match(/Connection :: connect/);
            done();
        })
    });

});

function open_grunt(args,cb){
    var stdout = "";
    var stderr = "";
    if( log_debug ){
        args.push("--debug");
    }
    if( log_verbose || log_stdout){
        args.push("--verbose");
        log.info('stdout', '', "");
        log.info('stdout', '', "");
        log.info('stdout', '', ""+args.join(" "));
    }
    var grunt_process = require('child_process').spawn("grunt", args);
    grunt_process.stdout.on('data', function (data) {
        log.info('stdout', '', data.toString().trim());
        stdout+=data.toString();
    });
    grunt_process.stderr.on('data', function (data) {
        log.info('stderr', '', data.toString().trim());
        stderr+=data.toString();
    });
    grunt_process.on('exit', function (code) {
        if(cb) cb(code,stdout,stderr);
    });
    return grunt_process;
}