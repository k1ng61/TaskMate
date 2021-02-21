import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Wave from 'react-wavify'
import sand from './sand.svg';
import bigcloud from './bigcloud.svg';
import littlecloud from './littlecloud.svg';
import constants from '../../constants';
import sun from './sun.png';
import palms from './palms.png';
import treasure from './treasure.png';
import name from './title.png';
import { useFirebase, isEmpty, isLoaded } from 'react-redux-firebase';
import GoogleButton from 'react-google-button';
import { useSelector } from 'react-redux';

export default function Home(props) {
  const history = useHistory();
  const firebase = useFirebase();
  const [userIn, setUserIn] = useState(false);
  const profile = useSelector((state) => state.firebase.profile);
  const setCover = props.setCover;

  const buttonPressed = () => {
    setCover(true);
    setTimeout(() => {
      history.push('/planning');
    }, 1000)
    setTimeout(() => {
      setCover(false);
    }, 1500)
  };

  const loginWithGoogle = () => {
    firebase.login({
      provider: 'google',
      type: 'popup'
    })
  }

  useEffect(() => {
    if (!isEmpty(profile) && isLoaded(profile)) {
      setUserIn(true);
    } else {
      setUserIn(false);
    }
  }, [isEmpty(profile), isLoaded(profile)]);

  return (
    <Container>
      <BigCloud src={bigcloud}/>
      <LittleCloud src={littlecloud}/>
      <Sun src={sun} />
      <WaveContainer>
      <Wave 
        fill='#6ECDF5'
        style={{
          position: 'fixed',
          transform: 'translateY(-125px)'
        }}
        paused={false}
        options={{
          height: 30,
          amplitude: 20,
          speed: 0.2,
          points: 3
        }}
      />
      <Wave 
        fill='#01BCF0'
        style={{
          position: 'fixed',
          transform: 'translateY(-100px)'
        }}
        paused={false}
        options={{
          height: 30,
          amplitude: 30,
          speed: 0.15,
          points: 3
        }}
      />
      </WaveContainer>
      <img src={sand} style={{
        position: 'fixed',
        width: '100%',
        bottom: '0'
      }}/>
      <Palms src={palms} />
      <Treasure src={treasure} />
      <MainDiv>
        <Name src={name} />
        {userIn ?
        <GoButton onClick={buttonPressed}>Let's Go!</GoButton>
        : <GoogleButton onClick={loginWithGoogle} />
        }
      </MainDiv>
    </Container>
  )
}

const GoButton = styled.button`
  background-color: #F65058;
  color: white;
  font-size: 65px;
  font-weight: bold;
  padding: 25px 35px;
  border: none;
  border-radius: 40px;
  border-bottom: 5px solid #C03D58;

  &:hover {
    cursor: pointer;
  }
  &:active {
    outline: none;
    border-bottom: none;
    margin-top: 5px;
  }
  &:focus {
    outline: none;
  }
`

const Name = styled.img`
  width: 95%;
  display: block;
`

const MainDiv = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateY(-70px);
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-width: 1110px;
`

const Treasure = styled.img`
  position: fixed;
  bottom: 40px;
  right: 80px;
`

const Palms = styled.img`
  position: fixed;
  height: 500px;
  width: auto;
  bottom: 0;
  left: 2vw;
`

const shake = keyframes`
  0% {
    transform: translateX(0px);
  }
  25% {
    transform: translateX(-20px);
  }
  50% {
    transform: translateX(0px);
  }
  75% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0px);
  }
`

const twirl = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Sun = styled.img`
  position: fixed;
  top: 70px;
  right: 70px;
  height: 150px;
  width: 150px;
  animation: ${twirl} 50s linear infinite;
`

const LittleCloud = styled.img`
  position: fixed;
  top: 120px;
  left: 20px;
  animation: ${shake} 10s linear infinite;
`

const BigCloud = styled.img`
  position: fixed;
  width: 600px;
  animation: ${shake} 14s linear infinite;
`

const WaveContainer = styled.div`
  background-color: #01BCF0;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 17vh;
`

const Container = styled.div`
  height: 100vh;
  background-color: #E4F2FB;
`