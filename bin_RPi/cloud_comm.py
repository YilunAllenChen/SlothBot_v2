# !python3 -m pip install --upgrade firebase-admin

import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from random import choice, gauss, random
from time import time, sleep
from requests import get

import uuid

# Use a service account
cred = credentials.Certificate('agent_cred.json.secret')
firebase_admin.initialize_app(cred)

db = firestore.client()

datatypes = [u'temperature_C', u'temperature_F',
             u"battery_voltage", u"humidity"]




while(True):
    doc_ref = db.collection(u'sensor_data').document(f"AGENT_{hex(uuid.getnode())}")
    timestamp = str(int(time() * 1000 + random()*10000-5000))
    doc_ref.set({
        "env_data": {
            timestamp: {
                u'type': choice(datatypes),
                u'data': (gauss(10, 2)),
            }
        },
        "identity": {
            "ip_addr": get('https://api.ipify.org').text
        }
    }, merge=True)
    print(f"sent")
    sleep(5)
