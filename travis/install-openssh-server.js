#!/usr/bin/env node

var spawn = require('child_process').spawn;


var ls    = spawn('sudo', ['apt-get', 'install', 'openssh-server']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
  if( data.toString().match(/Enter file in which to save the key/) ){
    ls.stdin.write("\n")
  }
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});