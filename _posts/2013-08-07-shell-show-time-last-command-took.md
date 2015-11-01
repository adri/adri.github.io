---
layout:     post
title: "ZSH: Show duration the last command took in prompt"
summary: "Always display how long the last command took."
---

Hi Shellers,

Development speed matters to many programmers, which is why I like to keep an eye on how long commands run:

![](https://dl.dropboxusercontent.com/u/13186339/blog/timer.png)

![](https://dl.dropboxusercontent.com/u/13186339/blog/timer2.png)

If you use ZSH, paste this in your startup script, I put it in `.zsh.after/prompt.zsh`. It adds the run time of the last command in seconds to your right command prompt.

```bash
function preexec() {
  timer=${timer:-$SECONDS}
}

function precmd() {
  if [ $timer ]; then
    timer_show=$(($SECONDS - $timer))
    export RPROMPT="%F{cyan}${timer_show}s %{$reset_color%}"
    unset timer
  fi
}
```

In case you don't use ZSH, see [this script](http://www.twistedmatrix.com/users/glyph/preexec.bash.txt) which emulates above functions in bash. You need to add a `preexec_install`  after you define above functions.


