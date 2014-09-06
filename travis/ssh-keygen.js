#!/usr/bin/env node

var spawn = require('child_process').spawn;


var ls    = spawn('ssh-keygen', ['-t', 'dsa']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
  if( data.toString().match(/Enter file in which to save the key/) ){
    ls.stdin.write("\n\n")
  }
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});