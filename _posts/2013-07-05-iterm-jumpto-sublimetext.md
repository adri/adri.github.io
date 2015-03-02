---
layout:     post
title: "iTerm2: Jump to Location in Sublime Text 2/3"
---

Just a quick timesaver: Jump from stack traces in iTerm 2 straight to the right location in Sublime Text 3.

`CMD + Click` on a exeption...
![Exception in iTerm 2](https://dl.dropbox.com/u/13186339/blog/subl1.png)

And check it out in Sublime Text...
![Code in Sublime Text 3](https://dl.dropbox.com/u/13186339/blog/subl2.png)

##Configure iTerm 2
If you already [setup your `subl` command](http://www.sublimetext.com/docs/2/osx_command_line.html), just go to your iterm 2 `Preferences` change the dropdown to `Always run command...` and paste this:

    /usr/local/bin/subl \1:\2

Under `Profiles` > `Advanced` > `Semantic History`:

![iTerm 2 configuration](https://dl.dropbox.com/u/13186339/blog/iterm.png)



Happy coding!
