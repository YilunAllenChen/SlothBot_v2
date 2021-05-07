import os
import asyncio

async def watcher(GLOBAL_STATE):
    while GLOBAL_STATE != "TERMINATING":
        os.system("git pull")
        print("Repo updated.")
        await asyncio.sleep(3)