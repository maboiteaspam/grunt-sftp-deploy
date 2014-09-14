#!/usr/bin/expect -f
spawn ssh-copy-id $argv
expect "Are you sure you want to continue connecting (yes/no)?"
send "\r"
expect "password:"
send "\r"
expect eof