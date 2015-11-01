---
layout: post
title: "Command duration in fish shell"
summary: "Display how long the last command took and notify when a long running command is finished." 
---

If you're interested in how long your commands run you might want to display the 
duration of the last command in the right prompt. I've made a similar [blog post for ZSH in 2013](http://adrian-philipp.com/post/shell-show-time-last-command-took/) but I'm now using the [fish shell](http://fishshell.com/).

![](https://dl.dropboxusercontent.com/u/13186339/blog/fish-cmd-duration.png)

To make it work create the file `~/.config/fish/functions/rprompt.fish` with this content;

```bash
function fish_right_prompt
    if test $CMD_DURATION
        # Show duration of the last command in seconds
        set duration (echo "$CMD_DURATION 1000" | awk '{printf "%.3fs", $1 / $2}')
        echo $duration
    end
    
    echo "😄"
end
```

And then source it in your `~/.config/fish/config.fish`:

```bash
. ~/.config/fish/functions/rprompt.fish
```

## Update: Adding OS X notifications

![](https://dl.dropboxusercontent.com/u/13186339/blog/fish-cmd-notification.png)

Sometimes it is nice to be notified when a long running command (> 10 sec) finishes. 
But because displaying notifications all the time can get quite annoying I've limited 
the notifications to be only shown for some commands and when iTerm is not in focus.

```bash
function fish_right_prompt
    if test $CMD_DURATION
        # Show duration of the last command
        set duration (echo "$CMD_DURATION 1000" | awk '{printf "%.3fs", $1 / $2}')
        echo $duration

        # OS X notification when a command takes longer than notify_duration
        set notify_duration 10000
        set exclude_cmd "bash|less|man|more|ssh"
        if begin
                test $CMD_DURATION -gt $notify_duration
                and echo $history[1] | grep -vqE "^($exclude_cmd).*"
            end

            # Only show the notification if iTerm is not focused
            echo "
                tell application \"System Events\"
                    set activeApp to name of first application process whose frontmost is true
                    if \"iTerm\" is not in activeApp then
                        display notification \"Finished in $duration\" with title \"$history[1]\"
                    end if
                end tell
                " | osascript
        end
    end
    
    # Be nice :)
    echo "😄"
end
```

