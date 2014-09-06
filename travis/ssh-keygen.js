#!/usr/bin/env node

var spawn = require('child_process').spawn;


var ls    = spawn('ssh-keygen', ['-t', 'dsa']);

var t_out = setTimeout(function(){
  console.log('stdin: \n');
  ls.stdin.write("\n")
},1000);

ls.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

ls.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

ls.on('close', function (code) {
  clearTimeout(t_out);
  console.log('child process exited with code ' + code);
});