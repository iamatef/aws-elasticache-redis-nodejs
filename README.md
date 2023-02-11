# AWS ElastiCache Redis Nodejs demo  
This is a simple demo of using AWS ElastiCache Redis with Nodejs. We will use Cloud9 instance to connect to this Redis instance. for complete redis commands refer to [redis commands](https://redis.io/commands)

Code when run from index.js file will connect to the Redis instance, set a key and get the value of the key. it will also set an object and get the object.

For practial use case for Redis, it can be used as a cache for a database. For example, if you have a database that has a lot of data and you want to get the data quickly, you can use Redis to cache the data and get the data from Redis instead of the database. This will make the application faster. how to do this will be by reading the data from the database and storing it in Redis. Then when the application needs the data, it will first check Redis and if the data is not there, it will read the data from the database and store it in Redis. This will make the application faster.

## Setup

### Create security group
We need to create a security group that allows access to Redis instance from Cloud9 instance.
1. Go to EC2 console
2. Click on Security Groups
3. Click on the cloud9 instance and copy the security group id
4. Click on Create Security Group
5. Enter the name and description and set the inbound rule to the copied security group id and port 6379

### Create Redis subnet group
To create a Redis clusture we need to create a subnet group. This is a group of subnets that will be used by the Redis cluster.
1. Go to ElastiCache console
2. Click on Subnet Groups
3. Click on Create
4. Enter the name and description
5. Select the VPC that the Cloud9 instance is in
6. Select the subnets that the Cloud9 instance is in
7. Click on Create

### Create Redis cluster
1. Go to ElastiCache console
2. Click on Redis
3. Click on Create
4. Enter the name and description
5. Select the subnet group that we created
6. Select the security group that we created
7. Click on Create

### Connect to Redis cluster
1. Go to ElastiCache console
2. Click on Redis
3. Click on the Redis cluster that we created
4. Copy the endpoint address something like this `my-first-cluster.0xqxue.ng.0001.use1.cache.amazonaws.com:6379` and paste it in the index.js file, do not forget the port number

![success of connection](/images/1.png)
