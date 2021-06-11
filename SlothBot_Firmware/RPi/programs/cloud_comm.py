# !python3 -m pip install --upgrade firebase-admin

try:
    import RPi.GPIO as GPIO
    import serial
except:
    print("Can't import RPI GPIO or serial.")
    
from random import choice, gauss, random
from time import time, sleep
from requests import get
import uuid
import pathlib
import logging
import json
from requests import post
import os

pathlib.Path("./logs").mkdir(parents=True, exist_ok=True)
logger = logging.getLogger("cloud")
logger.setLevel("INFO")
f_handler = logging.FileHandler("logs/cloud.log", "a+")
f_handler.setFormatter(logging.Formatter("[%(asctime)s] [%(levelname)s] %(message)s"))
logger.addHandler(f_handler)

API_BASE = "http://174.138.125.2:5050"
datatypes = [u'temperature_C', u'temperature_F',
            u"battery_voltage", u"humidity"]


try:
    GPIO.setmode(GPIO.BCM)
    GPIO.setwarnings(False)
    GPIO.setup(23,GPIO.OUT)
    GPIO.setup(24,GPIO.OUT)
except:
    logger.warning("GPIO not initialized")

try:
    ser = serial.Serial('/dev/ttyS0', 115200)
    ser.flushInput()
    ser.flushOutput()
except:
    logger.warning("Serial is not initialized")



def send_data(data):
    self_id = f"AGENT_{hex(uuid.getnode())}"
    data['id'] = self_id
    post(f"{API_BASE}/set", json=data)

def get_data():
    self_id = f"AGENT_{hex(uuid.getnode())}"
    resp = post(f"{API_BASE}/get", json={"id": self_id})
    print(resp)
    return resp.json()


while(True):
    try:
        timestamp = str(int(time() * 1000 + random()*10000-5000))
        

        outbound_payload = {}

        instructions = None
        try:
            instructions = get_data().get("instructions")
        except Exception as e:
            logger.error("Can't fetch instructions:", str(e))


        try:
            outbound_payload.update({
                # "env_data": {
                #     timestamp: {
                #         u'type': choice(datatypes),
                #         u'data': (gauss(10, 2)),
                #     }
                # },
                "state": {
                    "heartbeat": int(timestamp)
                },
            })
        except Exception as e:
            logger.error("Can't update environment data: ", str(e))


        try:
            outbound_payload.update({
                "state": {
                    "ip_addr": get('https://api.ipify.org', timeout=5).text
                }
            }) 
        except Exception as e:
            logger.error("Can't update IP address: ", str(e))


        
        outbound_payload.update({"instructions": []})
        if instructions and len(instructions) > 0:
            for instruction in instructions:
                try:
                    if instruction == "LED ON":
                        GPIO.output(23, GPIO.HIGH)
                    elif instruction == "SLEEP 1":
                        sleep(1)
                    elif instruction == "LED OFF":
                        GPIO.output(23, GPIO.LOW)
                    elif instruction == "READ SENSORS":
                            payload = {
                                "component": "sensors",
                                "cmd": "read_all"
                            }
                            payload_jsonstr = json.dumps(payload)
                            ser.write(payload_jsonstr.encode())
                            logger.info('sent')
                            
                            sleep(1)
                            inbound_str = ser.read_all().decode()
                            if len(inbound_str) > 0:
                                result = str(json.loads(inbound_str))
                                outbound_payload.update({
                                    "manual_reading": {
                                        timestamp: {
                                            u'type': choice(datatypes),
                                            u'data': result,
                                        }
                                    },
                                })
                            else:
                                outbound_payload.update({"manual_reading": {
                                    timestamp: {
                                        "type": "Failure",
                                        "data": -1
                                    }
                                }})
                    
                    elif instruction == "UPDATE":
                        GPIO.output(24,GPIO.HIGH)
                        os.system("git pull")
                        # os.system("python3 -m pip install -r requirements.txt")
                        print("Repo updated.")
                        GPIO.output(24,GPIO.LOW)
                        
                    elif instruction == "GO":
                        payload = {
                            "component": "motors",
                            "cmd": "set_speed",
                            "params": [1]
                        }
                        payload_jsonstr = json.dumps(payload)
                        ser.write(payload_jsonstr.encode())

                    elif instruction == "STOP":
                        payload = {
                            "component": "motors",
                            "cmd": "set_speed",
                            "params": [0]
                        }
                        payload_jsonstr = json.dumps(payload)
                        ser.write(payload_jsonstr.encode())
                except Exception as e:
                    logger.log("Can't execute instruction: " + instruction + " | " + str(e))


        send_data(outbound_payload)                
        sleep(10)

    except Exception as e:
        logger.error(str(e) + str(hex(uuid.getnode())))