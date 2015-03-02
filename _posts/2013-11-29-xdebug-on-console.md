---
layout:     post
title: Remote debugging for PHP cli scripts
summary: "Enable remote debugging for your console PHP scripts without much fuzz."
---

A quick tip, if you like to enable remote debugging for your console PHP scripts without much fuzz.
Add this line to your aliases file or in your `~/.bashrc`:

    alias debug='XDEBUG_CONFIG="remote_enable=1 remote_autostart=1"'

Now use the `debug` alias in front of your command. Example usage:

    debug app/console somecommand

Happy debugging!