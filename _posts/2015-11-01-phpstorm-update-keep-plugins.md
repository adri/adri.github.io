---
layout: post
title: "How to keep plugins when updating PhpStorm"
summary: "When updating PhpStorm my plugins seemed to be gone, but you can easily move them over." 
---

When installing a new version of PhpStorm I had the issue that 
only the settings were imported from the old version but not 
the plugins – so I had to install them again.

Plugins are located in `~/Library/Application\ Support/WebIdeXXX`
where XXX stands for the PhpStorm version number. Here is an example
where I've updated from PhpStorm 9.5 to 10 (`WebIde95` to `WebIde100`).

```bash
# backup just in case
cp -R ~/Library/Application\ Support/WebIde100 ~/Library/Application\ Support/WebIde100_backup

# move plugins over
cp -R ~/Library/Application\ Support/WebIde95/* ~/Library/Application\ Support/WebIde100/

# test it, then remove the backup
rm -fr ~/Library/Application\ Support/WebIde100_backup
```
# 