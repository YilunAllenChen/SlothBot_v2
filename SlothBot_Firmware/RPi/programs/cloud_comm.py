# !python3 -m pip install --upgrade firebase-admin

import RPi.GPIO as GPIO
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from random import choice, gauss, random
from time import time, sleep
from requests import get
import uuid
import pathlib
import logging
pathlib.Path("./logs").mkdir(parents=True, exist_ok=True)
logger = logging.getLogger("cloud")
logger.setLevel("INFO")
f_handler = logging.FileHandler("logs/cloud.log", "a+")
f_handler.setFormatter(logging.Formatter("[%(asctime)s] [%(levelname)s] %(message)s"))
logger.addHandler(f_handler)


GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(23,GPIO.OUT)


try:
# Use a service account
    cred = credentials.Certificate('agent_cred.json.secret')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    datatypes = [u'temperature_C', u'temperature_F',
                u"battery_voltage", u"humidity"]
except Exception as e:
    logger.error(str(e))

while(True):
    try:
        doc_ref = db.collection(u'sensor_data').document(f"AGENT_{hex(uuid.getnode())}")
        timestamp = str(int(time() * 1000 + random()*10000-5000))
        instructions = doc_ref.get().to_dict().get("instructions")
        doc_ref.set({
            "env_data": {
                timestamp: {
                    u'type': choice(datatypes),
                    u'data': (gauss(10, 2)),
                }
            },
            "identity": {
                "ip_addr": get('https://api.ipify.org').text
            },
            "instructions": []
        }, merge=True)
        if instructions and len(instructions) > 0:
            for instruction in instructions:
                if instruction == "LED ON":
                    GPIO.output(23, GPIO.HIGH)
                elif instruction == "SLEEP 10":
                    sleep(10)
                elif instruction == "LED OFF":
                    GPIO.output(23, GPIO.LOW)
        print(f"sent")
        sleep(30)
    except Exception as e:
        logger.error(str(e))