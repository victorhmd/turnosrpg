import React from 'react';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Add, Person, Close, SmartToy } from '@mui/icons-material/';

import {Character} from '../../types/Character';


type Props = {
  render: number
}

type State = {
  title: string,
  icon: any,
  lsCharacter: Character[],
  name: string,
  init: string
}

export default class CharList extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: '',
      icon: '',
      lsCharacter: [],
      name: '',
      init: ''
    }
  }

  //#region Functions
  btnAdd_click = () => {
    let flag = this.props.render === 1 ? 'j' : 'npc';
    this.setState(state => ({ 
      lsCharacter: [...state.lsCharacter, 
        { 
          name: state.name, 
          id: state.lsCharacter.length + 1, 
          initiative: '',
          flag: flag }] }));
    this.clearFields();
  }

  switchRender = () => {
    switch (this.props.render) {
      case 1:
        this.setState({ title: "Jogadores", icon: <Person></Person> });
        break

      case 2:
        this.setState({ title: "NPCs", icon: <SmartToy></SmartToy> });
        break;
    }
  }

  btnDel_click = (id: number) => {
    let list = this.state.lsCharacter.filter(char => char.id !== id);
    this.setState({lsCharacter: list});
  }
  
  clearFields = () => {
    this.setState({name: ''})
  }

  setInitiative = (init: string, index: number) => {
    // this.state.lsCharacter[index].initiative = init;
    this.forceUpdate();
  }

  //#endregion
  

  render() {  
    return (
      <div className='container p-5'>
        <div>
          <label>{this.state.title}</label>
          <hr></hr>
          <div>
            {this.state.lsCharacter.map((char,index) => (
              <div key={index}>
                <div className="row align-items-center mb-3">
                  <div className="col-2 p-3">
                    {this.state.icon}
                  </div>
                  <div className="col-5 p-3">
                    <span>
                      {char.name}
                    </span>
                  </div>
                  <div className="col-3 p-3">
                    <TextField id="tfInit" variant="outlined" inputProps={{ maxLength: 2 }} 
                    onChange={e => this.setInitiative(e.target.value, index)}/>
                  </div>
                  <div className="col-2 p-2">
                    <Button variant="outlined" color="error" onClick={() => this.btnDel_click(char.id)}>
                      <Close />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='row'>
          <div className="col-7">
            <TextField id="tfCharacter" label="Nome" variant="standard" value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })} />
          </div>
          <div className="col-1 p-3">
            <Button variant="contained" onClick={this.btnAdd_click}>
              <Add />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount(){
    this.switchRender();
  }
}