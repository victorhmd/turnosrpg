import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Person, SmartToy, List, PlayArrow } from '@mui/icons-material/';
import { Container } from '@mui/material';
import CharList from './components/charList/CharList';

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
      {<Box sx={{ p: 3 }}>
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
  const [valueTabPLayerList, setValueTabPlayerList] = React.useState(0);

  const handleChangeTabPlayerList = (event: React.SyntheticEvent, newValue: number) => {
    setValueTabPlayerList(newValue);
  };

  const [valueTabNpcList, setValueTabNpcList] = React.useState(0);

  const handleChangeTabNpcList = (event: React.SyntheticEvent, newValue: number) => {
    setValueTabNpcList(newValue);
  };

  return (
    <div>
      <Container sx={{ display: { xs: 'none', lg: 'flex' } }}>
        <Box sx={{ width: '50vw', height: '80vh', border: 1, borderColor: 'divider', m: 3, mt: 8 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueTabPLayerList} onChange={handleChangeTabPlayerList} aria-label="basic tabs example">
              <Tab icon={<Person />} iconPosition="start" label="Jogadores" {...a11yProps(0)} />
              <Tab icon={<SmartToy />} iconPosition="start" label="NPCs" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={valueTabPLayerList} index={0}>
            <CharList render={1}></CharList>
          </TabPanel>
          <TabPanel value={valueTabPLayerList} index={1}>
            <CharList render={2}></CharList>
          </TabPanel>
        </Box>

        <Box sx={{ width: '50vw', height: '80vh', border: 1, borderColor: 'divider', m: 3, mt: 8 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueTabNpcList} onChange={handleChangeTabNpcList} aria-label="basic tabs example">
              <Tab icon={<List />} iconPosition="start" label="Lista" {...a11yProps(0)} />
              <Tab icon={<PlayArrow />} iconPosition="start" label="Combate" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={valueTabNpcList} index={0}>

          </TabPanel>
          <TabPanel value={valueTabNpcList} index={1}>

          </TabPanel>
        </Box>
      </Container>
    </div>

  );
}


