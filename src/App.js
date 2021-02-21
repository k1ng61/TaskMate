import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import Home from './pages/Home';
import Insights from './pages/Insights';
import Map from './pages/Map';
import Planning from './pages/Planning';
import Settings from './pages/Settings';
import CloudCover from './components/CloudCover';

const GlobalStyle = createGlobalStyle`
  :root {
    
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
  }
`;

export default function App() {
  const [cover, setCover] = useState(false);

  return (
    <Container>
      <GlobalStyle />
      <Switch>
        <Route path="/" exact render={(props) => (
          <Home {...props} setCover={setCover} />
         )} />
        <Route path="/insights" component={Insights} />
        <Route path="/map" component={Map} />
        <Route path="/planning" component={Planning} />
        <Route path="/settings" component={Settings} />
      </Switch>
      {cover && <CloudCover />}
    </Container>
  );
}

const Container = styled.div`

`