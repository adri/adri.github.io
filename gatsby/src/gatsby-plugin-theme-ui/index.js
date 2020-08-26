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
        // background: tailwind.colors.gray[9],
        background: "hsl(210deg, 30%, 8%)",
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
  },
  layout: {
    container: {
      padding: [3, 4],
      maxWidth: `900px`,
    },
  },
  links: {
    external: {
      paddingRight: "16px",
      backgroundPosition: "center right",
      backgroundImage:
        'url("data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjNjY2NjY2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMTAwIDEwMCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+PHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTkwLjQ3NCw1LjA0SDYxLjc4OWMtMi4zLDAtNC4xNjQsMS44NjQtNC4xNjQsNC4xNjRzMS44NjQsNC4xNjQsNC4xNjQsNC4xNjRoMTkuMDk1TDQwLjAyLDU0LjIzMiAgIGMtMS42MjcsMS42MjYtMS42MjcsNC4yNjMsMCw1Ljg4OWMwLjgxMywwLjgxMywxLjg3OSwxLjIyLDIuOTQ0LDEuMjJjMS4wNjUsMCwyLjEzMS0wLjQwNywyLjk0NC0xLjIyTDg2LjMxLDE5LjcxOHYxOC4xNyAgIGMwLDIuMywxLjg2NCw0LjE2NCw0LjE2NCw0LjE2NGMyLjMsMCw0LjE2NC0xLjg2NCw0LjE2NC00LjE2NFY5LjIwNEM5NC42MzgsNi45MDQsOTIuNzc0LDUuMDQsOTAuNDc0LDUuMDR6Ij48L3BhdGg+PHBhdGggZmlsbD0iIzY2NjY2NiIgZD0iTTc2LjA3MSw0Ni45NzZjLTIuMywwLTQuMTY0LDEuODY0LTQuMTY0LDQuMTY0djMyLjg1MmMwLDEuNTA1LTEuMjcxLDIuNzc2LTIuNzc2LDIuNzc2aC01My4wOSAgIGMtMS41MDUsMC0yLjc3Ni0xLjI3MS0yLjc3Ni0yLjc3NnYtNTMuMDljMC0xLjUwNSwxLjI3MS0yLjc3NiwyLjc3Ni0yLjc3NmgzMi45NjhjMi4zLDAsNC4xNjQtMS44NjQsNC4xNjQtNC4xNjQgICBzLTEuODY0LTQuMTY0LTQuMTY0LTQuMTY0SDE2LjA0MWMtNi4xMjMsMC0xMS4xMDQsNC45ODEtMTEuMTA0LDExLjEwNHY1My4wOWMwLDYuMTIzLDQuOTgxLDExLjEwNCwxMS4xMDQsMTEuMTA0aDUzLjA5ICAgYzYuMTIzLDAsMTEuMTA0LTQuOTgxLDExLjEwNC0xMS4xMDRWNTEuMTRDODAuMjM1LDQ4Ljg0MSw3OC4zNzEsNDYuOTc2LDc2LjA3MSw0Ni45NzZ6Ij48L3BhdGg+PC9nPjwvc3ZnPgo=")',
      backgroundSize: "13px",
      backgroundRepeat: "no-repeat",
    },
  },
});

export default theme;
