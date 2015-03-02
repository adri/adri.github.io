---
layout: post
title: PHPUnit find slow tests
summary: "When optimizing your testsuite it can be handy do find out how long each test takes to run. It would be nice to have a list of and how many seconds they took."
---

When optimizing your testsuite it can be handy do find out how long each test takes to run.
It would be nice to have a list of and how many seconds they took, like this:

     $ phpunit-report-runtime
     0.29307007789612, "VCR\\Util\\SoapClientTest::testDoRequestHookDisabled"
     0.16475319862366, "VCR\\CassetteTest::testRecordAndPlaybackRequest"
     0.092710018157959, "VCR\\Util\\SoapClientTest::testDoRequest"
     0.031861782073975, "VCR\\LibraryHooks\\SoapTest::testShouldInterceptCallWhenEnabled"
     0.026772022247314, "VCR\\LibraryHooks\\AbstractFilterTest::testRegisterAlreadyRegistered"

One solution is to [write your own test listener](http://stackoverflow.com/a/5218124/2618289) and add it to your `phpunit.xml`.
If you don't like to modify your code, it is possible to parse out the time from [PHPUnit's JSON test result](http://phpunit.de/manual/3.7/en/logging.html#logging.json). Put the following alias in your shells initialization script (like `.bashrc`).

    alias phpunit-report-runtime="phpunit --log-json php://stdout \
        | awk '\$NF ~ '/,/' && \$1 ~ /\"(test|time)\"/' \
        | cut -d: -f2- \
        | sed \"N;s/\n/--/\"  \
        | sed \"s/,//\"   \
        | awk 'BEGIN{FS=\"--\"}; {print \$2 \$1}' | sort -r \
        | head -n 5"

Running the alias `phpunit-report-runtime` in your project prints the top 5 slowest tests with the slowest test at the top.
By changing `head -n 5` you can adjust the amount of tests printed.