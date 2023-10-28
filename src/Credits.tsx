import { Text, A } from "jbx";

export default function Credits() {
  return (
    <Text>
      Website by <A href="https://javier.xyz">javierbyte</A>
      {". Code on "}
      <A href="https://github.com/javierbyte/cohesive-colors">GitHub</A>
      {". Based on "}
      <A
        target="_blank"
        rel="noopener noreferrer"
        href="https://dribbble.com/shots/166246-My-Secret-for-Color-Schemes"
      >
        this idea
      </A>
      {" by Erica Schoonmaker."}
    </Text>
  );
}
