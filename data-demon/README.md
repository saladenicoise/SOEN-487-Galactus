## How to run data-demon for development
 Make sure before running the server at port 3000, you have the following servers open:
 1) Prerequisite: Have docker downloaded and run an instance of it
      - Make sure to have WSL installed in your operating system.
      - Open the Windows Start menu and search for "Windows Features."
      - Click on "Turn Windows features on or off."
      - Scroll down and check the box next to "Windows Subsystem for Linux."
      - Click "OK" and wait for the feature to be installed. Your computer may need to restart.
      - After the restart, open the Microsoft Store app.
      - Search for the Linux distribution you want to install (such as Ubuntu, Debian, or Kali Linux) and select it from the search results.
      - Click the "Get" or "Install" button to start the installation process.
      - Once the installation is complete, you can launch the Linux distribution from the Start menu or by typing the name of the distribution in the Windows search bar.
      - Download Docker Desktop for Windows from the [official Docker website](https://docs.docker.com/desktop/install/windows-install/) and install it on your system. 
      - Once Docker is installed, launch it from your applications menu.
      - Open a command prompt or PowerShell window and type the following command to check if Docker is installed and running properly: 
         ```console
         docker version
         ```
      - If Docker is running, the output of the above command should display the version of Docker installed on your system.
      - Next, you need to download the Redis image from the Docker Hub. To do so, type the following command in the command prompt or PowerShell window:
         ```console
         docker pull redis
         ```
 2) Redis server installed in docker, run instance at port 6379
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
      - See this [medium link](https://medium.com/idomongodb/installing-redis-server-using-docker-container-453c3cfffbdf) that explains the previous steps to download and run redis docker

 3) RabbitMQ is running cloudAMPQ instance at port 5672 so no need to run it locally
 
