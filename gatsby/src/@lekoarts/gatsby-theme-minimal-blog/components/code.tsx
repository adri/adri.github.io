/* eslint react/destructuring-assignment: 0 */
import React from "react";
import { Prism } from "prism-react-renderer";
(typeof global !== "undefined" ? global : window).Prism = Prism;

require("prismjs/components/prism-elixir");
import Code from "@lekoarts/gatsby-theme-minimal-blog/src/components/Code";

export default Code;
