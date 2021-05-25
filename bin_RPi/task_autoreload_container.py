import os
import sys
import subprocess
import time
import asyncio
import signal



import pathlib
import logging
pathlib.Path("./logs").mkdir(parents=True, exist_ok=True)
logger = logging.getLogger("autoreloader")
logger.setLevel("DEBUG")
f_handler = logging.FileHandler("logs/autoreloader.log", "a+")
f_handler.setFormatter(logging.Formatter("[%(asctime)s] [%(levelname)s] %(message)s"))
logger.addHandler(f_handler)


def file_filter(name):
    return (not name.startswith(".")) and (not name.endswith(".swp") and (not name.endswith(".log")))

def file_times(path):
    for root, dirs, files in os.walk(path):
        for file in filter(file_filter, files):
            # print(os.stat(os.path.join(root, file)).st_mtime)
            yield os.stat(os.path.join(root, file)).st_mtime


def print_stdout(process):
    stdout = process.stdout
    if stdout != None:
        print(stdout) 

# The path to watch
path = "."

# How often we check the filesystem for changes (in seconds)
wait = 1



async def container(cmd, GLOBAL_ASYNC_STATE):
    process = subprocess.Popen("sudo " + cmd, shell=True, preexec_fn=os.setsid)
    last_mtime = max(file_times(path))
    logger.info("Autoreload Container Started")
    while GLOBAL_ASYNC_STATE.running:
        try:
            max_mtime = max(file_times(path))
            print_stdout(process)
            if max_mtime > last_mtime:
                last_mtime = max_mtime
                logger.info("Restarting process.")
                os.killpg(os.getpgid(process.pid), signal.SIGTERM)
                process.kill()
                process = subprocess.Popen("sudo " + cmd, shell=True, preexec_fn=os.setsid)
            else:
                logger.debug("Nothing has changed")
            await asyncio.sleep(5)
        except KeyboardInterrupt as k:
            GLOBAL_ASYNC_STATE.running = False
        except Exception as e:
            raise
    os.killpg(os.getpgid(process.pid), signal.SIGTERM)
    process.kill()
    logger.info("Container <", cmd, "> has ended")
