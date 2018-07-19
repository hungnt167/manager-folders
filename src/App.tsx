import Aside from "components/Aside";
import Header from "components/Header";
import Main from "components/Main";
import * as React from 'react';
import './App.css';

class App extends React.Component {
  public aside: any;
  public setAside =(aside: any) => (this.aside = aside)	

  public render() {
    return (
        <React.Fragment>
            <Header/>
            <Aside ref={this.setAside}/>
            <Main aside={this.aside}/>
        </React.Fragment>
    );
  }
}

export default App;
