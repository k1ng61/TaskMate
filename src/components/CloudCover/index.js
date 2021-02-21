import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import blcloud from '../../pages/Map/clouds/blcloud.svg'
import tlcloud from '../../pages/Map/clouds/tlcloud.svg'
import brcloud from '../../pages/Map/clouds/brcloud.svg'
import trcloud from '../../pages/Map/clouds/trcloud.svg'

export default function CloudCover(props) {

  const triggerCover = () => {

  }

  useEffect(() => {
    triggerCover();
  }, [])

  return (
    <CloudDiv cover={cover}>
      <img src={blcloud} style={{top: '0', left: '0'}}/>
      <img src={tlcloud} style={{top: '0', right: '0'}}/>
      <img src={brcloud} style={{bottom: '0', left: '0'}}/>
      <img src={trcloud} style={{bottom: '0', right: '0'}}/>
      <img src={brcloud} style={{top: '50%', left: '0'}}/>
      <img src={tlcloud} style={{top: '0', left: '50%'}}/>
      <img src={trcloud} style={{top: '30%', right: '0'}}/>
    </CloudDiv>
  )
};

const cover = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(5);
  }
  50% {

  }
  60% {
    transform: scale(5);
  }
  100% {
    transform: scale(1);
  }
`

const CloudDiv = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  img {
    position: absolute;
    ${props => props.cover && css`
      animation: ${cover} 1.5s;
  `}
  }
`
