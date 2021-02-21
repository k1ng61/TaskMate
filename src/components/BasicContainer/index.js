import React from "react";
import styled from "styled-components";

export default function BasicContainer(props) {
  return (
    <Container style={props.style} noExtraLeftPadding={props.noExtraLeftPadding}>
      <Head>{props.name}</Head>
      <hr style={{height: "2px", background: "black"}}/>
      {props.children}
    </Container>
  );
}

const Head = styled.div`
  font-size: 43px;
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  padding-top: 60px;
  padding-right: 50px;
  padding-left: ${props => props.noExtraLeftPadding ? '50px' : '120px'};
  box-sizing: border-box;
`;
