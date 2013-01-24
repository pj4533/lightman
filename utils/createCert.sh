#!/bin/sh

#
# Script does following:
#     1) creates private key
#     2) creates CSR using private key
#     3) loads private key to keychain
#     4) uses the CSR to make certificate
#
#       usage:    createCert.sh <keyname> <email> '<username>' <devcenterusername> <devcenterpassword> <command>
#


openssl genrsa -out $1.key 2048
openssl req -new -key $1.key -out $1.certSigningRequest -subj "/emailAddress=$2, CN=$3, C=US"
security import $1.key -k login.keychain -t priv
node lightman.js -u $4 -p $5 --csr $1.certSigningRequest $6
