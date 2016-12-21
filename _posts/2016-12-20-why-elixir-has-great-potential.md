---
layout: post
title: Elixir
summary: Why I think that the Elixir language has great potential
---

As a developer I think it is important to stay up to date with new developments. But mostly I love learning new things ;-) 
This means to be on the lookout for current trends in the tech industry, guessing their potential and trying them out. Sometimes I’m right. For example: A few months ago, adopting [GraphQL](https://enrise.com/2016/10/why-we-use-graphql/) turned out to be a good guess. 

![Elixir](https://cloud.githubusercontent.com/assets/133832/21369161/f3b8dae6-c705-11e6-8f9e-2195ebb85a95.png)

One development that kept be busy next to work for the last few weeks was the **[Elixir](http://elixir-lang.org)**. My background is for the biggest parts in PHP and Javascript. Learning a programming language that is **functional, immutable, and supports concurrency and pattern matching** can be mind bending. But apart from being a modern language, Elixir intrigues me because it…

1. **Compiles to Erlang**<br />
    Running on the battle tested [Erlang VM](https://www.erlang.org) is a great choice because its built-in support for concurrency, distribution and fault tolerance. Before looking into Elixir I wasn’t aware how versatile the Erlang VM is and how much it can simplify a tech stack. 
    
    <img src="https://cloud.githubusercontent.com/assets/133832/21369162/f3bbf0aa-c705-11e6-8fb8-5f163eb47cd4.jpg" width="400" title="Erlang technology comparison"/>
    Source: https://www.manning.com/books/elixir-in-action

2. **Quality of libraries**<br />
The quality and maturity of libraries surprised me. For example: the web framework [Phoenix](http://www.phoenixframework.org), the database abstraction [Ecto](https://hexdocs.pm/ecto/getting-started.html) and the GraphQL library [Absinthe](http://absinthe-graphql.org). 
  
3. **Path for scalability**<br />
Premature optimization is as costly as rewrites caused by “quick and dirty” work. Thanks to message passing and processes of Erlang there is actually a very nice path for scaling from small to large without waste:
> 1. Design your code around processes
> 2. Separate these processes into OTP apps
> 3. When an OTP app gets too much load, move it to its own node on better hardware

    Source: [Learn Phoenix episode “Scaling Phoenix”](https://www.learnphoenix.tv/episodes/scaling).
    

4. **Reliability and resilience**<br />
Contrary to processes in other programming languages, a process that fails doesn’t kill the whole application. If a process dies in Elixir/Erlang it can be restarted by a supervisor. Organising an application in supervision trees enables building very reliable systems, containing failures within each component. Erlang is known for it’s [“Let It Crash”](http://verraes.net/2014/12/erlang-let-it-crash/) philosophy.

5. **Performance**<br />
  So far I’m very happy with the speed of Elixir/Erlang. Reading about [sub-millisecond response times](https://engineering.pinterest.com/blog/introducing-new-open-source-tools-elixir-community) and scaling to [2 million active websocket connections on one server](http://www.phoenixframework.org/blog/the-road-to-2-million-websocket-connections) lets me not worry much about this topic just yet. 
![Phoenix scalability](https://cloud.githubusercontent.com/assets/133832/21369160/f3b89130-c705-11e6-861a-e5a72728eb7c.png)   
  Especially compared to running PHP, Elixir comes with great performance. A big advantage of Elixir over NodeJS is, that any work that is blocking, doesn’t block the event loop.


