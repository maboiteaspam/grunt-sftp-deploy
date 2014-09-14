module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        'sftp-deploy': {
            wrong_host: {
                auth: {
                    host: 'not-a-valid-server-address.whatever',
                    port: 22,
                    authKey: 'privateKey'
                },
                cache: 'sftpCache.json',
                src: 'test/fixture/src',
                dest: 'test/fixture/dest',
                exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
                serverSep: '/',
                concurrency: 4,
                progress: false
            },
            wrong_port: {
                auth: {
                    host: 'localhost',
                    port: 22222,
                    authKey: 'privateKey'
                },
                cache: 'sftpCache.json',
                src: 'test/fixture/src',
                dest: 'test/fixture/dest',
                exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
                serverSep: '/',
                concurrency: 4,
                progress: false
            },
            ok_host: {
                auth: {
                    host: 'localhost',
                    port: 22,
                    authKey: 'privateKey'
                },
                cache: 'sftpCache.json',
                src: 'test/fixture/src',
                dest: 'test/fixture/dest',
                exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
                serverSep: '/',
                concurrency: 4,
                progress: false
            }
        }
    });

    grunt.file.mkdir("test/fixture/src")
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
            "username": "travis"
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

    grunt.loadTasks('tasks');
};
