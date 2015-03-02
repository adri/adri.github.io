---
layout: post
title:  "Use Sauce Labs with the PHPUnit Selenium 2 Driver"
summary: "In order to use your existing PHPUnit Selenium2 test-cases, all you need to do is create an account on saucelabs.com."
---

[Sauce Labs](http://saucelabs.com/) is providing a cloud for Selenium tests. Each free account comes with 
200 minutes of free testing per month. This is very useful if you want to assure some 
basic functionallity of your website without having to set up your own [Selenium Grid](http://selenium-grid.seleniumhq.org/).

In order to use your existing PHPUnit Selenium2 test-cases, all you need to do is go
to [saucelabs.com](http://saucelabs.com/) and create an account. Go to the [your account page](https://saucelabs.com/account#) get your API key.

For your tests simply use their host and port 80. 

    require_once 'PHPUnit/Extensions/Selenium2TestCase.php';

    classGUITest extends \PHPUnit_Extensions_Selenium2TestCase { 

      public function __construct() {
        $user = '[your api key]';
        $token = '[your api token]';
        $this->setHost("$user:$token@ondemand.saucelabs.com");
        $this->setPort(80);
      }

      protected function setUp() {
        $this->setBrowser('firefox');
        $this->setBrowserUrl('http://[your link]/');
      }

      public function testLoginLinkOnStartpage() {
        $this->url('http://[your link]/');
        $link = $this->byId('link-login');
        $link->click();
        $this->assertEquals('Anmelden', $this->title());
      }
    }

Examples on now to write more tests are available in the unit test of the [Selenium2 unit test](https://github.com/sebastianbergmann/phpunit-selenium/blob/master/Tests/Selenium2TestCaseTest.php).

Run your test as usual using `phpunit`. 
You can see all your created jobs in the Sauce Labs [dashboard](https://saucelabs.com/jobs). They even provide video recordings of all tests.

