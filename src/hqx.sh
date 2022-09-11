STARTTIME=$(date +%s)
DONE=0
COUNT=$(find resources/images/dcss -iname \*.png | sort | wc -l)
for file in $(find resources/images/dcss4x -iname \*.png | sort); do
  #scaledFile=$(echo $file | sed 's/dcss/dcss4x/')
  scaledFile=$(echo $file | sed 's/dcss4x/dcss16x/')
  mkdir -p $(dirname $scaledFile)
  echo ./node_modules/.bin/hqx $file 4
  ./node_modules/.bin/hqx $file 4 >| $scaledFile
  ENDTIME=$(date +%s)
  ELAPSED=$(($ENDTIME - $STARTTIME))
  DONE=$(($DONE + 1))
  REMAINING=$(($COUNT - $DONE))
  EST=$(($ELAPSED * $REMAINING / $DONE))
  echo "DONE: $DONE, ELAPSED: $ELAPSED, REMAINING: $REMAINING, EST: $EST)"
done
