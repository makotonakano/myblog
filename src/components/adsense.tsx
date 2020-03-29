import React from "react";
import AdSense from "react-adsense";
import styled from "@emotion/styled";

const Container = styled.div`
  margin-bottom: 1rem;
  & > ins.adsbygoogle {
    background: transparent !important;
  }
`;

const Ad = () => (
  <Container>
    <AdSense.Google
      client="ca-pub-7607948023862713"
      slot="9796876115"
      style={{
        display: "block"
      }}
      format="rectangle"
      responsive="false"
    />
  </Container>
);
export default Ad;
