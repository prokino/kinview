import React from 'react';
import './App.css';
import MuiTreeView from 'material-ui-treeview';
import classification from './data/classification.json';

let tree=[];

function convertToTree(data)
{
  for (let i =0; i < data.length;i++)
  {
    console.log(classification[i].Group)

  }
  return data;
}
tree = convertToTree(classification);
console.log(tree);

function App() 
  return (<MuiTreeView tree={tree} onLeafClick={node => alert(`${node} clicked`)} />);
}

export default App;
