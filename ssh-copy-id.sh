#!/usr/bin/expect -f
spawn ssh-copy-id $argv
expect "password:"
send "\n"
expect eof
expect "ant to continue connecting :"
send "\n"
expect eof