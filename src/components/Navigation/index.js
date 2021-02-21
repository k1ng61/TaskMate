import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";
import {
  FaBars,
  FaMapMarkedAlt,
  FaInfoCircle,
  FaUsersCog,
} from "react-icons/fa";
import constants from "../../constants";

export default function Navigation() {
  const [active, setActive] = useState(false);
  const [moveOut, setMoveOut] = useState(false);
  const location = useLocation();

  const toggleActive = () => {
    setActive(!active);
  };

  const toggleAndPushBack = () => {
    setMoveOut(true);
    setTimeout(() => {
      setMoveOut(false);
      setActive(!active);
    }, ANIMATION_DURATION_MS);
  };

  const isActive = (name) => {
    return location.pathname == name;
  }

  return (
    <Container>
      <StyledBars onClick={toggleActive} />
      {active && (
        <Nav moveOut={moveOut}>
          <div style={{
            display: "flex",
            flexDirection: "column",
          }}>
            <XDiv onClick={toggleAndPushBack}>×</XDiv>
            <Item to="/map" active={isActive('/map')}>
              <FaMapMarkedAlt />
              Map
            </Item>
            <Item to="/insights" active={isActive('/insights')}>
              <FaInfoCircle />
              Insights
            </Item>
          </div>
          <BottomItem to="/settings" active={isActive('/settings')}>
            <FaUsersCog />
          </BottomItem>
        </Nav>
      )}
    </Container>
  );
}

const Item = styled(Link)`
  color: black;
  text-decoration: none;
  display: flex;
  align-items: center;
  margin-left: 15px;
  font-size: 25px;
  padding: 10px;
  border-radius: 15px;
  box-sizing: border-box;
  margin-top: 15px;

  &:nth-child(2) {
    margin-top: 30px;
  }

  svg {
     height: 50px;
     width: auto;
     margin-right: 15px;
   }

   ${props => props.active && `
      background-color: #C4C4C460;
   `}
   &:hover {
     cursor: pointer;
   }
`;

const BottomItem = styled(Link)`
   align-self: center;
   color: black;
   padding: 10px 15px;
   border-radius: 15px;
   svg {
     height: 95px;
     width: auto;
   }
   ${props => props.active && `
      background-color: #C4C4C460;
   `}
   &:hover {
     cursor: pointer;
   }
`;

const StyledBars = styled(FaBars)`
  position: fixed;
  top: 30px;
  left: 30px;
  height: 50px;
  width: auto;

  &:hover {
    cursor: pointer;
  }
`;

const XDiv = styled.div`
  font-weight: bold;
  font-size: 50px;

  &:hover {
    cursor: pointer;
  }
`;

const moveIn = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0%);
  }
`;

const moveOut = keyframes`
  from {
    transform: translateX(0%);
  }
  to {
    transform: translateX(-100%);
  }
`;

const ANIMATION_DURATION_MS = 500;

const Nav = styled.div`
  height: 100vh;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${constants.DARK_YELLOW};
  padding: 10px;
  box-sizing: border-box;

  animation: ${moveIn} ${ANIMATION_DURATION_MS}ms forwards;
  ${(props) =>
    props.moveOut &&
    css`
      animation: ${moveOut} ${ANIMATION_DURATION_MS}ms forwards;
    `}
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
`;
