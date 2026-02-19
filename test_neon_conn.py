import asyncio
import asyncpg

DB_URL = "postgresql://neondb_owner:npg_MuqiP1zDQsw2@ep-muddy-sun-ab8jp0hf.eu-west-2.aws.neon.tech/neondb?sslmode=require"

async def test_conn():
    print(f"Connecting to {DB_URL}...")
    try:
        conn = await asyncpg.connect(DB_URL)
        print("Success! Connected to Neon DB.")
        await conn.close()
    except Exception as e:
        print(f"Failed to connect: {e}")

if __name__ == "__main__":
    asyncio.run(test_conn())
