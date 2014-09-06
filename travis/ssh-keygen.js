#!/usr/bin/env node

var spawn = require('child_process').spawn;


var ls    = spawn('ssh-keygen', ['-t', 'dsa']);

var t_out = null;
var w_lngt = 0;
var s_out = "";
var start_listen = function(){
  if(!t_out){
    t_out = setInterval(function(){
      if( w_lngt > 0 ){
        try{
          ls.stdin.write("\n")
          console.log('writing stdin');
        }catch(ex){

        }
      }
      w_lngt++;
    },1000);
  }
}

ls.stdout.on('data', function (data) {
  if( s_out != data ){
    s_out = data;
    w_lngt = 0;
  }
  console.log('stdout: ' + data);
  start_listen();
});

ls.stderr.on('data', function (data) {
  if( s_out != data ){
    s_out = data;
    w_lngt = 0;
  }
  console.log('stderr: ' + data);
  start_listen();
});

ls.on('close', function (code) {
  clearInterval(t_out);
  console.log('child process exited with code ' + code);
});