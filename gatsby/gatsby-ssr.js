import React from "react";
export function onRenderBody({ setPostBodyComponents }) {
  setPostBodyComponents([
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon='{"token": "4fdb2278ddb14e89878f0873b295fcd8"}'
    ></script>,
  ]);
}
