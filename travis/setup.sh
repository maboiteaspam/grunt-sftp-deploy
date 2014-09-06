#!/bin/bash
set -ev

node travis/install-openssh-server.js
cat /etc/ssh/sshd_config
sudo /etc/init.d/ssh restart
node travis/ssh-keygen.js
node travis/ssh-copy-id.js
chmod 600 .ssh/authorized_keys
ssh localhost