---
layout: post
title: "Learning Elixir: 1 year later"
summary: One year ago I dived into learning Elixir. It's time for a retrospective. 
categories: elixir, side-project, graphql, learning
image: https://cloud.githubusercontent.com/assets/133832/21369161/f3b8dae6-c705-11e6-8f9e-2195ebb85a95.png
published: true
---

One year ago I started learning [Elixir](http://elixir-lang.github.io/) because I saw [great potential](https://adrian-philipp.com/post/why-elixir-has-great-potential). This is my retrospective, looking back on my journey with Elixir in the last year. 

### TLDR;
*I liked functional programming, the Elixir langauge, the community, parallel tests, the fast workflow, the dependency management and the powerful platform. I had troubles with Erlangs cryptic error messages, IDE support, code density and deployments. My excitement for Elixir is still the same!*

## What I did in 2017
Before reflecting on how I liked things in Elixir land, I like to summarise *what* I actually did.

### More books
After watching screencast series and doing exercises mentioned in the [blog post one year ago](https://adrian-philipp.com/post/why-elixir-has-great-potential), I have read the following books:

 * [Elixir in Action](https://www.manning.com/books/elixir-in-action) by Saša Jurić
 * [Functional Web Development with Elixir, OTP, and Phoenix](https://pragprog.com/book/lhelph/functional-web-development-with-elixir-otp-and-phoenix) by Lance Halvorsen
 * [Learn Functional Programming with Elixir](https://pragprog.com/book/cdc-elixir/learn-functional-programming-with-elixir) by Ulisses Almeida 
 * [Craft GraphQL APIs in Elixir with Absinthe (beta)](https://pragprog.com/book/wwgraphql/craft-graphql-apis-in-elixir-with-absinthe) by Bruce Williams and Ben Wilson
 * [Adopting Elixir (beta)](https://pragprog.com/book/tvmelixir/adopting-elixir) by Ben Marx, José Valim, Bruce Tate

Of these books I found Elixir in Action the most challenging (in a good way) and inspiring. In a way that's also because it was one of the first books I've read. Which means that some content was repeated in other books. For GraphQL specifically I really liked what's already available in "Craft GraphQL APIs in Elixir with Absinthe (beta)".

### Talks
Playlists of Elixir conference talks I watched:

- [ElixirConf 2017](https://www.youtube.com/watch?v=bd_EIWU9GzQ&list=PLqj39LCvnOWZMVugtyKlHMF1o2zPNntFL)
- [ElixirConf EU 2017](https://www.youtube.com/watch?v=kMHXd_iMGRU&list=PLWbHc_FXPo2jV6N5XEjbUQe2GkYcRkZdD)
- [Lonestar Elixir 2017](https://www.youtube.com/watch?v=tMO28ar0lW8&list=PLE7tQUdRKcyaMEekS1T32hUw19UxzqBEo)
- [ElixirDaze 2017](https://www.youtube.com/watch?v=fTYkbPBOt1o&list=PLE7tQUdRKcyZV6tCYvrBLOGoyxUf7s9RT)
- [EMPEX 2017](https://www.youtube.com/watch?v=nvV-4040xXI&list=PLyO-58-sOapxgGz6S53Iklyv4s96ePyjS)

### Side projects
My preferred way to learn new technologies is to solve problems that I see. This gets me value by having a solution to a problem and learning different aspects of a project. 

These aspects are for me: development speed, testability, maintainability, reliability and observability in production, community support, tooling support and performance.

#### Estimator
The first side-project was about solving a problem I saw at work. I saw a need for a Planning Poker tool that integrates with Jira. The tool called Estimator is used since June regularly, about every 1-2 weeks by two teams. Demo:

<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/uEaGnlmUaWE" frameborder="0" allowfullscreen></iframe></div>
<br />

What I learned during this side-project:

 * "Realtime" synchronisation of data via websockets
 * Authentication via Github
 * Deploying to Heroku
 * Database usage via Ecto: schemas, migrations, queries 
 * Using external APIs (Jira)
 * Caching 
 * Continuous integration setup
 * A little bit about automated testing

The [source code is on Github](https://github.com/adri/estimator). Read more about it in the [Estimator blog post](https://adrian-philipp.com/post/learning-elixir-first-side-project).

#### Picape
The second side-project is a tool speed up ordering ingredients at a supermarket. Picape holds a mapping of recipes and their ingredients to products from a home delivery supermarket. We use the tool about twice a week for the last 3 months. Demo:

<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/qhtsn7rZClQ" frameborder="0" allowfullscreen></iframe></div>
<br />

What I learned during this side-project:

* Building a GraphQL API in Elixir
* Automated parallel testing of GraphQL, databases and websockets
* Structuring an application using Phoenix Contexts
* Deploying on a vserver with git push
* Integrating Sentry for error tracking and Timber for logs
* Code coverage with codecov

The [source code is on Github](https://github.com/adri/picape). Read more about it in the [Picape blog post](https://adrian-philipp.com/post/learning-elixir-second-side-project-part1).

## What I liked
There are many small details that I liked. When looking at the whole year I would mention these points in particular:

#### Functional programming
I have applied functional programming principles in Javascript (with lodash, Ramda) and PHP before learning Elixir. It turned out to be mind bending when these principles are the only ones available – like in Elixir. I'm happy to have gone "though the pain". In the beginning I remember the syntax to look very strange and confusing, but after few days when the concepts begin to "click" I started to see the beauty of it. 

#### The langauge
Once I was used to the pipeline operator `|>`, pattern matching and the `with` statement I started to miss it in other languages. 

The `with` statement I find particularly nice because it simplifies error handling in a sequence of function calls. There is a great explanation and [example on StackOverflow](https://stackoverflow.com/questions/34210281/how-to-use-the-with-keyword-in-elixir-and-what-is-it-for). 

#### Community
I was hanging out in Slack channels, read blog posts and some forums. What I consistently noticed is how friendly, helpful and open the community is. I'm not saying that other communities are less good. Just that Elixirs community is at least as good. 

#### Parallel tests
My phone has 6 cores. Looking at the increase of CPUs in devices over the last years makes parallelism in programming more important. One area where leveraging parallelism is great, is running tests in Elixir. Especially integration tests with databases. 

As projects grow, their automated test get slower. It takes a constant effort to keep the test times low, to be able to move fast. This is still the case with Elixir, but using all available resources without having developers caring about it can delay this effort. 

#### Fast workflow
Developing in Elixir using the web framework Phoenix feels very similar to using PHP. Code changes don't need a server restart like in NodeJS. I like how live reloading on code changes comes out of the box, making the developer experience even better.

#### Dependency management
Using [Mix](http://elixir-lang.github.io/getting-started/mix-otp/introduction-to-mix.html) with [hex](https://hex.pm/) to install and update library dependencies is a pleasure. It is fast, customisable, reliable and gives helpful instructions in case of conflicts. Especially compared to Composer, a PHP dependency manager, I found this a much better experience. Please don't get me wrong, I still think Composer is a great software and transformed the PHP world a few years ago. 

#### Powerful Platform
I'm repeating a bit what I mentioned last year but I still want to stress the importance of running Erlang under the hood. The following comparison shows what I mean:
 
![Erlang technology comparison](https://cloud.githubusercontent.com/assets/133832/21369162/f3bbf0aa-c705-11e6-8fb8-5f163eb47cd4.jpg)
[Source](https://www.manning.com/books/elixir-in-action)

All components are solid. Apart from a PostgreSQL database I had no infrastructure setup. This is great for development and production simplicity. Note that you can still use software like Redis, memcached, cron etc if needed. Some examples:

* [Adding a cronjob](https://github.com/adri/picape/commit/12f9f12a0e361b1b4d2f2f825bc011589b94d9c6)
* [Adding a reverse proxy](https://github.com/adri/picape/commit/c7c9c5dcadd776913b27da4da3534ea2d16ea87e)
* Adding caching across requests (using ETS under the hood): 

```elixir
ConCache.get_or_store(:bucket, key, fn() -> compute(key) end)
```

## What I didn't like
Like with everything, there are some cons. Or I didn't understand enough yet.  

#### Erlangs cryptic error messages
I have to say that Elixirs error messages are very helpful. More helpful compared to PHP and Javascript. However, Elixir runs on Erlang. Those messages can be sometimes a bit cryptic. Unfortunately (for this blog post) I can't see my production error messages anymore. The last error is too long ago. 

[Searching for this](https://www.google.nl/search?&q=elixir+error+messages+cryptic) reveals some error messages like `(ArithmeticError) bad argument in arithmetic expression`. Those I find hard to make sense of. I like that Elixir core devs are contributing to Erlang to improve this: [example](https://github.com/elixir-lang/elixir/issues/6142).

#### IDE support 
I've used many editors like VIM, Atom and VSCode. When working with PHP I'm happy with PHPStorm and the features from WebStorm with support for Javascript and other web technologies. With Elixir I feel the experience is not yet on par. The [Elixir plugin for IntelliJ](https://github.com/KronicDeth/intellij-elixir) and [Elixir language server](https://github.com/JakeBecker/elixir-ls) are awesome efforts to improve this though. 

#### Code Density
Elixir is a very nice language and it is very expressive. This expressiveness means that code can get dense. Especially when pattern matching is new to someone. 

To not step on anyones toes, lets look at some code I wrote last year. It's an exercise on [exercism.io](http://exercism.io). A function that returns whether the first list is a sublist or a superlist of a second list. And if not whether it is equal or unequal to the second list. Here [my solution using pattern matching on function definitions and recursion](http://exercism.io/submissions/4d02217954a84b98aa7533eb52d643f9). This is performant but I find it also hard to see what's happening.

I felt it was too hard to read for my future self and picked up [an idea from another solution for this problem not using recursion](http://exercism.io/submissions/7ba724dfeb8b43bcb6b5c9b32a048ea3). This is much slower but in my opinion easier to read.

My point here is: I like the expressiveness of Elixir. When trying to pack too much information in a piece of code it become too dense though. 

#### Deployments
Deployments could be better supported out of the box. The best experience was deploying to Heroku, this works great. 

For Picape I could not use Heroku however because I wanted to separate the frontend (running on NodeJS, using next.js) and backend (Elixir/Erlang process) but keep the simplicity of one repository. I ended up with [starting a NodeJS process](https://github.com/adri/picape/blob/master/config/prod.exs#L23-L25) when starting Elixir/Erlang. On Heroku I had issues opening multiple ports and get the forwarding working.

Deploying to my VPS (virtual private server) was east but I had to do [some](https://github.com/adri/picape/blob/master/bin/update) [scripting](https://github.com/adri/picape/blob/master/bin/deploy) and find out how to restart the Elixir process. This is by no means a zero downtime deployment ;) However I would love to learn a way how to do this properly.

## Summarizing
I'm very happy to have learned Elixir and I'm planning to learn more. I think it helps me to become a better developer. It is awesome to see so many great people working on Elixir and improving it. 

A few upcoming things I'm excited about: [Elixir formatter](https://github.com/lpil/exfmt), [property-based testing](http://elixir-lang.github.io/blog/2017/10/31/stream-data-property-based-testing-and-data-generation-for-elixir/), an abstraction for monitoring Phoenix and improved deployment tools. 


