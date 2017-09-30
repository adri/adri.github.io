---
layout: post
title: "Elixir side-project #2: A Graphql API with Elixir (2/2)"
summary: Introduction to my next side project to learn Elixir.
categories: elixir, side-project, graphql, react, next.js
image: https://user-images.githubusercontent.com/133832/30913555-ede256ac-a390-11e7-8f3a-b8e70b00e702.png
published: false
---

I made a GraphQL API and a web interface with [next.js](https://github.com/zeit/next.js) + [Apollo](https://www.apollodata.com) to [manage and order recipes and ingredients via a supermarket API](/post/learning-elixir-first-side-project).

![GraphQL and Elixir](https://user-images.githubusercontent.com/133832/30913555-ede256ac-a390-11e7-8f3a-b8e70b00e702.png)

This is part 2 of a blog post series **Elixir side-project #2**.
1. [Planning recipes with a supermarket API (1/2)](/post/learning-elixir-first-side-project) 
2. A Graphql API with Elixir (2/2)

### GraphQL and Elixir 
I assume you have read about GraphQL. Otherwise I recommend to read an [introduction](http://graphql.org) or watch a [talk](https://www.youtube.com/watch?v=WQLzZf34FJ8).

The most used GraphQL library for Elixir is [Absinthe](http://absinthe-graphql.org). The maintainers are very active on the 
[`#absinthe-graphql` Slack channel](https://elixir-slackin.herokuapp.com/) and they are [writing a book](https://pragprog.com/book/wwgraphql/craft-graphql-apis-in-elixir-with-absinthe) about Absinthe.   

#### Installation
I'm using the currently latest Absinthe version which is 1.4-rc and also some helper libraries. `absinthe_relay` needs to be updated to 1.4 which is why I use `override: true`. In the `mix.exs` file I put these dependencies:

```
{:absinthe, "~> 1.4.0-rc", override: true},
{:absinthe_plug, "~> 1.4.0-rc"},
{:absinthe_phoenix, "~> 1.4.0-rc"},
{:absinthe_relay, "~> 1.3.0"},
```

* `absinthe_plug` for integration with plug and adding GraphiQL, [setup](https://github.com/absinthe-graphql/absinthe_plug#graphiql)
* `absinthe_phoenix` for playing with GraphQL subscriptions, [setup](https://github.com/absinthe-graphql/absinthe_phoenix) 
* `absinthe_relay` because I like to expose only [Global IDs](https://facebook.github.io/relay/docs/graphql-object-identification.html). This enables [automatic store updates](http://dev.apollodata.com/react/cache-updates.html#normalization) using Apollo.

#### Schema Definition
The  Picape domain is small enough to define in two files:   [schema.ex](https://github.com/adri/picape/blob/master/lib/picape_web/graphql/schema.ex) and [types.ex](https://github.com/adri/picape/blob/master/lib/picape_web/graphql/types.ex). Here a **query schema overview** made with [GraphQL Voyager](https://apis.guru/graphql-voyager/) (click the image to enlarge).

[![Picape GraphQL Schema overview](https://user-images.githubusercontent.com/133832/31045265-f7c5d918-a5df-11e7-9c28-88ee5d738fa7.png)](https://user-images.githubusercontent.com/133832/31045265-f7c5d918-a5df-11e7-9c28-88ee5d738fa7.png)

Absinthe provides macros to make schema definitions concise. For example the `query` macro can be used to define the root query fields. In the following example we define a field "recipes" using the `field` macro. That field resolves to a list of recipes using the `resolve` macro.

```
query do
  @desc "Lists all recipes."
  field :recipes, list_of(:recipe) do
    resolve &Resolver.Recipe.all/3
  end
end
```
[Source code of the whole schema](https://github.com/adri/picape/blob/master/lib/picape_web/graphql/schema.ex)

The types file defines all object types using the `object` macro. In this case I used the `node` macro which defines a [Relay node interface](https://facebook.github.io/relay/graphql/objectidentification.htm#sec-Node-Interface). This just means that this object will get an `id` field with a [globally unique ID](https://facebook.github.io/relay/docs/graphql-object-identification.html). 

```
node object :recipe do
  field :title, :string
  field :image_url, :string
  field :is_planned, :boolean do 
    resolve: batched({Resolver.Order, :recipies_planned?})
  end  
  field :ingredients, list_of(:recipe_ingredient_edge) do
    resolve: batched({Resolver.Recipe, :ingredients_by_recipe_ids})
  end
end
```
[Source code of all types](https://github.com/adri/picape/blob/master/lib/picape_web/graphql/types.ex)

Resolvers take care of mapping the GraphQL schema to actual data. I see resolvers as glue code – the actual logic of how to fetch data should be in another layer of the application. This maps great to the concept of Phoenix 1.3 contexts. This way my resolvers are mostly one or two line calls to the relevant contexts.

```
defmodule PicapeWeb.Graphql.Resolver.Recipe do
  alias Picape.Recipe

  def all(_parent, _args, _info) do
    {:ok, Recipe.list_recipes()}
  end
end
```
[Source code of the recipe resolvers](https://github.com/adri/picape/blob/master/lib/picape_web/graphql/resolver/recipe.ex)

#### Phoenix 1.3 Contexts
Phoenix 1.3 introduced a concept called [contexts](https://hexdocs.pm/phoenix/contexts.html#thinking-about-design) as way to structure and design an Elixir application. 

A context groups related functionality. For example the context `Recipes` can include functions like `list_recipes` or `recipes_by_ids`. The function `list_recipes` lists all recipes and can be used in a GraphQL resolver, in a Phoenix controller or in a CLI command.

```elixir
defmodule Picape.Recipes do
  def list_recipes() do
    Repo.all(from recipe in Recipe)
  end
end
```

In OOP languages I often use DDD concepts like repositories, services, entities and value objects. I still have to figure out how this relates to Phoenix contexts.

#### Batching
I knew that at some point I had to take care of the [n + 1 problem](https://secure.phabricator.com/book/phabcontrib/article/n_plus_one/). In Javascript and PHP I have used a [DataLoader](https://github.com/facebook/dataloader). Absinthe offers [batching](http://absinthe-graphql.org/guides/ecto-best-practices/) for this. For example to fetch all ingredients for recipes the resolver for the `ingredients` field looks like this:

```
node object :recipe do
  field :ingredients, list_of(:recipe_ingredient_edge) do
    resolve: batched({Resolver.Recipe, :ingredients_by_recipe_ids})
  end
end
```

`batched` is a helper function that I've added. It takes a tuple in the form of `{Module, :function_name}` and passes it to the `batch` function from Absinthe which calls that tuple with a list of all recipe ids which need their ingredients. This way there will be only one database query instead of one for every recipe.

```
defp batched(batch_fun) do
  fn parent, _args, _ctx ->
    batch(batch_fun, parent.id, fn results ->
      {:ok, batch_results} = results
      {:ok, Map.get(batch_results, parent.id)}
    end)
  end
end
```


#### Parallel testing
I'm using the PostgreSQL database and [Ecto](https://github.com/elixir-ecto/ecto), a popular database wrapper for Elixir. Ecto has a concept called Sandbox, which enables database tests to run in parallel. This works by wrapping **every database connection by a test in a transaction** and rolling it back when the tests finishes. All database changes are then isolated to the test itself.

Using the Ecto Sandbox for GraphQL tests turned out to be straight forward. I made an ExUnit test case `AbsintheCase` used by all functional tests of the GraphQL API. This test case defines some helpers and includes the [`DataCase` with `async: true`](https://github.com/adri/picape/blob/b1afd7ef94f95c1f847929a83b129a31f4a33c2d/test/support/absinthe_case.ex#L7) which takes care of handling database transactions per test.

I also used a [Factory](https://github.com/adri/picape/blob/master/test/support/factory.ex) to make [fixtures for Ecto](http://blog.danielberkompas.com/elixir/2015/07/16/fixtures-for-ecto.html). Fixtures are local to each test. I've seen global fixtures (e.g. database seeds) used for tests like this. The problem with this is, that many tests depend on the same fixtures. This makes the fixtures hard to change and maintain.

```elixir
test "returns a list of essentials" do
  # Arrange: Insert fixture data into the database
  insert! :essential, name: "Flour"
  insert! :essential, name: "Milk"

  # Act: Run GraphQL query
  actual = run("{
     essentials {
      name
    }
  }")
	
  # Assert: Verify the response
  assert actual === {:ok, %{data: %{
    "essentials" => [
      %{ "name" => "Flour" },
      %{ "name" => "Milk" },
    ]
  }}}
end
```
[Source code of the full test](https://github.com/adri/picape/blob/master/test/graphql/query_essential_test.exs). 

I'm still growing the GraphQL tests. So far, running all tests took under 0.5 seconds. I consider this very fast for functional tests.

### The Future
So far I really like how GraphQL works in Elixir with Absinthe. I'm very happy with the speed of the functional tests and how concise the schema and type definitions are. 

I'll play with [subscriptions](https://hexdocs.pm/absinthe/1.4.0-beta.1/Absinthe.Schema.html#subscription/2) and the [async middleware](https://hexdocs.pm/absinthe/Absinthe.Middleware.Async.html) next. 