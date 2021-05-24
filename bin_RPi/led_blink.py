import RPi.GPIO as GPIO
import time



import pathlib
import logging
pathlib.Path("./logs").mkdir(parents=True, exist_ok=True)
logger = logging.getLogger("led")
logger.setLevel("INFO")
f_handler = logging.FileHandler("logs/led.log", "a+")
f_handler.setFormatter(logging.Formatter("[%(asctime)s] [%(levelname)s] %(message)s"))
logger.addHandler(f_handler)

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(23,GPIO.OUT)
GPIO.setup(24,GPIO.OUT)
GPIO.setup(25,GPIO.OUT)


while True: 
    logger.info("LED on")
    GPIO.output(23,GPIO.HIGH)
#    GPIO.output(24,GPIO.HIGH)
#    GPIO.output(25,GPIO.HIGH)
    time.sleep(1)
    logger.info("LED off")
    GPIO.output(23,GPIO.LOW)
#    GPIO.output(24,GPIO.LOW)
#    GPIO.output(25,GPIO.LOW)
    time.sleep(1)
