import code from "@lekoarts/gatsby-theme-minimal-blog/src/styles/code";

code[".gatsby-highlight"]['pre[class~="language-elixir"]:before'] = {
  content: `"elixir"`,
  background: `#4e2a8e`,
  color: `white`,
};

code[".gatsby-highlight"]['pre[class~="language-php"]:before'] = {
  content: `"php"`,
  background: `#787CB5`,
  color: `white`,
};

export default code;
