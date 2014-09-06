#!/usr/bin/env node

var spawn = require('child_process').spawn;


var ls    = spawn('ssh-keygen', ['-t', 'dsa']);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
  if( data.toString().match(/Enter file in which to save the key/) ){
    ls.stdin.write("\n")
    console.log('pending');
    setTimeout(function(){
      console.log('done');
      ls.stdin.write("\n")
      ls.stderr.write("\n")
      data.write("\n")
    },1000);
  }
});

ls.on('close', function (code) {
  console.log('child process exited with code ' + code);
});