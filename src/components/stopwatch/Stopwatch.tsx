import { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import { Button, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { Pause, PlayArrow, RestartAlt } from "@mui/icons-material";

const Stopwatch = (ref: any) => {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    

    useEffect(() => {
        let interval: any;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10);
            }, 10);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    function startOrPause() {
        setRunning(!running);
    };

    function reset() {
        setTime(0);
    };

    return (
        <Container sx={{ paddingLeft: "0px !important" }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Grid container spacing={1} alignItems="center" mb={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }} alignItems="center">
                        <Typography variant="h5">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}: {("0" + Math.floor((time / 1000) % 60)).slice(-2)}: {("0" + ((time / 10) % 100)).slice(-2)}</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="end">
                        <Button onClick={() => setRunning(!running)} variant="contained" color={!running ? "success" : "info"}>
                            {running ? <Pause /> : <PlayArrow />}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => setTime(0)} disabled={running} variant="contained" color="warning" sx={{ marginLeft: '10px' }}>
                            <RestartAlt />
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ display: { xs: 'flex', md: 'none', justifyContent: 'center' } }}>
                <Grid container spacing={1} alignItems="center" mb={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }} >
                        <Typography variant="h4">{("0" + Math.floor((time / 60000) % 60)).slice(-2)}: {("0" + Math.floor((time / 1000) % 60)).slice(-2)}: {("0" + ((time / 10) % 100)).slice(-2)}</Typography>
                    </Grid>
                    <Grid item xs={6} textAlign="center">
                        <Button onClick={() => setRunning(!running)} variant="contained" color={!running ? "success" : "info"}>
                            {running ? <Pause /> : <PlayArrow />}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button onClick={() => setTime(0)} disabled={running} variant="contained" color="warning" sx={{ marginLeft: '10px' }}>
                            <RestartAlt />
                        </Button>
                    </Grid>
                </Grid>
            </Box>



        </Container>
    );
};

export default Stopwatch;