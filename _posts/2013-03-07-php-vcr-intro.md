---
layout: post
title:  "Mocking HTTP interactions automatically using PHP-VCR"
summary: "If you want to test PHP code which calls REST-, SOAP- or other APIs you normally mock all API calls. Maintaining those mocks manually can be quite some work, especially when APIs change often."
---

If you want to test PHP code which calls REST-, SOAP- or other APIs you normally mock all API calls. Maintaining those mocks manually can be quite some work, especially when APIs change often.

![PHP-VCR](https://dl.dropbox.com/u/13186339/blog/php-vcr.png)

To make your live easier I'd like to introduce [PHP-VCR](http://github.com/adri/php-vcr). It is a port of the fabulous [VCR lib for ruby](http://github.com/vcr/vcr) which records your test suite's HTTP interactions and replays them during future test runs.

## What is VCR?
VCR is a library that is able to record HTTP network traffic over the wire and then replay those requests locally. Since recording occurs only once, all subsequent executions of your tests do not need to hit the network, and will likely be much faster.

##Installing PHP-VCR
There is no release yet but you can install PHP-VCR by adding the following line to your `composer.json` file. PHP-VCR is almost always used exclusivly while testing you should add it to your `require-dev` section and install them using `composer install --dev`.

    "require-dev": {
        "php-vcr/phpvcr": "dev-master"
    }

##Using PHP-VCR
Whenever your test suite issues an HTTP(s) request, it is intercepted by PHP-VCR. If a request hasn't been recorded it will be executed and it's response stored in a file (called `cassette`).

Lets see some example code. Enable PHP-VCR in your `bootstrap.php` right after including your class loader.

    require_once __DIR__ . "/../vendor/autoload.php";

    \VCR\VCR::turnOn();

From now on every HTTP request is intercepted. If you use no cassette, an exception is thrown so you know if there are any unwanted requests.

    public function testSomeMethod()
    {
        \VCR\VCR::insertCassette('example');
        // Now all requests will be recorded and replayed during future test runs

        file_get_contents('http://example.org');
        \VCR\VCR::eject();
    }

Executing this example VCR will store a request to `http://example.org` and it's response to the cassette file `tests/fixtures/example` which looks something like this:

    -
        request:
            method: GET
            url: 'http://example.org/'
            headers:
                Host: example.org
                User-Agent: 'Guzzle/3.0.7 curl/7.24.0 PHP/5.3.15'
                Content-Length: 0
        response:
            status: 301
            headers:
                Location: 'http://www.example.org/'
                Content-Type: 'text/html; charset=UTF-8'
                Date: 'Wed, 27 Feb 2013 04:41:41 GMT'
                Expires: 'Fri, 29 Mar 2013 04:41:41 GMT'
            body: "<HTML><BODY>…</BODY></HTML>"

If you don't like YAML for your cassette files you can alternatively choose a JSON format or implement your own.

<!-- , please see [how to configure PHP-VCR]().
[See more examples]()
 -->

##Conclusion
VCR provides the same experience as when you mock HTTP interactions manually, but speeds up your development process. Whenever an external API format changes, just delete your cassette file and run your test suite again to record all HTTP interactions.  VCR also helps you to identify requests which you've might not have been aware of. This way you can ensure every request is mocked.
