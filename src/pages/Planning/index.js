import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import BasicContainer from '../../components/BasicContainer';
import { FaPlusSquare } from 'react-icons/fa';
import { BsTriangleFill } from 'react-icons/bs';
import constants from '../../constants';
import { useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';

export default function Planning() {
  const [items, setItems] = useState([{}]);
  const [reward, setReward] = useState("");
  const history = useHistory();
  const profile = useSelector((state) => state.firebase.profile);
  const firebase = useFirebase();

  useEffect(() => {
    // console.log(reward);
  }, [reward]);

  const addItems = () => {
    setItems(items.concat({}));
  };

  const handleDone = () => {
    firebase.updateProfile({
      day: {
        steps: items,
        reward: reward
      },
    });
    history.push('/map');
  };

  const handleSkip = () => {
    history.push('/map');
  }

  return (
    <Container> 
      <BasicContainer
        name="Plan Your Child's Day"
        noExtraLeftPadding
      >
        <Plan>
          {items.map((item, index) => {
            return <Item index={index} items={items} setItems={setItems}>
              <UserInput />
            </Item>
          })}
          <PlusButton onClick={addItems}/>
        </Plan>
        <div style={{fontSize: "34px", marginTop:"65px"}}>Reward</div>
        <hr style={{height: "1px", background: "black"}} />
        <Reward>
          <RewardPrompt 
            reward={reward}
            setReward={setReward}
          />
          <DoneButton onClick={handleDone}>Done</DoneButton>
        </Reward>
      </BasicContainer>
      <div style={{position: "fixed", top: "10px", right: "10px", color: "lightblue"}} onClick={handleSkip}>Skip</div>
    </Container>
  )
}

function Item(props) {
  const [time, setTime] = useState(12);
  const [period, setPeriod] = useState('AM');
  const [name, setName] = useState("");
  const index = props.index;
  const items = props.items;
  const setItems = props.setItems;

  useEffect(() => {
    let new_obj = {time: time, period: period, name: name};
    let new_arr = [...items]
    new_arr[index] = new_obj;
    setItems(new_arr);
  }, [time, period, name]);
  
  const togglePeriod = () => {
    if (period == 'AM') {
      setPeriod('PM');
    } else {
      setPeriod('AM');
    }
  }

  const increaseTime = () => {
    if (time + 1 == 13) {
      setTime(1);
    } else {
      setTime(time + 1);
    }
  }

  const decreaseTime = () => {
    if (time - 1 == 0) {
      setTime(12);
    } else {
      setTime(time - 1);
    }
  }

  return (
    <ItemDiv>
      <UserInput
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <Buttons>
        <Button>
          <ChangeButton onClick={increaseTime} />
          <span>{`${time}:00`}</span>
          <ChangeButton down onClick={decreaseTime} />
        </Button>
        <Button>
          <ChangeButton onClick={togglePeriod} />
          <span>{period}</span>
          <ChangeButton down onClick={togglePeriod} />
        </Button>
      </Buttons>
    </ItemDiv>
  )
};

function RewardPrompt(props) {
  const reward = props.reward;
  const setReward = props.setReward;

  return (
    <ItemDiv style={{backgroundColor: "#0071BC", height: '62px', marginTop: "40px"}}>
      <UserInput 
      value={reward}
      onChange={e => setReward(e.target.value)}
      style={{width: '100%'}} />
    </ItemDiv>
  )
}

const DoneButton = styled.div`
  align-self: center;
  color: white;
  font-size: 28px;
  font-weight: bold;
  padding: 12px 24px;
  border-radius: 20px;
  margin-bottom: 30px;
  background-color: ${constants.SALMON};
  &:hover {
    cursor: pointer;
  }
`

const ChangeButton = styled(BsTriangleFill)`
  &:hover {
    cursor: pointer;
  }
  ${props => props.down && `transform: rotate(180deg);`}
`

const Button = styled.div`
  span {
    font-size: 30px;
    font-weight: 300;
  }
  display: flex;
  flex-direction: column;
  align-items: center;  
  margin-right: 20px;
  user-select: none;
`

const Buttons = styled.div`
  display: flex;
  
`

const UserInput = styled.input`
  height: 45px;
  width: 60%;
  border: none;
  padding-left: 20px;
  font-size: 22px;

  /* &:focus, &:active {
    outline-color: ${constants.SALMON};
  } */
`

const ItemDiv = styled.div`
 background-color: ${constants.DARK_YELLOW};
 width: 85%;
 padding: 30px;
 border-radius: 25px;
 margin-bottom: 27px;
 display: flex;
 justify-content: space-between;
 align-items: center;
 &:nth-child(1) {
   margin-top: 50px;
 }
`

const Reward = styled.div`
  display: flex;
  flex-direction: column;
`

const Plan = styled.div`

`

const PlusButton = styled(FaPlusSquare)`
  fill: ${constants.SALMON};
  height: 60px;
  width: auto;
  &:hover {
    cursor: pointer;
  }
`

const Container = styled.div`

`