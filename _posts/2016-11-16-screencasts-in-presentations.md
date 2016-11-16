---
layout: post
title: Tips for making screencasts for presentations 
summary: As an alternative to live demos you can play screen casts during your tech talk. 
---

Technical talks can quickly become dry and boring. Live demos are a great way to practically illustrate 
the points you like to bring across. But live demos are also risky. Too often something goes wrong, 
so often that there is a name for it – the [“demo effect”](http://www.urbandictionary.com/define.php?term=demo%20effect). 
But there is an alternative.

## Prerecording videos 
For the talk [Experiences building apps with React Native](http://www.slideshare.net/adrian_philipp/experiences-building-apps-with-react-native-domcode-2016) I wanted to try something different. 

I love screencast series like for example [Destroy All Software](https://www.destroyallsoftware.com/screencasts/catalog). Recently I’ve been watching [LearnElixir](https://www.learnelixir.tv) and [LearnPhoenix](https://www.learnphoenix.tv), both are really nice. The combination of hearing an explanation with seeing someone interacting with software works really well for me. Here is an example screencast  that I used in the presentation:

<iframe width="560" height="315" src="https://www.youtube.com/embed/9-HsRVvsAxw" frameborder="0" allowfullscreen></iframe>    

## How to make the videos
Because I didn’t want to spend money on a screen casting software I went with the QuickTime Player which comes preinstalled on macOS. It has a screen recording option, go to `File -> New Screen Recording` or press `^⌘N`. 

![QuickTime: Record screen](https://cloud.githubusercontent.com/assets/133832/20364309/e2c51688-ac42-11e6-88df-ad9cb1d9f672.png)

Presentations are usually either in the format 4:3 or 16:9. I usually record the whole screen then use [HandBrake](https://handbrake.fr) to crop the screen to the required size. Before starting to record, make sure you position what you like to record within this ratio. 

#### Hide your desktop icons
If your desktop is a bit cluttered, you can hide your desktop icons. That makes the screen recording look a bit more neat. Run this in your terminal:

    defaults write com.apple.finder CreateDesktop false
    killall Finder

#### Make short videos
Recording videos short videos which are 10 seconds to 2 minutes long helps avoiding mistakes. You can expect to make multiple attempts before getting it right. The shorter the videos the less mistakes happen.

Shorter videos also help you to get the timing right when presenting. When a video ends, you have enough time to finish your explanation before starting the next.

#### Talk when recording
Talking already during the recording helps a lot because it usually aligns when you are presenting. Pauses are at the right time and the presentation seems more natural. 

## Summary
Adding a bunch of short prerecorded screen casts to your presentation is not too much work, makes your talk more interesting and doesn’t suffer from the demo effect. 
