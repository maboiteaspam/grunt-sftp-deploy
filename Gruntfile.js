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
                src: '/path/to/source/folder',
                dest: '/path/to/destination/folder',
                exclusions: ['/path/to/source/folder/**/.DS_Store', '/path/to/source/folder/**/Thumbs.db', 'dist/tmp'],
                serverSep: '/',
                concurrency: 4,
                progress: true
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-sftp-deploy');
};
