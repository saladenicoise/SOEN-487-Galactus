## How to run data-demon for development
 Make sure before running the server at port 3000, you have the following servers open:
 0) Prerequisite: Have docker downloaded and run an instance of it (TODO add steps)
 1) Redis server installed in docker, run instance at port 6379
   - Run the command `docker run --name my-redis -p 6379:6379 -d redis`
   - You can confirm the image is running using `docker ps`. The image name is 'redis'
   - Connect to redis from inside the container with `docker exec -it my-redis sh`. This opens the redis CLI so you can type redis commands.
   - Type the redis command `redis-cli` and run some tests:
        ```shell
        # redis-cli
        127.0.0.1:6379> ping
        PONG
        127.0.0.1:6379> set name Monica
        OK
        127.0.0.1:6379> get name
        "Monica"
        127.0.0.1:6379>
        ```
   - Alternative step: instead of the last 2 steps, you can also download redis-CLI and run the tests by typing `redis-cli` on your terminal of choice: [Link to download redis](https://redis.io/topics/rediscli)
   - To stop running the docker instance, easiest way is to stop it from the Docker app
  
See this medium link that explains this command
   https://medium.com/idomongodb/installing-redis-server-using-docker-container-453c3cfffbdf
 1) Consumer script running on a separate terminal otherwise you must comment out producer.
   ```bash
   cd data-demon
   node consumer.js
   ```
 2) RabbitMQ is running cloudAMPQ instance at port 5672 so no need to run it locally
 
