import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup(props) {
  return (
    <FormControl>
      {props.title}:
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={props.selectedValue} onChange={(e) => props.onRadioChange(e.target.value)}
      >
        {props.options.map((option, index) => (
          <FormControlLabel
            key={option}
            value={option}
            control={<Radio />}
            label={props.labels[index]}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}