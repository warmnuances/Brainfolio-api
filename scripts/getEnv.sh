file=.env

# -f Check if file exists
if [ -f $file ] ; then
    rm $file
fi

echo "MONGO_URL=$MONGO_URL">> $file
echo "SECRET=$SECRET">> $file
