Stateless runtimes like PHP don't do connection pooling by default. This means that for every request a new connection has to be made to a database or message queue.

By keeping a pool of active connections, the connection time can be reduced which speeds up requests and improves scalability.

### Source
- [Improve database performance with connection pooling](https://stackoverflow.blog/2020/10/14/improve-database-performance-with-connection-pooling/)
- [AMQProxy](https://github.com/cloudamqp/amqproxy)


#published 
