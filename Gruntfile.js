
module.exports = function(grunt) {

  var git_username = process.env.GITHUB_USERNAME || '';
  if( git_username == '' ){
    grunt.fail.fatal("Please declare environment variables GITHUB_USERNAME and GITHUB_PASSWORD");
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    release: {
      options: {
        npm: false, //default: true
        // true will apply the version number as the tag
        npmtag: true, //default: no tag
        tagName: '<%= version %>', //default: '<%= version %>'
        github: {
          repo: git_username+'/grunt-sftp-deploy',
          usernameVar: 'GITHUB_USERNAME',
          passwordVar: 'GITHUB_PASSWORD'
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-release');
  grunt.registerTask('cleanup-grunt-temp', [],function(){
    grunt.file.delete(__dirname + '/.grunt');
  });

  grunt.registerTask('default', ['release:patch','cleanup-grunt-temp']);

  // to release the project in a new version
  // use one of those commands
  // grunt --no-write -v release # test only
  // grunt
  // grunt release:patch
  // grunt release:minor
  // grunt release:major
  // grunt release:prerelease

};
