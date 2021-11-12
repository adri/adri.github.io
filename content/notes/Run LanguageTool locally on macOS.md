Grammarly like tool but without sending all of my keystrokes to the cloud. The [Safari extension](https://apps.apple.com/app/languagetool-for-safari/id1534275760) enables grammar checks on all text inputs. 

To make it work it needs multiple components installed locally:
* `languagetool` itself 
* `fasttext` for language detection
* `fasttext` model for language detection

### Installation
```
brew install languagetool
```

To test it out run the following commands. The `curl` command should show JSON output.
```
languagetool-server --port 8081 --allow-origin '*'
```
Open http://localhost:8081/v2/check?language=en-US&text=my+text to see if it works.

### Local HTTPs
To make the local server usable in Safari, it needs to use HTTPS. We can use caddy as a reverse proxy locally. It automatically manages a locally trusted certificate.

```
brew install caddy
```

To test if HTTPs proxying works, run the following command. 
```
caddy reverse-proxy --from localhost:8082 --to localhost:8081
```

Open https://localhost:8082/v2/check?language=en-US&text=my+text to see if it works. 

### Fasttext
Without this tool, LanguageTool will make mistakes detecting the language and recommend changes based on another language.

```
brew install fasttext
```

```
mkdir /usr/local/share/fasttext
curl https://dl.fbaipublicfiles.com/fasttext/supervised-models/lid.176.bin -o /usr/local/share/fasttext/lid.176.bin
```

### Start in background
Create the file `~/Library/LaunchAgents/org.languagetool.server.plist` with this content:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <true />
        <key>Label</key>
        <string>org.languagetool.server</string>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/local/bin/languagetool-server</string>
            <string>--port</string>
            <string>8081</string>
            <string>--allow-origin</string>
            <string>*</string>
        </array>
        <key>RunAtLoad</key>
        <true />
        <key>KeepAlive</key>
        <true />
        <key>inetdCompatibility</key>
        <dict>
            <key>Wait</key>
            <false />
        </dict>
    </dict>
</plist>
```

Create the file `~/Library/LaunchAgents/org.languagetool.caddy-proxy.plist` with this content:
```
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
    <dict>
        <key>KeepAlive</key>
        <true />
        <key>Label</key>
        <string>org.languagetool.caddy-proxy</string>
        <key>ProgramArguments</key>
        <array>
            <string>/usr/local/bin/caddy</string>
            <string>reverse-proxy</string>
            <string>--from</string>
            <string>localhost:8082</string>
            <string>--to</string>
            <string>localhost:8081</string>
        </array>
        <key>RunAtLoad</key>
        <true />
        <key>KeepAlive</key>
        <true />
        <key>inetdCompatibility</key>
        <dict>
            <key>Wait</key>
            <false />
        </dict>
    </dict>
</plist>
```

Then load both automatically at startup:
```
launchctl load ~/Library/LaunchAgents/org.languagetool.server.plist
launchctl load ~/Library/LaunchAgents/org.languagetool.caddy-proxy.plist
```

Use `launchctl unload [file]` to uninstall.

### Safari Extension
In the LanguageTool settings, under "Experimental settings" enter `https://localhost:8082/v2` as the `Other server` setting. 

### Obsidian Integration
Use [Obsidian LanguageTool Plugin](https://github.com/Clemens-E/obsidian-languagetool-plugin) with the URL `https://localhost:8082` to enable LanguageTool on notes.

### Sources
- [Install via HomeBrew](https://tex.stackexchange.com/questions/538530/how-to-setup-languagetool-for-texstudio-installed-via-homebrew-on-macos)
- [Documentation](https://dev.languagetool.org/http-server)
- [Setup Safari extension](https://forum.languagetool.org/t/languagetool-for-safari/5554/22)
- [Launchd configuration](https://www.launchd.info)


#published 