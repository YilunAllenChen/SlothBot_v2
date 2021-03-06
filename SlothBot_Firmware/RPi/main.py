import sys
sys.path.append("~/slothbot_v3/bin_RPi")


import asyncio
from container import container
from sync_with_repo import watcher
from write_teensy_firmware import teensy_updater

import pathlib
import logging
pathlib.Path("./logs").mkdir(parents=True, exist_ok=True)
logger = logging.getLogger("main")
logger.setLevel("INFO")
f_handler = logging.FileHandler("logs/main.log", "a+")
f_handler.setFormatter(logging.Formatter("[%(asctime)s] [%(levelname)s] %(message)s"))
logger.addHandler(f_handler)


async def main():
    GLOBAL_ASYNC_STATE = type('', (), {})()
    GLOBAL_ASYNC_STATE.running = True

    logger.info("Starting tasks")
    try:
        tasks = [
            # Watcher is for updating the repo. Teensy Updater burns firmware to the Teensy MCU connected.
            # asyncio.ensure_future(watcher(GLOBAL_ASYNC_STATE)),
            asyncio.ensure_future(teensy_updater(GLOBAL_ASYNC_STATE)),

            # If you want to add other modules that are monitored by the autoreloader, follow this pattern.
            # asyncio.ensure_future(container("python3 programs/led_blink.py", GLOBAL_ASYNC_STATE)),
            asyncio.ensure_future(container("python3 programs/cloud_comm.py", GLOBAL_ASYNC_STATE))
        ]
    except KeyboardInterrupt as k:
        GLOBAL_ASYNC_STATE.running = False
    except Exception as e:
        logger.error(e)
    
    while(GLOBAL_ASYNC_STATE.running):
        try:
            logger.info("Running")
            await asyncio.sleep(1)
        except KeyboardInterrupt as k:
            GLOBAL_ASYNC_STATE.running = False       
        except Exception as e:
            logger.error(e)


    result = await asyncio.gather(*tasks, return_exceptions=False)


if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(main())
