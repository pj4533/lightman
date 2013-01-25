#!/bin/sh

#
# script exports a p12 key out of the specified keychain
#

security export -k $1.keychain -f pkcs12 -P "" -o $1.p12