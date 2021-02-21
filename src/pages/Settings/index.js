import React from 'react';
import styled from 'styled-components';
import Navigation from '../../components/Navigation';
import BasicContainer from '../../components/BasicContainer';
import constants from '../../constants';

export default function Settings() {
  return (
    <Container>
      <Navigation />
      <BasicContainer
        name="Settings"
      >
      <div style={{fontSize: "25px", marginTop:"50px"}}>Parent Name: <UserInput
        value="Jane Doe"
      /></div>
      <div style={{fontSize: "25px", marginTop:"60px"}}>Student Name: <UserInput
        value="Johnny Appleseed"
      /></div>
      <div style={{fontSize: "25px", marginTop:"70px"}}>Phone Number: <UserInput
        value="(123) 456 - 7890"
      /></div>
      <SaveButton>Save</SaveButton>
      </BasicContainer>
    </Container>
  )
}

const Container = styled.div`
`

const UserInput = styled.input`
  height: 45px;
  width: 20%;
  border: none;
  border-radius: 10px;
  margin-right: 20%;
  float: right;
  padding-left: 10px;
  padding-right: 50px;
  font-size: 22px;
  background: #d3d3d3;
  /* &:focus, &:active {
    outline-color: ${constants.SALMON};
  } */
`

const SaveButton = styled.div`
  width: 10%;
  margin-top: 55px;
  margin-left: 40%;
  text-align: center;
  color: white;
  font-size: 28px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 20px;
  background-color: ${constants.SALMON};
  &:hover {
    cursor: pointer;
  }
`