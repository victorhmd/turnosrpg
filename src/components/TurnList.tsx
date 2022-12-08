import React from 'react';
import { Turn } from '../types/Turn';
import { Person, SmartToy } from '@mui/icons-material/';
import { Character } from '../types/Character';


type Props = {

}

type State = {
    turn: Turn
}




export default class TurnList extends React.Component<Props, State> {
    private list: Character[];
    constructor(props: any) {
        super(props);

        this.state = {
            turn: { playerList: [], npcList: [] }
        }

        this.list = [];
    }

    createList() {
        this.list = [...this.state.turn.playerList ?? [], ...this.state.turn.npcList ?? []];
        this.list.sort((a, b) => +b.initiative - +a.initiative);
    }

    render() {
        this.createList();
        return (
            <div>
                <div className="fluid text-center mb-4">
                    <h3>Lista de Iniciativa</h3>
                </div>
                {this.list.map((char, index) => (
                    <div className="row mb-2 align-items-center border">
                        <div className="col-2 text-end">
                            <span><strong>{index + 1}.</strong></span>
                        </div>
                        <div className="col-6 text-left">
                            <span>{char.flag === 'j' ? <Person></Person> : <SmartToy></SmartToy>} {char.name}</span>
                        </div>
                        <div className="col-3">
                            <span><strong>INIT </strong>{char.initiative}</span>
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}