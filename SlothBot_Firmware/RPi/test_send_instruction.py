# !python3 -m pip install --upgrade firebase-admin


import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from random import choice, gauss, random
from time import time, sleep
from requests import get
import uuid

try:
# Use a service account
    cred = credentials.Certificate('agent_cred.json.secret')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    datatypes = [u'temperature_C', u'temperature_F',
                u"battery_voltage", u"humidity"]
except Exception as e:
    print(str(e))

while(True):
    try:
        doc_ref = db.collection(u'sensor_data').document(f"AGENT_{hex(uuid.getnode())}")
        timestamp = str(int(time() * 1000 + random()*10000-5000))
        instructions = doc_ref.get().to_dict().get("instructions")
        new_instructions = [
            "LED ON",
            "SLEEP 10",
            "LED OFF"
        ]
        doc_ref.set({
            "instructions": instructions + new_instructions
        }, merge=True)
        
        print(f"sent")
        sleep(5)
    except Exception as e:
        print(e)