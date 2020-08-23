import { merge } from "theme-ui";
import { tailwind } from "@theme-ui/presets";
import defaultTheme from "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui/index";

const theme = merge(defaultTheme, {
  useColorSchemeMediaQuery: true,
  colors: {
    modes: {
      dark: {
        text: tailwind.colors.gray[4],
        primary: tailwind.colors.blue[5],
        secondary: `#7f8ea3`,
        background: tailwind.colors.gray[9],
      },
    },
  },
  styles: {
    header: {
      mb: "1",
      backgroundColor: "red",
      borderBottom: `0px`,
    },
    code: {
      color: `text`,
      backgroundColor: `secondary`,
    },
    p: {
      fontSize: ["1.1rem", "1.1rem", "1.2rem"],
    },
    ul: {
      li: {
        fontSize: ["1.1rem", "1.1rem", "1.2rem"],
      },
    },
    ol: {
      li: {
        fontSize: ["1.1rem", "1.1rem", "1.2rem"],
      },
    },

    // a: {
    //   '[href^="http://"]': {
    //     backgroundColor: "red",
    //     paddingRight: "13px",
    //   },
    // },
  },
});

export default theme;
