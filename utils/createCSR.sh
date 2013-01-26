#!/bin/sh

#
# Script does following:
#     1) creates private key
#     2) creates CSR using private key
#     3) creates specified keychain
#     4) loads private key to specified keychain
#
#       usage:    createCSR.sh <keyname> <email> '<username>'
#

openssl genrsa -out $1.key 2048
openssl req -new -key $1.key -out $1.certSigningRequest -subj "/emailAddress=$2, CN=$3, C=US"
security import $1.key -k login.keychain -t priv