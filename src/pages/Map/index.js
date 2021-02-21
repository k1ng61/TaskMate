import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import Navigation from '../../components/Navigation';
// CLOUDS
import blcloud from './clouds/blcloud.svg';
import brcloud from './clouds/brcloud.svg';
import tlcloud from './clouds/tlcloud.svg';
import trcloud from './clouds/trcloud.svg';
import ship from './ship.png';
import Snap from 'snapsvg-cjs';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { MainPath, sailpath } from './largevalues';
import Marker, { Treasure } from './marker';
import Congrats from './congrats';
import island1 from './island1.png';
import island2 from './island2.png';
import island3 from './island3.png';
import dragon from './dragon.png';
import wave from './wave.png';


export default function Map() {
  const profile = useSelector((state) => state.firebase.profile);
  const [step, setStep] = useState(0);
  const [steps, setSteps] = useState([]);
  const numSteps = steps.length;
  const [reward, setReward] = useState("");
  const [congratsShown, setCongratsShown] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!isEmpty(profile)) {
      console.log('pulling data')
      const steps = profile.day.steps;
      const reward = profile.day.reward;
      setSteps(steps);
      setReward(reward);
    }
  }, [profile])

  const moveShip = (step, newStep) => {
    let map = Snap('#svg-doc');
    let ship  = map.select('#ship');
    let spaceshipbbox = ship.getBBox();
    let sail_path = map.path(sailpath).attr({ 'fill': 'none', 'stroke': 'none'});
    let flight_path_length = Snap.path.getTotalLength(sail_path);
    let delta = flight_path_length / numSteps;
    let start = step * delta;
    let end = newStep * delta;

    Snap.animate(start, end, function( step ) {
        let moveToPoint = Snap.path.getPointAtLength( sail_path, step );
        let x = moveToPoint.x - (spaceshipbbox.width/2);
        let y = moveToPoint.y - (spaceshipbbox.height/2);
        ship.transform('translate(' + x + ',' + y + ')');
      }, 1500);
  }

  const goToNextStep = () => {
    let newStep = step + 1;
    moveShip(step, newStep);
    setStep(newStep);
  };

  return (
    <Container>
      <Main>
        <PathHolder>
          <Treasure reward={reward} />
          <Wave src={wave} style={{
            top: "10%"
          }}/>
          <Wave src={wave} style={{
            bottom: "20%",
            left: "5%"
          }}/>
          <Wave src={wave} style={{
            bottom: "40%",
            left: "10%"
          }}/>
          <Wave src={wave} style={{
            right: "20px",
          }}/>
          <Wave src={wave} style={{
            top: "30%",
            left: "40%"
          }}/>
          <Wave src={wave} style={{
            bottom: "30%",
            left: "55%"
          }}/>
          <Wave src={wave} style={{
            bottom: "10%",
            left: "60%"
          }}/>
          <Wave src={wave} style={{
            bottom: "40%",
            right: "10px"
          }}/>
          {steps.map((stepobj, index) => {
            return <Marker 
              index={index}
              numSteps={numSteps}
              number={index + 1}
              name={stepobj.name}
              time={stepobj.time}
              period={stepobj.period}
              onCheck={() => {
                if (index == step) {
                  goToNextStep();
                  if (index == numSteps - 1) {
                    setCongratsShown(true);
                  }
                }
              }}
            />
          })}
          <Island1 src={island1} />
          <Island2 src={island2} />
          <Island3 src={island3} />
          <Dragon src={dragon} />
          <div style={{zIndex: "1"}}>{MainPath}</div>
        </PathHolder>
      <Cloud src={trcloud} top right style={{
        transform: 'translateX(35%) translateY(-20px)'
      }} animate={25}/>
      <Cloud src={brcloud} bottom right style={{
        transform: 'translateX(35%) translateY(40px)'
      }} animate={12}/>
      <Cloud src={tlcloud} top left style={{
        transform: 'translateX(-35%) translateY(-40px)'
      }} animate={20}/>
      <Cloud src={blcloud} bottom left style={{
        transform: 'translateX(-35%) translateY(40px)'
      }} animate={16}/>
      <Navigation />
      </Main>
      {congratsShown && <Congrats reward={reward} onClick={() => setCongratsShown(false)}/>}
    </Container>  
  )
};

const pulsate = keyframes`
  from {
    opacity: 10%;
  }
  to {
    opacity: 100%;
  }
`

const Wave = styled.img`
  position: fixed;
  animation: ${pulsate} 2s alternate infinite;
`

const Dragon = styled.img`
  position: fixed;
  width: 12vw;
  left: 30%;
  top: 6%;
`

const Islands = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`

const Island3 = styled.img`
  width: 20vw;
  height: auto;
  position: fixed;
  bottom: 3vh;
  right: 5vw;
  max-width: 240px;
`

const Island2 = styled.img`
  width: 20vw;
  height: auto;
  position: fixed;
  top: 3vh;
  right: 30vw;
  max-width: 240px;
`

const Island1 = styled.img`
  width: 20vw;
  height: auto;
  position: fixed;
  bottom: 3vh;
  left: 5vw;
`

const Path = styled.img`
  width: 100%;
  height: auto;
`

const PathHolder = styled.div`
  width: 80vw;
  position: relative;
`

const Main = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Cloud = styled.img`
  position: fixed;
  width: 35vw;
  ${props => props.left ? 'left: 0' : 'right: 0'};
  ${props => props.bottom ? 'bottom: 0;' : 'top: 0'};
`

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #86D1FB;
`