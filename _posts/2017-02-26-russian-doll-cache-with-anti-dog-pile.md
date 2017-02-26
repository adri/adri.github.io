---
layout: post
title: Improving Caching of Nested Fragment for Traffic Spikes
summary: 
categories: cache, invalidation
image: 
published: false
---

Caching is hard – but also useful to speed up 

Last week I learned two caching techniques and how to combine them.
  
First "dog pile" effect which occurs when a cache expires during a traffic spike and many users. 
Then I learned about the "Russian Doll" approach for caching template fragments effectively. 

 have to rebuild the cache at the same time, leading to heavy load on a database. 

## Russian Doll Cache

The Russian doll approach works best when combining two techniques: 

1. Have 

While you're free to hard-code any string for the cache key, the true power of Russian-Doll caching comes into play when we use a timestamp-based approach.

* [How key-based cache expiration works, 2012](https://signalvnoise.com/posts/3113-how-key-based-cache-expiration-works)
* [How Basecamp Next got to be so damn fast without using much client-side UI](https://signalvnoise.com/posts/3112-how-basecamp-next-got-to-be-so-damn-fast-without-using-much-client-side-ui)
* [Matryoshka, PHP library, 2016](https://github.com/laracasts/matryoshka)

### Traffic Spikes - the "dog pile" effect

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





What is the dogpile effect?

Twig 
