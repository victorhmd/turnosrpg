import React from 'react';
import CharList from './components/charList/CharList';
import TurnList from './components/TurnList';
import Button from '@mui/material/Button';
import { Turn } from './types/Turn';
import { Refresh } from '@mui/icons-material/';

type Props = {

}

type State = {
  turn: Turn;
}

export default class App extends React.Component<Props, State> {
  private charListCompPlayer: React.RefObject<CharList>;
  private charListCompNPC: React.RefObject<CharList>;
  private turnListComp: React.RefObject<TurnList>;
  private turn: Turn;


  constructor(props: any) {
    super(props);
    this.charListCompPlayer = React.createRef();
    this.charListCompNPC = React.createRef();
    this.turnListComp = React.createRef();
    this.turn = { playerList: [], npcList: [] };
  }

  setTurn() {
    this.turn = {
      playerList: this.charListCompPlayer.current?.state.lsCharacter,
      npcList: this.charListCompNPC.current?.state.lsCharacter
    };

    this.turnListComp.current?.setState({
      turn: this.turn
    });
  }

  render() {
    return (
      <div className='container p-5'>
        <div className="row">
          <div className="col-4">
            <CharList render={1} ref={this.charListCompPlayer}></CharList>
          </div>
          <div className="col-4">
            <div className="fluid text-center">
              <Button variant="contained" color="success" onClick={() => this.setTurn()} className="mb-3" endIcon={<Refresh />}>
                Atualizar
              </Button>
            </div>
            <TurnList ref={this.turnListComp}></TurnList>
          </div>
          <div className="col-4">
            <CharList render={2} ref={this.charListCompNPC}></CharList>
          </div>
        </div>
      </div>
    )
  }
}
