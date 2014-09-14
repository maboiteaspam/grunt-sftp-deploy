module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        // Configuration to be run (and then tested).
        debug:true,
        'sftp-deploy': {
            wrong_host: {
                auth: {
                    host: 'not-a-valid-server-address.whatever',
                    port: 22,
                    authKey: 'privateKey'
                },
                cache: 'sftpCache.json',
                src: '/path/to/source/folder',
                dest: '/path/to/destination/folder',
                exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
                serverSep: '/',
                concurrency: 4,
                progress: false
            }
        }
    });

    grunt.loadTasks('tasks');
};
