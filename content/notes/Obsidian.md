Website: https://obsidian.md

Note taking app that works on plain-text files. It can be used to build a knowledge database based on the [[Zettelkasten principles]].

### Plugins
[List of plugins](https://github.com/topics/obsidian-md?o=desc&s=updated)

- [[Obsidian charts examples]]
- [[Obsidian Mermaid examples]]

### Custom CSS
Because then it's nice and minimal.

```css
.theme-dark {
  --background-secondary-alt: #202020;
}

/* Auto collapses side panels */
.app-container.is-left-sidedock-collapsed .side-dock-ribbon.mod-left.is-collapsed, 
.app-container.is-right-sidedock-collapsed .side-dock-ribbon.mod-right.is-collapsed {
  display: none;
} 

.app-container.is-left-sidedock-collapsed .workspace-split.mod-left-split[style="width: 0px;"],
.app-container.is-left-sidedock-collapsed .workspace-split.mod-right-split[style="width: 0px;"] {
  margin-left: 0;
  margin-right: 0;
}

/* Hide status bar */
.status-bar:not(:hover) {
  display: none;
}

/* Hide editor actions */
.view-header:not(:hover) .view-actions {
  opacity: 0.0;
  transition: opacity .25s ease-in-out;
}

/* Fix editor actions background */
.workspace > .workspace-split > .workspace-leaf:first-of-type:last-of-type .view-header {
  background-color: var(--background-primary-alt);
}

/* Highlight current line */
.cm-s-obsidian div.HyperMD-codeblock-bg.CodeMirror-activeline-background,
.CodeMirror-activeline {
  background-color: rgba(40, 40, 40) !important;
}

/* Use a thick cursor */
.cm-fat-cursor .CodeMirror-cursor  {
  width: 8px !important;
}

.CodeMirror-cursor {
  width: 2px !important;
  background: black !important;
  filter: invert(50%);
  opacity: 0.5;
}

/* Use same styles for code as in PHPStorm */
.cm-s-obsidian pre.HyperMD-codeblock,
.cm-s-obsidian span.cm-inline-code {
  color: var(--text-muted);
  font-family: Monaco;
  font-size: 15px;
  line-height: 1.6;
}

/* Align headlines with the text, iA Writer style  */
.CodeMirror-lines {
  padding: 50px;
  padding-top: 10px;
}

.cm-s-obsidian pre.HyperMD-header.HyperMD-header-1 {
  text-indent: -31px;
}
.cm-s-obsidian pre.HyperMD-header.HyperMD-header-2 {
  text-indent: -38px;
}
.cm-s-obsidian pre.HyperMD-header.HyperMD-header-3 {
  text-indent: -43px;
}

.cm-s-obsidian span.cm-formatting-task {
  font-family: Monaco;
}

/* Make header formattings less prominent */
.cm-formatting-header {
  opacity: 0.5;
}

/* Move title to the middle */
.view-header-title {
  max-width: 700px;
  padding-left: max(calc((100% - 700px) / 2 + 115px), 45px);
}

/* Use one background color, also for the title */
.workspace-leaf-header, .view-header {
  background-color:var(--background-primary) !important;
  border:none !important;
}
.view-header-title-container {
  padding-left:0;
}
.view-header-title-container:after {
  display:none;
}
```

### Wishlist
- Spell and grammar checker

### Sources 
[Organize Your Knowledge with Zettelkasten](https://www.youtube.com/watch?v=XUltI4v_UU4)

#tool #published 
