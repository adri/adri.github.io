---
layout: post
title: "PHP-VCR: Integration with PHPUnit"
summary: "Quick instructions how to use PHP-VCR annotations in PHPUnit."
---

Install [PHP-VCR PHPUnit-Testlistener](https://github.com/php-vcr/phpunit-testlistener-vcr) in order to integrate [PHP-VCR](http://php-vcr.github.io) with PHPUnit. 

    # Add PHPUnit testlistener
    php composer.phar require php-vcr/phpunit-testlistener-vcr

You can use the `@vcr [cassette filename]` annotation to turn on PHP-VCR for a single test.

    /**
     * @vcr [cassette_path]
     */
    public function testInterceptsWithAnnotations()
    {
        file_get_contents('http://example.com');
    }

Replace `[cassette_path]` with the path to your cassette file relative to the cassette path (default `tests/fixtures`). Requests are intercepted and stored into the cassette file provided via the `@vcr` annotation. PHP-VCR is automatically turned on and off.