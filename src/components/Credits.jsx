import React from "react";

import { Text, A } from "jbx";

export default function Credits() {
  return (
    <Text>
      Made by <A href="https://javier.xyz">javierbyte</A>.{" Based on "}
      <A
        target="_blank"
        rel="noopener noreferrer"
        href="https://dribbble.com/shots/166246-My-Secret-for-Color-Schemes">
        this idea
      </A>
      {"."}
    </Text>
  );
}
