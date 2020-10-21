file=google-credentials.json

# -f Check if file exists
if [ -f $file ] ; then
    rm $file
fi

echo $FIREBASE_APPLICATION_CREDENTIAL_STRING > $file

export FIREBASE_APPLICATION_CREDENTIALS="`pwd`/${file}"

