---
layout: post
title: Why the Elixir language has great potential 
summary: Elixir enables creating fast, reliable and concurrent modern applications with high productivity
categories: Elixir Erlang 
---

As a developer I think it is important to stay up to date with new developments. But mostly I love learning new things ;-) 
This means to be on the lookout for current trends in the tech industry, guessing their potential and trying them out. Sometimes I’m right. For example: A few months ago, adopting [GraphQL](https://enrise.com/2016/10/why-we-use-graphql/) turned out to be a good guess.  

![Elixir](https://cloud.githubusercontent.com/assets/133832/21369161/f3b8dae6-c705-11e6-8f9e-2195ebb85a95.png)

One development that kept me busy next to work for the last few weeks was the **[Elixir](http://elixir-lang.org)** language. My background is for the biggest parts in PHP and Javascript. Learning a programming language that is **dynamic, functional, immutable, and supports concurrency and pattern matching** can be mind bending. But apart from being a modern language, Elixir intrigues me because it… 

1. **Compiles to Erlang**<br />
    Running on the battle tested [Erlang VM](https://www.erlang.org) is a great choice because its built-in support for concurrency, distribution and fault tolerance. Before looking into Elixir I wasn’t aware how versatile the Erlang VM is and how much it can simplify a tech stack.
    
    <img src="https://cloud.githubusercontent.com/assets/133832/21369162/f3bbf0aa-c705-11e6-8fb8-5f163eb47cd4.jpg" title="Erlang technology comparison" style="width: 500px">
  <br/>[Source](https://www.manning.com/books/elixir-in-action)

2. **Quality of libraries**<br />
For all my needs so far, I found some library. The quality and maturity of libraries surprised me. For example: the web framework [Phoenix](http://www.phoenixframework.org), the database abstraction [Ecto](https://hexdocs.pm/ecto/getting-started.html) and the GraphQL library [Absinthe](http://absinthe-graphql.org). Many more libraries can be found on the [package manager hex](https://hex.pm).
  
3. **Path for scalability**<br />
Premature optimization is costly. Rewrites caused by quick and dirty work are as well. Thanks to *message passing* and processes of Erlang there is actually a very nice path for scaling from small to large while reducing waste:
> 1. Design your code around processes
> 2. Separate these processes into OTP apps
> 3. When an OTP app gets too much load, move it to its own node on better hardware

    Source: [Learn Phoenix episode “Scaling Phoenix”](https://www.learnphoenix.tv/episodes/scaling).
    

4. **Reliability and resilience**<br />
Contrary to processes in other programming languages, a process that fails in Erlang doesn’t kill the whole application. If a process dies it can be restarted by a supervisor. Organising an application in supervision trees enables building very reliable systems, containing failures within each component. Erlang is known for it’s [Let It Crash](http://verraes.net/2014/12/erlang-let-it-crash/) philosophy.

5. **Performance**<br />
  So far I’m very happy with the speed of Elixir/Erlang. Reading about [sub-millisecond response times](https://engineering.pinterest.com/blog/introducing-new-open-source-tools-elixir-community) and scaling to [2 million active websocket connections on one server](http://www.phoenixframework.org/blog/the-road-to-2-million-websocket-connections) lets me not worry much about this topic just yet.   
    <img src="https://cloud.githubusercontent.com/assets/133832/21369160/f3b89130-c705-11e6-861a-e5a72728eb7c.png" title="Phoenix scalability" style="width: 500px">

    Especially when compared to PHP, Elixir comes with great performance. Being able to handle so many websocket connection enables a whole different user experience for web and mobile apps. I’m looking forward to using [Elixir with GraphQL subscriptions](https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb#.weuza15z1).

6. **Industry adoption**<br /> 
Although quite young, I was glad to see usages of Elixir by [Pinterest](https://engineering.pinterest.com/blog/introducing-new-open-source-tools-elixir-community), Bleacher Report, Brightcove, and [more](https://www.quora.com/What-big-projects-use-Elixir) and [more](https://github.com/doomspork/elixir-companies)).


## The Elixir Language 

> Why do functional programmers homeschool their kids?<br />
> Because they hate classes

The creator of Elixir is the well-known Rubyist José Valim. 
The language is influenced by Ruby which makes it subjectively nice to read. I don’t want to go into the language in detail, as [other people](http://elixir-lang.org/getting-started/introduction.html) did this already much better than I could do.

What I wanted to highlight is the usefulness of the [pipe operator](http://elixir-lang.org/getting-started/enumerables-and-streams.html#the-pipe-operator) `|>`. It works just like the unix pipeline and shuffles the return value of function A into the argument of function B. Instead of writing `b(a())` you can write `a() |> b()`.  

There are many more things I like, for example pattern matching, the built in [`Stream` module](https://hexdocs.pm/elixir/Stream.html), extensibility via macros and protocols, documentation in markdown format, shared nothing concurrent programming (actor model) and much more. 

## Tips for learning Elixir
Coming from object oriented programming languages it wasn’t easy to unlearn patterns I practiced for years. But well worth it. How to get started?

#### Screencast series
I’m a big fan of screencasts. I like the combination between seeing code and hearing explanation at the same time. Luckily I found two nice screencast series about Elixir and Phoenix:

- [LearnElixir.tv](https://www.learnelixir.tv): Great to start with this. Nice exercises. 
- [LearnPhoenix.tv](https://www.learnphoenix.tv): Best to look into after learning some Elixir.

I also saw that there is [DailyDrip Elixir](https://www.dailydrip.com/topics/elixir) which I’d like to watch in the future.  

#### Exercises
Just watching screencast series won’t learn you a language. Practice is important. One way to do this, are the [exercises on exercise.io](http://exercism.io/languages/elixir/exercises). These exercises are small, fun and teach a lot about the language. Reading solutions of other people after submitting your own is a great way to learn about alternative and maybe better code.   

#### Books
Although I haven’t gotten the change to read these books myself, I heard good things about them:

- [Programming Elixir 1.3](https://pragprog.com/book/elixir13/programming-elixir-1-3)
- [Programming Phoenix](https://pragprog.com/book/phoenix/programming-phoenix)

## Elixirs future?
Who knows. From what I see now, Elixir, although young, has great potential to become mainstream. It enables creating fast, reliable and concurrent modern applications with high productivity. I plan use Elixir in 2017 at least for some side-projects. 
