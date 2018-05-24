import React, { Component } from 'react';
import logo from '../../assets/images/logo.svg';
import './App.less';
import { DatePicker, Modal, Button } from 'antd';
import { observable, autorun } from 'mobx';


var a = 666
var value = observable(0);
const number = observable(100);
const obj = observable(a);


class App extends Component {
    componentWillMount() {

        $.get({
            url: '/community/discover/rankingRise?resourceType=0,2&startTime=&page=1&size=20&type=json',
            success: function (res) {

            }
        })
    }
    state = { visible: false }
    showModal = () => {
        this.setState({
            visible: true,
        });
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
          <DatePicker />

          <Button type="primary" onClick={this.showModal}>Open</Button>
          <Modal
              title="Basic Modal"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
          >
              <p>Some contents...</p>
              <p>Some contents...</p>
              <p>Some contents...</p>
          </Modal>


          <div className="test-xiaoxiaoliu">
              test-xiaoxiaoliu

          </div>

        <p className="App-intro">

           llll hha hhh ggghh
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}


autorun(() => {
    console.log(value.get());
    console.log(obj.get());
});

value.set(1);
value.set(2);
value = 88;
number.set(101);
//obj.set({a:"222", b:444})


export default App;
