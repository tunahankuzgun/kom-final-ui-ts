import { Button } from '@mantine/core';
import './App.css';
import Ws from './utils/ApiSocket';

Ws.init()

function App() {
  return (
    <div className="App">
      
      <Button onClick={() => Ws.send('message', {command: "start", value: ""})}> Send </Button>

    </div>
  );
}

export default App;
