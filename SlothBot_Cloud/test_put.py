# !python3 -m pip install --upgrade firebase-admin

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from random import choice, gauss, random
from time import time

# Use a service account
cred = credentials.Certificate('agent_cred.json.secret')
firebase_admin.initialize_app(cred)

db = firestore.client()

datatypes = [u'temperature_C', u'temperature_F',
             u"battery_voltage", u"humidity"]
for i in range(30):
    doc_ref = db.collection(u'sensor_data').document(str(i))
    doc_ref.set({
        str(int(time() * 1000 + random()*10000-5000)): {
            u'type': choice(datatypes),
            u'data': (gauss(10, 2)),
        }
    }, merge=True)
    print(f"sent")
