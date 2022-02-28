import React, { Component } from 'react';
import { render } from 'react-dom';
import { Stage, Layer, Text, Circle } from 'react-konva';

let history = [{x: 100, y: 100}];
let historyStep = 0;

class App extends Component {
  state = {position: history[0]};

  handleUndo = () => {
    if (historyStep === 0) {
      console.clear();
      return;
    }
    historyStep -= 1;
    const previous = history[historyStep];
    this.setState({
      position: previous
    });
    console.log(previous);
  };

  handleRedo = () => {
    if (historyStep === history.length - 1) {
      return;
    }
    historyStep += 1;
    const next = history[historyStep];
    this.setState({
      position: next
    });
    console.log(next);
  };

  handleDragEnd = e => {
    history = history.slice(0, historyStep + 1);
    const pos = {
      x: e.target.x(),
      y: e.target.y()
    };
    history = history.concat([pos]);
    historyStep += 1;
    this.setState({
      position: pos
    });
    console.log(pos);
  };

  //===================================

  render() {
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text="undo" onClick={this.handleUndo} />
          <Text text="redo" x={40} onClick={this.handleRedo} />
          <Text text={"x: " +this.state.position.x} x={80}/>
          <Text text={"y: " +this.state.position.y} x={120}/>
          <Text text={"step: " + historyStep} x={180}/>
          <Text text={"history: " + JSON.stringify(history)} x={250}/>
          <Circle
            x={this.state.position.x}
            y={this.state.position.y}
            width={100}
            height={100}
            fill="red"
            draggable
            onDragEnd={this.handleDragEnd}
          />
        </Layer>
      </Stage>
    );
  }
}

//===================================

render(<App />, 
  document.getElementById('root')
);
