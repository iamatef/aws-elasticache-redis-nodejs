// Include the Redis package
var redis = require("redis");

var redisEndpoint =
  "my-first-cluster.0xqxue.ng.0001.use1.cache.amazonaws.com:6379";
// Get the port and host from the endpoint string
var PORT = redisEndpoint.slice(-4);
var HOST = redisEndpoint.slice(0, -5);
//create a new Redis client
var client = redis.createClient(PORT, HOST);

// Connect to Redis endpoint
client.on("connect", function () {
  console.log("Connected to Redis node: " + redisEndpoint);
  writeRedisKey("myHighScore", "1000");
  writeRedisObject("myObject", { name: "John", age: "30" });
});

// Write a key-value pair to Redis
function writeRedisKey(key, value) {
  client.set(key, value, function (err, reply) {
    if (err) {
      console.log("Error writing key: " + key + " value: " + value);
      return;
    }

    //success
    console.log("Wrote key: " + key + " value: " + value);
    expireRedisKey(key, 30);
    readRedisKey(key);
  });
}

// Set a key to expire after a given number of seconds
function expireRedisKey(key, seconds) {
  client.expire(key, seconds, function (err, reply) {
    if (err) {
      console.log("Error setting expiration for key: " + key);
      return;
    }

    //success it returns 1 if key exists and 0 if it doesn't

    if (reply === 1) {
      console.log("Key: " + key + " exists and expiration set");
      
    } else {
      console.log("Key: " + key + " does not exist");
    }
  });
}

// Read a key-value pair from Redis
function readRedisKey(key) {
  client.get(key, function (err, reply) {
    if (err) {
      console.log("Error reading key: " + key);
      return;
    }

    //success
    console.log("Read key: " + key + " value: " + reply);
  });
}

// Write object to Redis using hmset
function writeRedisObject(objRedis, value) {
  client.hmset(objRedis, value, function (err, reply) {
    if (err) {
      console.log("Error writing key: " + objRedis + " value: " + value);
      return;
    }

    //success
    console.log("Wrote key: " + objRedis + " value: " + value);
    expireRedisKey(objRedis, 30);
    readRedisObject(objRedis);
  });
}

// Read object from Redis using hgetall
function readRedisObject(objRedis) {
  client.hgetall(objRedis, function (err, reply) {
    if (err) {
      console.log("Error reading key: " + objRedis);
      return;
    }

    //success
    console.log("Read key: " + objRedis + " value: " );
    console.log(reply);
  });
}
