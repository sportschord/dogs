import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 42px;
`;

const InputSlider = () => {
    
    const [value, setValue] = React.useState(30);
    const handleSliderChange = (e, newValue) => {
        setValue(newValue);
    };
    

    return (
        <Box sx={{ width: 250 }}>
            <Typography id="input-slider" gutterBottom>
                Select Top N
            </Typography>
            <Grid container spacing={2} alignItems="center">
             
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        valueLabelDisplay="auto"
                    />
                </Grid>
               
            </Grid>
        </Box>
    );
}

export default InputSlider;
