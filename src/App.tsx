import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Person, SmartToy, List, PlayArrow, Refresh } from '@mui/icons-material/';
import { Button, Container } from '@mui/material';
import CharList from './components/charList/CharList';
import { useState } from 'react';
import { Character } from './types/Character';

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
  const [valueTabPLayerList, setValueTabPlayerList] = useState(0);
  const [listPlayer, setListPlayer] = useState<Character[]>([]);
  const [listNpc, setListNpc] = useState<Character[]>([]);
  const [valueTabNpcList, setValueTabNpcList] = React.useState(0);
  //#endregion

  //#region Variaveis
  const handleChangeTabPlayerList = (event: React.SyntheticEvent, newValue: number) => {
    setValueTabPlayerList(newValue)
  };

  const handleChangeTabNpcList = (event: React.SyntheticEvent, newValue: number) => {
    setValueTabNpcList(newValue);
  };
  //#endregion

  //#region Functions
  function click_AtualizarBtn() {
    console.log('listPlayer', listPlayer);
    console.log('listNpc', listNpc);
  }

  function click_ComecarBtn() {

  }
  //#endregion


  return (
    <Container sx={{ display: { xs: 'none', lg: 'flex' } }}>
      {/* Panel - Lista de Personagens */}
      <Box sx={{ width: '50vw !important', height: '80vh', border: 1, borderColor: 'divider', m: 3, mt: 8 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={valueTabPLayerList} onChange={handleChangeTabPlayerList} aria-label="basic tabs example">
            <Tab icon={<Person />} iconPosition="start" label="Jogadores" {...a11yProps(0)} />
            <Tab icon={<SmartToy />} iconPosition="start" label="NPCs" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={valueTabPLayerList} index={0}>
          <CharList inner render={1} updateCharList={(list: React.SetStateAction<Character[]>) => setListPlayer(list)}></CharList>
        </TabPanel>
        <TabPanel value={valueTabPLayerList} index={1}>
          <CharList render={2} updateCharList={(list: React.SetStateAction<Character[]>) => setListNpc(list)}></CharList>
        </TabPanel>
      </Box>

      {/* Panel - Gerenciamento de turno */}
      <Box sx={{ width: '50vw', minHeight: '80vh', border: 1, borderColor: 'divider', m: 3, mt: 8 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={valueTabNpcList} onChange={handleChangeTabNpcList} aria-label="basic tabs example">
            <Tab icon={<List />} iconPosition="start" label="Lista" {...a11yProps(0)} />
            <Tab icon={<PlayArrow />} iconPosition="start" label="Combate" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={valueTabNpcList} index={0}>
          <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <Button variant="contained" color="primary" endIcon={<Refresh />} onClick={click_AtualizarBtn}>
              Atualizar
            </Button>
            <Button variant="contained" color="success" endIcon={<PlayArrow />} onClick={click_ComecarBtn}>
              Começar
            </Button>
          </Box>
        </TabPanel>
        <TabPanel value={valueTabNpcList} index={1}>

        </TabPanel>
      </Box>
    </Container>
  );
}


