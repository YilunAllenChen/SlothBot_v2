import sys
sys.path.append("~/slothbot_v3/bin_RPi")


import asyncio
from task_autoreload_container import container
from task_repo_watcher import watcher
from task_teensy_updater import teensy_updater

import pathlib
import logging
pathlib.Path("./logs").mkdir(parents=True, exist_ok=True)
logger = logging.getLogger("main")
logger.setLevel("INFO")
f_handler = logging.FileHandler("logs/main.log", "a+")
f_handler.setFormatter(logging.Formatter("[%(asctime)s] [%(levelname)s] %(message)s"))
logger.addHandler(f_handler)


GLOBAL_STATE = "RUNNING"
async def main():
    global GLOBAL_STATE
    logger.log("Starting tasks")
    try:
        tasks = [
            asyncio.ensure_future(container("python3 led_blink.py", GLOBAL_STATE)),
            asyncio.ensure_future(container("python3 serial_test.py", GLOBAL_STATE)),
            asyncio.ensure_future(watcher(GLOBAL_STATE)),
            asyncio.ensure_future(teensy_updater(GLOBAL_STATE))
        ]

        result = await asyncio.gather(*tasks, return_exceptions=True)
    except Exception as e:
        logger.error(e)
    except KeyboardInterrupt as k:
        GLOBAL_STATE = "TERMINATING"
    result = await asyncio.gather(*tasks, return_exceptions=True)
    exit()


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())