import React, { Fragment } from "react";

import { Text, Space, A, Ul, Li } from "jbx";

function MoreExperiments() {
  return (
    <Fragment>
      <Text>
        <strong>More experiments</strong>
      </Text>
      <Space h={0.5} />
      <Ul>
        <Li>
          <Text>
            <A href="https://javier.xyz/img2css/">img2css</A>, tool that can
            convert any image into a pure css image.
          </Text>
        </Li>
        <Li>
          <Text>
            <A href="https://javier.xyz/visual-center/">visual-center</A>, find
            the visual center of your images / logos.
          </Text>
        </Li>
        <Li>
          <Text>
            <A href="https://javier.xyz/morphin/">morphin</A>, create animated
            CSS transitions with box-shadow.
          </Text>
        </Li>
        <Li>
          <Text>
            <A href="https://clashjs.com/">clashjs</A>, JS AI Battle Game.
          </Text>
        </Li>
      </Ul>
    </Fragment>
  );
}

export default MoreExperiments;
