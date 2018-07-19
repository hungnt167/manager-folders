import {Aside} from "components/Aside";
import Header from "components/Header";
import {Main} from "components/Main";
import * as React from 'react';
import './App.css';

class App extends React.Component {
  public render() {
    return (
        <React.Fragment>
            <Header/>
            <Aside/>
            <Main/>
        </React.Fragment>
    );
  }
}

export default App;
