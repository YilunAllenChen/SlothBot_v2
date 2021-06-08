import os
import sys
import time
import asyncio


def file_filter(name):
    return (not name.startswith(".")) and (not name.endswith(".swp"))

def file_times(path):
    for root, dirs, files in os.walk(path):
        for file in filter(file_filter, files):
            yield os.stat(os.path.join(root, file)).st_mtime


def print_stdout(process):
    stdout = process.stdout
    if stdout != None:
        print(stdout) 

# The path to watch
path = "../bin_teensy"

# How often we check the filesystem for changes (in seconds)
wait = 1


async def teensy_updater(GLOBAL_ASYNC_STATE):
    last_mtime = max(file_times(path))
    print("Teensy Updater started")
    while GLOBAL_ASYNC_STATE.running:
        try:
            max_mtime = max(file_times(path))
            if max_mtime > last_mtime:
                print("Updating Teensy Firmware...")
                os.system("sudo ./teensy_loader_cli --mcu=mk20dx256 -s ../bin_teensy/main.hex")
                last_mtime = max_mtime
            await asyncio.sleep(5)
        except KeyboardInterrupt as k:
            GLOBAL_ASYNC_STATE.running = False
        except Exception as e:
            raise
