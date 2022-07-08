import React from 'react';
import Partition from './components/Partition';
import Treemap from './components/Treemap';
import Tree from './components/Tree';
import LinkHorizontal from './components/shape/LinkHorizontal';
import Canvas from './components/shape/Canvas';
import ScrollCanvas from './components/shape/ScrollCanvas';
import OffscreenCanvas from './components/shape/OffscreenCanvas';
import './App.css';

function App() {
  return (
    <div className="App">
      <OffscreenCanvas></OffscreenCanvas>
      <br />
      <LinkHorizontal></LinkHorizontal>
      <br />
      <Tree></Tree>
      <br />
      <Partition></Partition>
      <Treemap></Treemap>
    </div>
  );
}

export default App;
