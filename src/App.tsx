import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Person, SmartToy, List, PlayArrow, Refresh } from '@mui/icons-material/';
import { Button, Container, Grid, Typography } from '@mui/material';
import CharList from './components/charList/CharList';
import { useEffect, useState } from 'react';
import { Character } from './types/Character';
import { Turn } from './types/Turn';

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

  //#region Functions
  function click_AtualizarBtn() {
    setTurnList();
    console.log(charTurnList);
  }

  function click_ComecarBtn() {

  }

  function setTurnList() {
    var list = [...listPlayer ?? [], ...listNpc ?? []];
    console.log(list);
    list.sort((a, b) => +b.initiative - +a.initiative);
    setCharTurnList(list);
  }
  //#endregion



  return (
    <Container>
      {/* DESKTOP */}
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        {/* Panel - Lista de Personagens */}
        <Box sx={{ width: '50vw !important', height: '80vh', border: 1, borderColor: 'divider', m: 3, mt: 8 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueTabCharacters} onChange={handleChangeTabCharacters} aria-label="basic tabs example">
              <Tab icon={<Person />} iconPosition="start" label="Jogadores" {...a11yProps(0)} />
              <Tab icon={<SmartToy />} iconPosition="start" label="NPCs" {...a11yProps(1)} />
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
              <Tab icon={<List />} iconPosition="start" label="Lista" {...a11yProps(0)} />
              <Tab icon={<PlayArrow />} iconPosition="start" label="Combate" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={valueTabTurns} index={0}>
            <Grid container spacing={1} alignItems="center" mb={3}>
              <Grid item xs={6} textAlign="end">
                <Button variant="contained" color="primary" endIcon={<Refresh />} onClick={click_AtualizarBtn} fullWidth>
                  Atualizar
                </Button>
              </Grid>
              <Grid item xs={6} textAlign="center">
                <Button variant="contained" color="success" endIcon={<PlayArrow />} onClick={click_ComecarBtn} fullWidth>
                  Começar
                </Button>
              </Grid>
            </Grid>

            {charTurnList.map((char, index) => (
              <Grid container spacing={1} alignItems="center" mb={3} key={index} justifyContent="space-evenly">
                <Grid item xs={1} textAlign="end">
                  <Typography>{index + 1}</Typography>
                </Grid>
                <Grid item xs={1} textAlign="center">
                  {char.flag === 'j' ? <Person /> : <SmartToy />}
                </Grid>
                <Grid item xs={5}>
                  <Typography>{char.name}</Typography>
                </Grid>
                <Grid item xs={3} textAlign="center">
                  <Typography><strong>INIT </strong>{char.initiative}</Typography>
                </Grid>
              </Grid>
            ))}
          </TabPanel>
          <TabPanel value={valueTabTurns} index={1}>

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
            <Tab icon={<Person />}{...a11yProps(0)} />
            <Tab icon={<SmartToy />}{...a11yProps(1)} />
            <Tab icon={<List />} {...a11yProps(2)} />
            <Tab icon={<PlayArrow />}{...a11yProps(3)} />
          </Tabs>
          <TabPanel value={valueTabMobile} index={0} >
            <Box sx={{ width: '60vw' }}>
              <Typography>
                <strong>Lista de Jogadores</strong>
              </Typography>
              <Box>
                <CharList inner render={1} updateCharList={(list: React.SetStateAction<Character[]>) => setListPlayer(list)} list={listPlayer}></CharList>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={valueTabMobile} index={1}>
            <Box sx={{ width: '60vw' }}>
              <Typography>
                <strong>Lista de NPCs</strong>
              </Typography>
              <Box>
                <CharList inner render={2} updateCharList={(list: React.SetStateAction<Character[]>) => setListNpc(list)} list={listNpc}></CharList>
              </Box>
            </Box>
          </TabPanel>
          <TabPanel value={valueTabMobile} index={2}>
            <Box sx={{ width: '60vw' }}>
              <Grid container spacing={1} alignItems="center" mb={3}>
                <Grid item xs={6} textAlign="end">
                  <Button variant="contained" color="primary" endIcon={<Refresh />} onClick={click_AtualizarBtn} fullWidth>
                    Atualizar
                  </Button>
                </Grid>
                <Grid item xs={6} textAlign="center">
                  <Button variant="contained" color="success" endIcon={<PlayArrow />} onClick={click_ComecarBtn} fullWidth>
                    Começar
                  </Button>
                </Grid>
              </Grid>

              {charTurnList.map((char, index) => (
                <Grid container spacing={1} alignItems="center" mb={3} key={index} justifyContent="space-evenly">
                  <Grid item xs={1} textAlign="end">
                    <Typography>{index + 1}</Typography>
                  </Grid>
                  <Grid item xs={1} textAlign="center">
                    {char.flag === 'j' ? <Person /> : <SmartToy />}
                  </Grid>
                  <Grid item xs={5}>
                    <Typography>{char.name}</Typography>
                  </Grid>
                  <Grid item xs={3} textAlign="center">
                    <Typography><strong>INIT </strong>{char.initiative}</Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
          </TabPanel>
          <TabPanel value={valueTabMobile} index={3}>
            <Box sx={{ width: '60vw' }}>

            </Box>
          </TabPanel>
        </Box>
      </Box>
    </Container>

  );
}


