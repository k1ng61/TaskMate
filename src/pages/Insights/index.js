import React from 'react';
import styled from 'styled-components';
import Navigation from '../../components/Navigation';
import BasicContainer from '../../components/BasicContainer';

export default function Insights() {
  return (
    <Container>
      <Navigation />
      <BasicContainer
        name="Insights"
      >
      <div style={{fontSize: "25px", marginTop:"50px"}}>Times child has missed his/her activities: <span style={{marginRight: '200px',float: 'right'}}><b>4</b></span></div>
      <div style={{fontSize: "25px", marginTop:"60px"}}>Most beneficial incentive: <span style={{marginRight: '200px',float: 'right'}}><b>30 minutes of video games</b></span></div>
      <div style={{fontSize: "25px", marginTop:"70px"}}>Average time to finish all tasks: <span style={{marginRight: '200px',float: 'right'}}><b>5.5 hours</b></span></div>
      </BasicContainer>
    </Container>
  )
}

const Container = styled.div`

`
