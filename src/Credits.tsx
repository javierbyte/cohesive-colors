import { Text, A } from "jbx";

export default function Credits() {
  return (
    <Text>
      Made by <A href="https://javier.xyz">Javier Bórquez</A>
      {". Online since 2015. Code on "}
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
