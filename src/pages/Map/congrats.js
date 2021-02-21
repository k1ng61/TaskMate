import React from "react";
import styled from "styled-components";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import treasure from './treasure.png';

export default function Congrats(props) {
  const { width, height } = useWindowSize();
  const reward = props.reward;
  const onClick = props.onClick;

  return (
    <Container>
      <Confetti width={width} height={height} />
      <Treasure src={treasure} />
      <h1>Congratulations!</h1>
      <div>
        You've successfully completed all of your tasks.
      </div>
      <div>You get: <strong>{reward}</strong></div>
      <XSpan onClick={onClick}>✘</XSpan>
    </Container>
  );
}

const XSpan = styled.span`
  position: fixed;
  top: 20px;
  left: 20px;
  color: white;
  font-size: 80px;
  &:hover {
    cursor: pointer;
  }
`

const Treasure = styled.img`

`

const Container = styled.div`
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background-color: #00000050;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  div {
    color: white;
    font-size: 25px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 80px;
    color: gold;
    margin-bottom: 12px;
  }
`;
