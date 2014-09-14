'use strict';

var should = require('should');
var grunt = require('grunt');
var log = require('npmlog');

var argv_str = process.argv.join(' ');
var log_stdout = argv_str.match("--stdout") || process.env["TEST_STDOUT"];
var log_verbose = argv_str.match("--verbose") || process.env["TEST_VERBOSE"];
var log_debug = argv_str.match("--debug") || process.env["TEST_DEBUG"];

describe('grunt-sftp-deploy nicely fails to unavailable hosts', function () {

    this.slow(2500);
    this.timeout(5000);
    var Gruntfile = require("../Gruntfile.js");

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
        Gruntfile(grunt);
    })

    it('should fail nicely when host is unknown', function(done) {
        grunt.task.registerTask('done',function(){
            console.log("helloddd...")
        });
        grunt.task.run('sftp-deploy:wrong_host','done');
        console.log("hello...")
    });
});
