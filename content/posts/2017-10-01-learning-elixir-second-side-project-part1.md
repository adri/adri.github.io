---
layout: post
title: "Elixir side-project #2: Planning Recipes with a Supermarket API (1/2)"
slug: /post/learning-elixir-second-side-project-part1
summary: Introduction to my next side-project to learn Elixir.
categories: elixir, side-project, graphql, react, next.js
banner: https://user-images.githubusercontent.com/133832/30913555-ede256ac-a390-11e7-8f3a-b8e70b00e702.png
published: true
---

Learning Elixir during my [last side-project](/post/learning-elixir-first-side-project) was a lot of fun. The combination of solving a problem and learning something new works well for me. 

In the past year I have been working with GraphQL APIs – mostly written in PHP. But how does it work in Elixir? I wanted to learn **how GraphQL APIs work in Elixir**. For me it was clear: I needed another side-project. 

![Elixir](https://user-images.githubusercontent.com/133832/30913555-ede256ac-a390-11e7-8f3a-b8e70b00e702.png)

I was looking for a problem with a small domain but with some complexity. The idea was born to speed up our grocery shopping by ordering recipes and their ingredients via a supermarket API. 

This is part 1 of a blog post series **Elixir side-project #2**.
1. Planning Recipes with a Supermarket API (1/2)
2. [A Graphql API with Elixir (2/2)](/post/learning-elixir-second-side-project-part2)

### Planning Recipes with a Supermarket API
A few months ago we changed our grocery shopping habits. Instead of going to a store a few times a week, we now order ingredients via an app and get them delivered the next day. Usually we order two times a week. When ordering, we plan what we are going to eat in the next 3-4 days.  
 
Every time when we order we think of recipes to cook and their ingredients. Then we add every ingredient to the app. We also add essential ingredients like milk or eggs if we need them. 

Automating this process sounded fun. Some things are important for us, we want to...
* order enough ingredients but avoid throwing food away
* always have the essentials in stock without forgetting some
* reduce the time it takes to order by automation but with the same result

### Picape
Picape, pronounced `/pɪkɑpiː/`, is a website that I made to manage and order recipes and ingredients. Ingredients are added automatically to an order via a supermarket API. Here a demo how this looks like:

<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/qhtsn7rZClQ" frameborder="0" allowfullscreen></iframe></div>
<br />

The domain is highly connected. A recipe has ingredients which can be connected to an order and so on. This makes it a great use-case for GraphQL. The concepts are:

1. **Recipes**<br /> 
A list of recipes that can be planned. Those recipes have ingredients. When a recipe is planned, their ingredients get added automatically to the order via the supermarket API.  

2. **Essentials**<br />
Some ingredients should not be added automatically to the cart because they are always in stock. These are ingredients like herbs, milk products and frozen goods. Instead: if a recipe needs essentials, those should be highlighted only.  

3. **Ingredients**<br />
Every ingredient is mapped to a product in the supermarket API. Choosing a specific product and naming it reduces friction. E.g. I just order *"tomato sauce"* and don't think *"which tomato sauce did I choose again?"*.   

4. **Current order**<br />
The payment happens via the app itself not on the website. But the order holds a list of ingredients and for which recipe these were planned. The order also has a total amount. 


The most complex part of the project is the synchronisation logic with the supermarket API. I like to be able to order products in the app as well as on the website. The ingredients ordered via the website should not delete ordered products or order too many.

### What's next
This first blog post describes the problem I worked on and explains the concepts used.

In the the [next blog post](/post/learning-elixir-second-side-project-part2). I’ll describe how to build a GraphQL API with Elixir using this domain.