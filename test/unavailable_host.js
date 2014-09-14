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
    this.timeout(5000);

    before(function(){
        var auth = {
            "key1": {
                "username": "username1",
                "password": "password1"
            },
            "key2": {
                "username": "username2",
                "password": "password2"
            },
            "privateKey": {
                "username": "username"
            },
            "privateKeyEncrypted": {
                "username": "username",
                "passphrase": "passphrase1"
            },
            "privateKeyCustom": {
                "username": "username",
                "passphrase": "passphrase1",
                "keyLocation": "/full/path/to/key"
            },
            "privateKeyCustomByFileName": {
                "username": "username",
                "passphrase": "passphrase2",
                "keyLocation": "filename-of-key"
            }
        };
        grunt.file.write(".ftppass", JSON.stringify(auth));
    })

    it('should fail nicely when host is unknown', function(done) {
        open_grunt(['sftp:deploy:wrong_host'],function(){
            done();
        })
    });
});

function open_grunt(args,cb){
    var stdout = "";
    var stderr = "";
    args.unshift("grunt");
    if( log_debug ){
        args.push("--debug");
    }
    if( log_verbose || log_stdout){
        args.push("--verbose");
        log.info('stdout', '', "");
        log.info('stdout', '', "");
        log.info('stdout', '', "node"+args.join(" "));
    }
    var grunt_process = require('child_process').spawn("node", args);
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