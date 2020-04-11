import json
import os

l = []
for root, dname, files in os.walk('resources/images/dcss'):
    for fname in files:
        fpath = os.path.join(root, fname)
        l.append(fpath)
        #print(str(fpath))
print('const images =', json.dumps(l) + ';')
