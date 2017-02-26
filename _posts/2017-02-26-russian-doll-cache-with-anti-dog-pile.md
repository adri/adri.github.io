---
layout: post
title: Improving Caching of Nested Fragment for Traffic Spikes
summary: 
categories: cache, invalidation
image: 
published: false
---

Last week I learned about the "Russian Doll" approach for caching template fragments effectively. 


## Russian Doll Cache

The Russian doll approach is a technique for building nested caches in templates. 


https://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works



In my case a Symfony3 application using the [Twig Cache Extension](https://github.com/twigphp/twig-cache-extension)

```
{% cache 'v1` %}
    {% for item in items %}
        {% cache 'v1' item %}
            {# ... #}
        {% endcache %}
    {% endfor %}
{% endcache %}
```



While you're free to hard-code any string for the cache key, the true power of Russian-Doll caching comes into play when we use a timestamp-based approach.

In `events.twig.html`:
```html
{% cache event.cacheKey   %}
	<h1>event.title</h1>
	
  {% cache 'event_comments' ~ event.cacheKey   %}
			{{ render(controller('event_comments', event.comments)) }}
	{% endcache %}
	
{% endcache %}
```

In `event_comments.twig.html`:
```html
<ul class="comments">
    {% foreach (comment in event.comments) %}
				{{ render(controller('comment', comment)) }}
    {% endforeach %}
</ul>
```



In 2016 [Matryoshka](https://github.com/laracasts/matryoshka)

- https://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works
- https://signalvnoise.com/posts/3112-how-basecamp-next-got-to-be-so-damn-fast-without-using-much-client-side-ui
- Series on Laracast 
- https://github.com/laracasts/matryoshka
- http://hawkins.io/2012/07/advanced_caching_part_2-using_strategies/

What is the dogpile effect?

Twig 
