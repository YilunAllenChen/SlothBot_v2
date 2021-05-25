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
            print("Repo updated.")
            GPIO.output(24,GPIO.LOW)
            await asyncio.sleep(3)
        except KeyboardInterrupt as k:
            GLOBAL_ASYNC_STATE.running = False
        except Exception as e:
            raise