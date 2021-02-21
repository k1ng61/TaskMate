import React, { useState } from 'react';
import styled from 'styled-components'
import { FaMapMarker, FaRegClock, FaCheckSquare } from 'react-icons/fa';
import constants from '../../constants';
import treasure from './treasure.png';

export default function Marker(props) {
  const [descShown, setDescShown] = useState(false);

  const number = props.number;
  const time = props.time;
  const period = props.period;
  const name = props.name;
  const onCheck = props.onCheck;
  const index = props.index;
  const total = props.numSteps;

  return (
    <Container onMouseLeave={() => setDescShown(false)} index={index} total={total}>
      <MarkTainer>
        <StyledMarker onMouseEnter={() => setDescShown(true)}/>
        <Number>
          {number}
        </Number>
      </MarkTainer>
      {descShown && <Description>
          <Name>{name}</Name>
          <Date>
          <FaRegClock /> {time}:00 {period}
          </Date>
          <Check onClick={() => {
            onCheck();
            setDescShown(false);
          }}/>
          {index == 1 && <span style={{marginTop: "10px"}}>Try to complete this in under 3 hours!</span>}
      </Description>}
    </Container>
  )
};

export function Treasure(props) {
  const [descShown, setDescShown] = useState(false);

  const reward = props.reward;

  return (
    <TreasureDiv onMouseLeave={() => setDescShown(false)}>
      <TreasureImg src={treasure} onMouseEnter={() => setDescShown(true)}/>
      {descShown && <Description style={{bottom: '90%', boxShadow: '10px 6px 31px -5px rgba(0,0,0,0.56)'}}>
        <div>Your Prize:</div>
        <Name style={{color: "#F2DB1B"}}>{reward}</Name>
      </Description>}
    </TreasureDiv>
  )
}

const TreasureImg = styled.img`
  width: 250px;
  height: auto;
  &:hover {
    cursor: pointer;
  }
`

const TreasureDiv = styled.div`
  position: absolute;
  right: -7%;
  top: 5%;
  z-index: 1;
`

const Check = styled(FaCheckSquare)`
  fill: #6FE590;
  height: 50px;
  width: 50px;
  margin-top: 10px;
  transition: fill 0.5s;
  &:hover {
    fill: #3ACE61;
    cursor: pointer;
  }
`

const Date = styled.div`
  display: flex;
  align-items: center;
  margin-top: 5px;
  svg {
    margin-right: 5px;
  }
`

const Name = styled.div`
  font-weight: bold;
  font-size: 23px;
`

const Description = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  position: absolute;
  bottom: 72px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 220px;
`

const StyledMarker = styled(FaMapMarker)`
  fill: ${constants.DARK_PURPLE};
  height: 75px;
  width: auto;
`

const Number = styled.div`
  position: absolute;
  font-weight: bold;
  font-size: 30px;
  background-color: white;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 9px;
  left: 50%;
  transform: translateX(-50%);
`

const MarkTainer = styled.div`
  position: relative;
  &:hover {
    cursor: pointer;
  }
`

const Container = styled.div`
  display: flex;
  position: absolute;
  z-index: 1;
  /* TESTING PURPOSES: */
  top: ${props => props.index % 2 == 0 ? (props.index == 2 && props.total == 4 ? 35 : 25) : 50}%;
  left: ${props => (props.index/props.total) * 100}%;
`


