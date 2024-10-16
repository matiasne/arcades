import { createClient } from 'redis';


let client: ReturnType<typeof createClient>;

export async function useRedis() {
  if(!client) {
    client = await createClient({
      url: process.env.REDIS_ENDPOINT!
    })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();  
  }
  return client;
}


