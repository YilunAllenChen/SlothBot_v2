import os
import asyncio
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(24,GPIO.OUT)

async def watcher(GLOBAL_STATE):
    while GLOBAL_STATE != "TERMINATING":
        try:

            GPIO.output(24,GPIO.HIGH)
            os.system("git pull")
            print("Repo updated.")
            GPIO.output(24,GPIO.LOW)
            await asyncio.sleep(60)
        except KeyboardInterrupt as k:
            GLOBAL_STATE = "TERMINATING"
