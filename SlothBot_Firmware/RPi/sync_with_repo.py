# Repo Watcher automatically pulls updates from the Repo. It'll cause all containers to reload.
# Repo Watcher is only updated on reboot.

import os
import asyncio
import RPi.GPIO as GPIO

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(24,GPIO.OUT)

async def watcher(GLOBAL_ASYNC_STATE):
    while GLOBAL_ASYNC_STATE.running:
        try:
            GPIO.output(24,GPIO.HIGH)
            os.system("git pull")
            os.system("python3 -m pip install -r requirements.txt")
            print("Repo updated.")
            GPIO.output(24,GPIO.LOW)
            await asyncio.sleep(3)
        except KeyboardInterrupt as k:
            GLOBAL_ASYNC_STATE.running = False
        except Exception as e:
            raise