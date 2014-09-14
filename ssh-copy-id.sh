#!/usr/bin/expect -f
spawn ssh-copy-id $argv
expect "password:"
send "\r"
expect "Are you sure you want to continue connecting (yes/no)? "
send "\r"
expect eof