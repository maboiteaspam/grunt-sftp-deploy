#!/usr/bin/env node

var spawn = require('child_process').spawn;


var ls    = spawn('ssh-copy-id', ['travis@localhost']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
  if( data.toString().match(/Enter passphrase/) ){
    ls.stdin.write("\n")
  }
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
  if( data.toString().match(/Enter passphrase/) ){
    ls.stdin.write("\n")
  }
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});