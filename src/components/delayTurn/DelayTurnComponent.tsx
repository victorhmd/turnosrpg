import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue, red } from '@mui/material/colors';
import { Person, SmartToy, WatchLater } from '@mui/icons-material';
import { useEffect } from 'react';
import { Character } from '../../types/Character';
import ToastComponent from '../shared/ToastComponent';
import { GiPlayerNext } from "react-icons/gi";

const emails = ['username@gmail.com', 'user02@gmail.com'];

export interface SimpleDialogProps {
  open: boolean;
  // selectedValue: Character;
  onClose: (value: any) => void;
  charList: Character[]
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(null);
  };

  const handleListItemClick = (value: Character) => {
    onClose(value);
  };

  function renderAvatar(flag: string) {
    if (flag === "j") {
      return <ListItemAvatar>
        <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
          <Person />
        </Avatar>
      </ListItemAvatar>
    } else {
      return <ListItemAvatar>
        <Avatar sx={{ bgcolor: red[100], color: red[600] }}>
          <SmartToy />
        </Avatar>
      </ListItemAvatar>
    }
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Irá jogar depois de quem?</DialogTitle>
      <List sx={{ pt: 0 }}>
        {props.charList.map((char) => (
          <ListItem disableGutters>
            <ListItemButton onClick={() => handleListItemClick(char)} key={char.roundPos}>
              {renderAvatar(char.flag)}
              <ListItemText primary={char.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}

export default function SimpleDialogDemo(props: any) {
  const [open, setOpen] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState<Character>();
  const [charTurnList, setCharTurnList] = React.useState<Character[]>([]);

  const handleClickOpen = () => {
    if (charTurnList.length > 0) {
      setOpen(true);
    } else {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 500)
    }
  };

  const handleClose = (value: Character) => {
    setOpen(false);
    setShowToast(false);
    if (value)
      props.updateTurn(value);
      setSelectedValue(value);
  };

  useEffect(() => {
    if (props.charList)
      setCharTurnList(props.charList)
    setShowToast(false);
  }, [props]);

  function renderBtn() {
    if (props.render === 2) {
      return <Button variant="contained" size="large" color="info" fullWidth onClick={handleClickOpen}>
        <GiPlayerNext size={25} />
      </Button>
    } else {
      return <Button variant="contained"  size="large" color="info" endIcon={<GiPlayerNext size={25} />} fullWidth onClick={handleClickOpen}>
        Atrasar
      </Button>
    }
  }
  return (
    <div>
      {renderBtn()}
      <SimpleDialog
        open={open}
        onClose={handleClose}
        charList={charTurnList}
      />

      <ToastComponent message={"O personagem atual é o último do turno!"} severity={"warning"} open={showToast}/>
    </div>
  );
}