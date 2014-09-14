#!/usr/bin/expect -f
spawn ssh-copy-id $argv
expect "password:"
send "\n"
expect "Are you sure you want to continue connecting (yes/no)? "
send "\n"
expect eof