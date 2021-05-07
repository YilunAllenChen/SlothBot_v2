import serial
import json
from time import sleep


ser = serial.Serial('/dev/ttyS0', 115200)
ser.flushInput()
ser.flushOutput()


import pathlib
import logging
pathlib.Path("./logs").mkdir(parents=True, exist_ok=True)
logger = logging.getLogger("serial")
logger.setLevel("INFO")
f_handler = logging.FileHandler("logs/serial.log", "a+")
f_handler.setFormatter(logging.Formatter("[%(asctime)s] [%(levelname)s] %(message)s"))
logger.addHandler(f_handler)


while True:
    payload = {}
    cmd = input("Please input command:")

    if cmd == "sensors":
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
            print("Got: " + str(json.loads(inbound_str)))
    
    if cmd == "go":
        payload = {
            "component": "motors",
            "cmd": "set_speed",
            "params": [1]
        }
        payload_jsonstr = json.dumps(payload)
        ser.write(payload_jsonstr.encode())

    if cmd == "stop":
        payload = {
            "component": "motors",
            "cmd": "set_speed",
            "params": [0]
        }
        payload_jsonstr = json.dumps(payload)
        ser.write(payload_jsonstr.encode())
        