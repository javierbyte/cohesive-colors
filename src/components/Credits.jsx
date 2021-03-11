import React, { Fragment } from "react";

import { Box, Text, Space, A } from "./jbx.jsx";

export default function Credits() {
  return (
    <Fragment>
      <Box
        padding={0.25}
        style={{
          display: "inline-block",
          backgroundColor: "rgba(246,229,141,.19)",
          borderLeft: "3px solid #f6e58d",
        }}
      >
        <Text>
          {
            "I'm working on an iOS app! Create and save cohesive color palettes, "
          }
          <strong>
            <A
              href="http://eepurl.com/cZwQn9"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sign Up
            </A>
          </strong>
          {" to be the first to know!"}
        </Text>
      </Box>

      <Space h={2} />
      <Text>
        Made by <A href="https://javier.xyz">javierbyte</A>.{" "}
        <A
          target="_blank"
          rel="noopener noreferrer"
          href="https://dribbble.com/shots/166246-My-Secret-for-Color-Schemes"
        >
          this idea
        </A>
        .
      </Text>
    </Fragment>
  );
}
