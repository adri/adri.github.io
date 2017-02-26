---
layout: post
title: Improving Caching of Nested Template Fragment for Traffic Spikes
summary: 
categories: cache, invalidation
image: 
published: false
---

When 

```html
{% cache 'event_detail_' ~ event.id ~ event.updatedAt   %}
	<h1>event.title</h1>
	
	{% cache 'event_comments' ~ event.id ~ event.updatedAt   %}
	  <ul class="comments">
		  {% foreach (comment in event.comments) %}
			  <li>{{ comment.author.name }} {{ comment.createdAt }}<br /> 
				  <p>{{ comment.body }}</p>
			  </li>
		  {% endforeach %}
	  </ul>
	{% endcache %}
{% endcache %}
```


## Russian Doll Cache

The Russian doll approach is a technique for building nested caches in templates.

While you're free to hard-code any string for the cache key, the true power of Russian-Doll caching comes into play when we use a timestamp-based approach.


[Twig Cache Extension](https://github.com/twigphp/twig-cache-extension)

In 2016 [Matryoshka](https://github.com/laracasts/matryoshka)

- https://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works
- https://signalvnoise.com/posts/3112-how-basecamp-next-got-to-be-so-damn-fast-without-using-much-client-side-ui
- Series on Laracast 
- https://github.com/laracasts/matryoshka
- http://hawkins.io/2012/07/advanced_caching_part_2-using_strategies/

What is the dogpile effect?

Twig 
