import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Check } from '@mui/icons-material/';
import { Button, Container, Grid, Typography } from '@mui/material';
import CharList from './components/charList/CharList';
import { useEffect, useRef, useState } from 'react';
import { Character } from './types/Character';
import DelayTurnComponent from './components/delayTurn/DelayTurnComponent';
import {
  GiSwordman, GiDreadSkull, GiSwordsPower, GiDoubleDragon,
  GiRuleBook, GiSwordsEmblem, GiArchiveResearch, GiSwordClash, GiChoppedSkull
} from "react-icons/gi";

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Stopwatch from './components/stopwatch/Stopwatch';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {<Box sx={{ p: 3, overflowY: 'auto', height: '70vh', flexWrap: 'wrap' }}>
        {children}
      </Box>
      }
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function App() {

  //#region States
  const [valueTabCharacters, setValueTabCharacters] = useState(0);
  const [valueTabTurns, setValueTabTurns] = React.useState(0);
  const [valueTabMobile, setValueTabMobile] = React.useState(0);

  const [listPlayer, setListPlayer] = useState<Character[]>([]);
  const [listNpc, setListNpc] = useState<Character[]>([]);

  const [charTurnList, setCharTurnList] = React.useState<Character[]>([]);

  const [turnCount, setTurnCount] = useState(0);
  const [roundCount, setRoundCount] = useState(0);

  const [minBattleCount, setMinBattleCount] = useState(0);
  const [secBattleCount, setSecBattleCount] = useState(0);

  const [disableBtnComecar, setDisableBtnComecar] = useState(true);

  const [triggerStopwatch, setTriggerStopwatch] = useState(0);
  //#endregion

  //#region Variables
  const handleChangeTabCharacters = (event: React.SyntheticEvent, newValue: number) => {
    setValueTabCharacters(newValue)
  };

  const handleChangTabTurns = (event: React.SyntheticEvent, newValue: number) => {
    setValueTabTurns(newValue);
  };

  const handleChangTabMobile = (event: React.SyntheticEvent, newValue: number) => {
    setValueTabMobile(newValue);
  };
  
  //#endregion

  //#region Color Theme
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        components: {
          MuiTabs: {
            styleOverrides: {
              indicator: {
                backgroundColor: '#330e62',
              }
            }
          },
          MuiTab: {
            styleOverrides: {
              root: {
                color: '#7c4dff',
                "&.Mui-selected": {
                  "color": "#fff",
                  backgroundColor: "#7c4dff",
                }
              }
            }
          },
        },
        palette: {
          primary: {
            light: '#3378af',
            main: '#01579b',
            dark: '#003c6c',
            contrastText: '#fff !important',
          },
          secondary: {
            light: '#9670ff',
            main: '#7c4dff',
            dark: '#5635b2',
            contrastText: '#fff !important',
          },
          error: {
            light: '#c54949',
            main: '#b71c1c',
            dark: '#801313',
            contrastText: '#fff !important',
          },
          warning: {
            light: '#f79845',
            main: '#f57f17',
            dark: '#ab5810',
            contrastText: '#fff !important',
          },
          info: {
            light: '#337066',
            main: '#004d40',
            dark: '#00352c',
            contrastText: '#fff !important',
          },
          success: {
            light: '#5b874b',
            main: '#33691e',
            dark: '#234915',
            contrastText: '#fff !important',
          },
          mode: prefersDarkMode ? 'dark' : 'light',
        }
      }),
    [prefersDarkMode],
  );
  //#endregion


  //#region Functions

  function click_AtualizarBtn() {
    setTurnList();
  }

  function click_ComecarBtn() {
    resetBattle();
  }

  async function click_FinalizarTurnoBtn() {
    if (turnCount === charTurnList.length) {
      await setTurnCount(1);
      setRoundCount(roundCount + 1);
      calcBattleTime();
    } else {
      await setTurnCount(turnCount + 1);
    }

    setTriggerStopwatch((triggerStopwatch) => triggerStopwatch + 1);
  }

  function setTurnList() {
    var list = [...listPlayer ?? [], ...listNpc ?? []];
    list.sort((a, b) => +b.initiative - +a.initiative);
    for (let index = 0; index < list.length; index++) {
      list[index].roundPos = index;
    }
    setCharTurnList(list);
  }

  function resetBattle() {
    setRoundCount(1);
    setTurnCount(1);
    setMinBattleCount(0);
    setSecBattleCount(0);

    setValueTabTurns(1);
    setValueTabMobile(3);
  }



  function calcBattleTime() {
    var sec = secBattleCount;
    sec = sec + 6;

    if (sec === 60) {
      setMinBattleCount(minBattleCount + 1);
      setSecBattleCount(0);
    } else {
      setSecBattleCount(sec);
    }
  }

  async function click_MorteBtn() {
    const turnChar = charTurnList.filter(char => char.roundPos === (turnCount - 1))[0];
    let list = charTurnList.filter(char => char.roundPos !== (turnCount - 1));
    for (let index = 0; index < list.length; index++) {
      list[index].roundPos = index;
    };

    if (turnChar.roundPos === charTurnList.length - 1) {
      click_FinalizarTurnoBtn();
    }

    setCharTurnList(list);

    console.log('list', list);
  }

  function disableComecar(): boolean {
    return charTurnList.length < 1 ? true : false;
  }

  function showMessage() {
    if (charTurnList.length > 0 && roundCount > 0) {
      let list = charTurnList.filter(char => char.flag !== 'j');
      if (list.length < 1) {
        // setValueTabTurns(0);
        // setValueTabMobile(2);
        // setRoundCount(0);
      } else {
        list = charTurnList.filter(char => char.flag === 'j');
        if (list.length < 1) {
          setValueTabTurns(0);
          setValueTabMobile(2);
          setRoundCount(0);
        }
      }
    } else {
      setValueTabTurns(0);
      setValueTabMobile(2);
      setRoundCount(0);
    }
  }

  function delayTurn(afterChar: Character) {
    const actualChar = charTurnList[turnCount - 1];
    var newInit = 0;

    if (afterChar.roundPos + 1 !== charTurnList.length) {
      if (Math.floor(+afterChar.initiative / +charTurnList[afterChar.roundPos + 1].initiative) === 1) {
        const char = charTurnList[afterChar.roundPos];

        //update init afterChar
        if (afterChar.flag === "j") {
          listPlayer.filter(c => c.name === char.name)[0].initiative
            = (+listPlayer.filter(c => c.name === char.name)[0].initiative + 0.001).toString();
        } else {
          listNpc.filter(c => c.name === char.name)[0].initiative
            = (+listNpc.filter(c => c.name === char.name)[0].initiative + 0.001).toString();
        }
      }
    }

    newInit = +afterChar.initiative - 0.0001;
    //atualizar nova init pra quem atrasou o turno
    if (actualChar.flag === "j") {
      listPlayer.filter(c => c.name === actualChar.name)[0].initiative = newInit.toString();
    } else {
      listNpc.filter(c => c.name === actualChar.name)[0].initiative = newInit.toString();
    }
    click_AtualizarBtn();

  }
  useEffect(() => {
    showMessage();
    setDisableBtnComecar(disableComecar());
  }, [charTurnList]);

  // useEffect(() => {
  //   showMessage();
  //   setDisableBtnComecar(disableComecar());
  // }, [])

  //#endregion



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        {/* DESKTOP */}
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {/* Panel - Lista de GiSwordmanagens */}
          <Box sx={{ width: '50vw !important', height: '80vh', border: 1, borderColor: 'divider', m: 3, mt: 8 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={valueTabCharacters} onChange={handleChangeTabCharacters} aria-label="basic tabs example">
                <Tab icon={<GiSwordsPower size={25} />} iconPosition="start" label="Jogadores" {...a11yProps(0)} />
                <Tab icon={<GiDoubleDragon size={25} />} iconPosition="start" label="NPCs" {...a11yProps(1)} />
              </Tabs>
            </Box>

            <TabPanel value={valueTabCharacters} index={0}>
              <CharList inner render={1} updateCharList={(list: React.SetStateAction<Character[]>) => setListPlayer(list)} list={listPlayer}></CharList>
            </TabPanel>
            <TabPanel value={valueTabCharacters} index={1}>
              <CharList render={2} updateCharList={(list: React.SetStateAction<Character[]>) => setListNpc(list)} list={listNpc}></CharList>
            </TabPanel>
          </Box>

          {/* Panel - Gerenciamento de turno */}
          <Box sx={{ width: '50vw', minHeight: '80vh', border: 1, borderColor: 'divider', m: 3, mt: 8 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={valueTabTurns} onChange={handleChangTabTurns} aria-label="basic tabs example">
                <Tab icon={<GiRuleBook size={25} />} iconPosition="start" label="Lista" {...a11yProps(0)} />
                <Tab icon={<GiSwordsEmblem size={25} />} iconPosition="start" label="Combate" {...a11yProps(1)} disabled={roundCount < 1} />
              </Tabs>
            </Box>

            {/* Lista de turno */}
            <TabPanel value={valueTabTurns} index={0}>
              <Grid container spacing={1} alignItems="center" mb={3}>
                <Grid item xs={6} textAlign="end">
                  <Button variant="contained" color="primary" endIcon={<GiArchiveResearch size={25} />} onClick={click_AtualizarBtn} fullWidth>
                    Atualizar
                  </Button>
                </Grid>
                <Grid item xs={6} textAlign="center">
                  <Button variant="contained" color="success" endIcon={<GiSwordClash size={25} />} onClick={click_ComecarBtn} fullWidth disabled={disableBtnComecar}>
                    {roundCount > 0 ? "Recomeçar" : "Iniciar"}
                  </Button>
                </Grid>
              </Grid>

              {charTurnList.map((char, index) => (
                <Grid container spacing={1} alignItems="center" mb={3} key={index} justifyContent="space-evenly">
                  <Grid item xs={1} textAlign="end">
                    <Typography>{char.roundPos + 1}</Typography>
                  </Grid>
                  <Grid item xs={1} textAlign="center">
                    {char.flag === 'j' ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>{char.name}</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="center">
                    <Typography><strong>INIT </strong>{Math.round(+char.initiative)}</Typography>
                  </Grid>
                </Grid>
              ))}
            </TabPanel>

            {/* Combate */}
            <TabPanel value={valueTabTurns} index={1}>
              <Grid container spacing={1} alignItems="center" mb={3} justifyContent="space-evenly">
                <Grid item xs={12} textAlign="start">
                  <Typography><strong>Rodada: </strong>{roundCount}</Typography>
                </Grid>
                <Grid item xs={12} textAlign="start"
                  sx={{ mb: 3 }}>
                  <Typography>
                    <strong>Tempo de combate: </strong>
                    {('00' + minBattleCount).slice(-2) + ':' + ('00' + secBattleCount).slice(-2)}
                  </Typography>
                </Grid>
                <Grid item xs={12} textAlign="start">
                  <Stopwatch trigger={triggerStopwatch}/>
                </Grid>
                <Grid item xs={12} textAlign="center" className='border'
                  sx={{ border: 1, borderColor: 'divider', mb: 6, p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>Turno Atual</Typography>
                  <Typography> {charTurnList[(turnCount - 1)]?.flag === 'j' ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />}
                    {' ' + charTurnList[(turnCount - 1)]?.name}</Typography>
                </Grid>
                <Grid item xs={12} textAlign="center"
                  sx={{ border: 1, borderColor: 'divider', mb: 6, p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>Próximo Turno</Typography>
                  <Typography>
                    {turnCount === charTurnList.length ?
                      (charTurnList[(0)]?.flag === 'j' ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />) :
                      (charTurnList[(turnCount)]?.flag === 'j' ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />)}

                    {turnCount === charTurnList.length ?
                      ' ' + charTurnList[0]?.name : ' ' + charTurnList[turnCount]?.name}</Typography>
                </Grid>
                <Grid item xs={4} textAlign="center">
                  <Button variant="contained" color="success" size="large" endIcon={<Check />} onClick={click_FinalizarTurnoBtn} fullWidth>
                    Finalizar
                  </Button>
                </Grid>
                <Grid item xs={4} textAlign="center">
                  <DelayTurnComponent
                    charList={charTurnList.filter(c => c?.roundPos > (turnCount - 1))}
                    render={1}
                    updateTurn={delayTurn}
                  />
                </Grid>
                <Grid item xs={4} textAlign="center">
                  <Button variant="contained" color="error" size="large" endIcon={<GiChoppedSkull size={25} />} onClick={click_MorteBtn} fullWidth>
                    Morreu
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
        </Box>

        {/* MOBILE */}
        <Box sx={{ display: { xs: 'flex', md: 'none', justifyContent: 'center' } }}>
          <Box
            sx={{ bgcolor: 'background.paper', display: 'flex', height: '85vh', mt: 3 }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={valueTabMobile}
              onChange={handleChangTabMobile}
              sx={{ borderRight: 1, borderColor: 'divider' }}
            >
              <Tab icon={<GiSwordsPower size={25} />}{...a11yProps(0)} />
              <Tab icon={<GiDoubleDragon size={25} />}{...a11yProps(1)} />
              <Tab icon={<GiRuleBook size={25} />} {...a11yProps(2)} />
              <Tab icon={<GiSwordsEmblem size={25} />}{...a11yProps(3)} disabled={roundCount < 1} />
            </Tabs>

            {/* LISTA DE TURNO */}
            <TabPanel value={valueTabMobile} index={0} >
              <Box sx={{ width: '60vw', textAlign: 'center' }}>
                <Typography>
                  <strong>Lista de Jogadores</strong>
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <CharList inner render={1} updateCharList={(list: React.SetStateAction<Character[]>) => setListPlayer(list)} list={listPlayer}></CharList>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={valueTabMobile} index={1}>
              <Box sx={{ width: '60vw', textAlign: 'center' }}>
                <Typography>
                  <strong>Lista de NPCs</strong>
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <CharList inner render={2} updateCharList={(list: React.SetStateAction<Character[]>) => setListNpc(list)} list={listNpc}></CharList>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel value={valueTabMobile} index={2}>
              <Box sx={{ width: '60vw' }}>
                <Grid container spacing={1} alignItems="center" mb={3}>
                  <Grid item xs={4} textAlign="end">
                    <Button variant="contained" color="primary" size="large" onClick={click_AtualizarBtn} fullWidth>
                      <GiArchiveResearch size={25} />
                    </Button>
                  </Grid>
                  <Grid item xs={8} textAlign="center">
                    <Button variant="contained" color="success" size="large" endIcon={<GiSwordClash size={25} />} onClick={click_ComecarBtn} fullWidth disabled={disableBtnComecar}>
                      {roundCount > 0 ? "Recomeçar" : "Iniciar"}
                    </Button>
                  </Grid>
                </Grid>

                {charTurnList.map((char, index) => (
                  <Grid container spacing={1} alignItems="center" mb={3} key={index} justifyContent="space-evenly">
                    <Grid item xs={1} textAlign="end">
                      <Typography>{char.roundPos + 1}</Typography>
                    </Grid>
                    <Grid item xs={1} textAlign="center">
                      {char.flag === 'j' ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />}
                    </Grid>
                    <Grid item xs={5}>
                      <Typography>{char.name}</Typography>
                    </Grid>
                    <Grid item xs={3} textAlign="center">
                      <Typography><strong>INIT </strong>{Math.round(+char.initiative)}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </TabPanel>

            {/* COMBATE */}
            <TabPanel value={valueTabMobile} index={3}>
              <Box sx={{ width: '60vw' }}>
                <Grid container spacing={1} alignItems="center" mb={3} justifyContent="space-evenly">
                  <Grid item xs={12} textAlign="start">
                    <Typography>
                      <strong>Rodada: </strong>{roundCount}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="start"
                    sx={{ mb: 3 }}>
                    <Typography>
                      <strong>Tempo de combate:</strong> {('00' + minBattleCount).slice(-2) + ':' + ('00' + secBattleCount).slice(-2)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="start">
                    <Stopwatch trigger={triggerStopwatch}/>
                  </Grid>
                  <Grid item xs={12} textAlign="center" className='border'
                    sx={{ border: 1, borderColor: 'divider', mb: 5, p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>Turno Atual</Typography>
                    <Typography>{charTurnList[(turnCount - 1)]?.flag === 'j' ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />}
                      {' ' + charTurnList[(turnCount - 1)]?.name}</Typography>
                  </Grid>
                  <Grid item xs={12} textAlign="center"
                    sx={{ border: 1, borderColor: 'divider', mb: 3, p: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mt: 1 }}>Próximo Turno</Typography>
                    <Typography>
                      {turnCount === charTurnList.length ?
                        (charTurnList[(0)]?.flag === 'j' ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />) :
                        (charTurnList[(turnCount)]?.flag === 'j' ? <GiSwordman size={25} /> : <GiDreadSkull size={25} />)}

                      {turnCount === charTurnList.length ?
                        ' ' + charTurnList[0]?.name : ' ' + charTurnList[turnCount]?.name}</Typography>
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <Button variant="contained" color="success" size="large" onClick={click_FinalizarTurnoBtn} fullWidth>
                      <Check />
                    </Button>
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <DelayTurnComponent
                      charList={charTurnList.filter(c => c?.roundPos > (turnCount - 1))}
                      render={2}
                      updateTurn={delayTurn}
                    />
                  </Grid>
                  <Grid item xs={4} textAlign="center">
                    <Button variant="contained" color="error" size="large" onClick={click_MorteBtn} fullWidth>
                      <GiChoppedSkull size={25} />
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


