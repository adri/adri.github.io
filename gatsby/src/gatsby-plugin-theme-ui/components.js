/* eslint react/prop-types: 0 */
/** @jsx jsx */
import { jsx, Link } from "theme-ui";
import React from "react";
import { preToCodeBlock } from "mdx-utils";
import { Text } from "@theme-ui/components";
import Code from "../@lekoarts/gatsby-theme-minimal-blog/components/code";
import Title from "@lekoarts/gatsby-theme-minimal-blog/src/components/title";

const components = {
  Text: ({ children, ...props }) => <Text {...props}>{children}</Text>,
  Title: ({ children, text, ...props }) => (
    <Title text={text} {...props}>
      {children}
    </Title>
  ),
  a: ({ href, children, ...props }) => {
    if (href.startsWith("https://")) {
      console.log(href);
      return (
        <Link variant="external" href={href} {...props}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
  pre: (preProps) => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },
  wrapper: ({ children }) => <>{children}</>,
};

export default components;
