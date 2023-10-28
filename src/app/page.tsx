import { Container, MainHeader, Text, Space, HR, MoreExperiments } from "jbx";

import { CohesiveColors } from "./colors/main";
import Credits from "../Credits";
import { Suspense, Fragment } from "react";

import { Analytics } from "./analytics";

export default function Home() {
  return (
    <Fragment>
      <Container>
        <MainHeader>Cohesive Colors</MainHeader>
        <Space h={1} />
        <Text>Tool that can help you to create cohesive color palettes.</Text>
        <Space h={2} />
        <CohesiveColors />
        <HR />
        <MoreExperiments exclude="cohesive-colors" />
        <Space h={2} />
        <Credits />
      </Container>
      <Analytics />
    </Fragment>
  );
}
