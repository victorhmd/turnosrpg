import { Add, Delete } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { Character } from '../../types/Character';
import { GiSwordman, GiDreadSkull } from "react-icons/gi";


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
        return listCharacter;
    }
    //#endregion

    //#region Click_Events()
    function click_AddBtn() {

        setListCharacter([...listCharacter, {
            name: charName,
            initiative: '',
            id: listCharacter.length + 1,
            flag: charType,
            roundPos: 0
        }]);
        setCharName('');
        return listCharacter;
    }

    function click_DelBtn(id: number) {
        let list = listCharacter.filter(char => char.id !== id);
        setListCharacter(list);
        return list;
    }
    //#endregion

    function keyPress(event: any){
        if(event.key === 'Enter'){
            props.updateCharList(click_AddBtn())
        }
    }

    useEffect(() => {
        function configure() {
            setCharType(props.render === 1 ? 'j' : 'npc');
        };
        configure();
    }, [props]);

    useEffect(() => {
        props.updateCharList(listCharacter);
    }, [listCharacter]);

    return (
        <Container>
            <Box sx={{ display: 'inline' }}>
                {/* Lista de personagens */}
                {listCharacter.map((char, index) => (
                    <Grid container spacing={1} alignItems="center" mb={3} key={index}>
                        <Grid item xs={2}>
                            {props.render === 1 ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />}
                        </Grid>
                        <Grid item xs={10} lg={6} sx={{ textAlign: 'left' }}>
                            <Typography noWrap>{char.name}</Typography>
                        </Grid>
                        <Grid item xs={8} lg={2}>
                            <TextField id="tfInit" variant="outlined" label="INIT" inputProps={{ maxLength: 2, style: { textAlign: 'center' }, tabIndex: 1 }}
                                sx={{ textAlign: 'center' }} onChange={e => props.updateCharList(handle_TfInit(e.target.value, index))} />
                        </Grid>
                        <Grid item xs={4} lg={2}>
                            <Button color="error" variant="contained" sx={{ height: '55px' }}
                                onClick={() => { props.updateCharList(click_DelBtn(char.id)); }}>
                                <Delete />
                            </Button>
                        </Grid>
                    </Grid>
                ))}

                {/* Input de personagem */}
                <Grid container spacing={1} alignItems="center" mb={3} mt={3} >
                    <Grid item xs={8} >
                        <TextField id="tfCharacter" label="Nome" variant="standard" value={charName}
                            sx={{ textAlign: 'center' }} onChange={e => handle_TfName(e.target.value)} onKeyUp={(event) => keyPress(event)}/>
                    </Grid>
                    <Grid item xs={4}>
                        <Button type="submit" variant="contained" sx={{ height: '55px' }} onClick={() => { props.updateCharList(click_AddBtn()) }} 
                            color="info">
                            <Add />
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}