/** @jsx jsx */
import {
  jsx,
  Heading,
  MenuButton,
  Close as CloseButton,
  useColorMode,
} from "theme-ui";
import { Flex } from "@theme-ui/components";
import { useState } from "react";
import useMinimalBlogConfig from "@lekoarts/gatsby-theme-minimal-blog/src/hooks/use-minimal-blog-config";
import ColorModeToggle from "./colormode-toggle";
import Navigation from "@lekoarts/gatsby-theme-minimal-blog/src/components/navigation";
import { SearchButton } from "./search-button";

const Header = ({ title = null, hideSearch = false }) => {
  const { navigation: nav } = useMinimalBlogConfig();
  const [colorMode, setColorMode] = useColorMode();
  const [navState, setNavState] = useState("closed");
  const { externalLinks } = useMinimalBlogConfig();
  const isDark = colorMode === `dark`;
  const toggleColorMode = (e: any) => {
    e.preventDefault();
    setColorMode(isDark ? `light` : `dark`);
  };

  return (
    <header sx={{ mb: [1, 2] }}>
      <div
        sx={{
          boxSizing: `border-box`,
          // variant: `dividers.bottom`,
          alignItems: `center`,
          justifyContent: `space-between`,
          // mt: 3,
          color: `secondary`,
          a: {
            color: `secondary`,
            ":hover": { color: `heading` },
            borderBottomWidth: "0px",
          },
          flexFlow: `wrap`,
          display: navState === "open" ? "flex" : "none",
        }}
      >
        <Navigation nav={nav} />
        <Flex sx={{ alignItems: "center", "a:not(:first-of-type)": { ml: 2 } }}>
          <ColorModeToggle isDark={isDark} toggle={toggleColorMode} />
          {hideSearch === false && <SearchButton />}
          {navState == "open" && (
            <CloseButton
              sx={{
                cursor: "pointer",
                width: "3rem",
                height: "3rem",
                justifyContent: "flex-end",
              }}
              onClick={() => setNavState("closed")}
            />
          )}
        </Flex>
      </div>

      <Flex sx={{ alignItems: `flex-start`, justifyContent: `space-between` }}>
        {title ? (
          <Heading variant="styles.h2" sx={{ mt: 2 }}>
            {title}
          </Heading>
        ) : (
          <p></p>
        )}

        {navState === "closed" && (
          <div sx={{ display: "grid" }}>
            <MenuButton
              sx={{
                cursor: "pointer",
                width: "3rem",
                height: "3rem",
                justifyContent: "flex-end",
              }}
              onClick={() => setNavState("open")}
              aria-label="Toggle Menu"
            />
          </div>
        )}
      </Flex>
    </header>
  );
};

export default Header;
