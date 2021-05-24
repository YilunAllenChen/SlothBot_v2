import os
import asyncio

async def watcher(GLOBAL_STATE):
    while GLOBAL_STATE != "TERMINATING":
        try:
            os.system("git pull")
            print("Repo updated.")
            await asyncio.sleep(10)
        except KeyboardInterrupt as k:
            GLOBAL_STATE = "TERMINATING"
