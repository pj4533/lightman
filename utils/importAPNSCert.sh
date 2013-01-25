#!/bin/sh

#
# Script imports the APNS cert to the specified keychain
#

security import $1_apns.cer -k $1.keychain