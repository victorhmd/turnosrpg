import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { PersonAdd, Person, Close } from '@mui/icons-material/';

import Player from './types/Player';
import { useState } from 'react';
import { arrayBuffer } from 'stream/consumers';


const App = () => {
  const [lsPlayer, setLsPlayer] = useState<Player[]>([]);
  const [tfPlayer, setTfPlayer] = useState<string>('');
  const [tfInit, setTfInit] = useState<string>('');

  function btnAdd_click() {
    const lastId = lsPlayer[lsPlayer.length + 1];
    setLsPlayer([...lsPlayer, { name: tfPlayer, initiative: tfInit, id: lsPlayer.length + 1 }]);
    clearFields();
  }

  function clearFields() {
    setTfInit('');
    setTfPlayer('');
  }

  function btnDel_click(id: number){
    setLsPlayer(lsPlayer.filter(player => player.id !== id));
  }

  return (
    <div className='container p-5'>
      <div>
        <label>Jogadores:</label>
        <hr></hr>
        <div>
          {lsPlayer.map((player, index) => (
            <div><Person /> {player.name} | {player.initiative}
              <IconButton color="primary" aria-label="upload picture" component="label" onClick={() => btnDel_click(player.id)}>
                <Close />
              </IconButton>
            </div>
          ))}
        </div>
      </div>

      <div className='row'>
        <div className="col-2">
          <TextField id="tfPlayer" label="Jogador" variant="standard" value={tfPlayer}
            onChange={e => setTfPlayer(e.target.value)} />
        </div>
        <div className="col-1">
          <TextField id="tfInit" label="Iniciativa" variant="standard" value={tfInit}
            onChange={e => setTfInit(e.target.value)} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
        </div>
        <div className="col-1 p-3">
          <IconButton color="primary" aria-label="upload picture" component="label" onClick={btnAdd_click}>
            <PersonAdd />
          </IconButton>
        </div>

      </div>

    </div>
  );
}


export default App;
