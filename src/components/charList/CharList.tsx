import { Add, Delete, Person, SmartToy } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Character } from '../../types/Character';


export default function CharList(props: any) {
    const [listCharacter, setListCharacter] = useState<Character[]>([]);
    const [charName, setCharName,] = useState<string>('');
    const [charType, setCharType,] = useState<string>('');


    //#region Handlers_Events()
    function handle_TfName(name: string) {
        setCharName(name);
    }

    function handle_TfInit(init: string, index: number) {
        listCharacter[index].initiative = init;
    }
    //#endregion

    //#region Click_Events()
    function click_AddBtn() {

        listCharacter.push({
            name: charName,
            initiative: '',
            id: listCharacter.length + 1,
            flag: charType
        })
        setCharName('');
        return listCharacter;
    }

    function click_DelBtn(id: number) {
        let list = listCharacter.filter(char => char.id !== id);
        setListCharacter(list);
        return list;
    }
    //#endregion


    useEffect(() => {
        function configure() {
            setCharType(props.render === 1 ? 'j' : 'npc');
        };

        configure();
    }, [props]);

    return (
        <Container>
            {/* Lista de personagens */}
            {listCharacter.map((char, index) => (
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }} key={index}>
                    <Box sx={{ p: 2 }}>
                        {props.render === 1 ? <Person /> : <SmartToy />}
                    </Box>
                    <Box sx={{ p: 2, minWidth: '175px' }}>
                        <Typography>{char.name}</Typography>
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <TextField id="tfInit" variant="outlined" inputProps={{ maxLength: 2 }}
                            sx={{ width: '65px', textAlign: 'center' }} onChange={e => handle_TfInit(e.target.value, index)} />
                    </Box>
                    <Box sx={{ p: 2 }}>
                        <Button variant="outlined" color="error" sx={{ height: '55px' }}
                            onClick={() => {props.updateCharList(click_DelBtn(char.id))}}>
                            < Delete />
                        </Button>
                    </Box>
                </Box>
            ))}

            {/* Input de personagem */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ p: 2 }}>
                    <TextField id="tfCharacter" label="Nome" variant="standard" value={charName}
                        sx={{ width: '150px', textAlign: 'center' }} onChange={e => handle_TfName(e.target.value)} />
                </Box>
                <Box sx={{ p: 2 }}>
                    <Button variant="contained" sx={{ height: '55px' }} onClick={() => {props.updateCharList(click_AddBtn())}}>
                        <Add />
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}