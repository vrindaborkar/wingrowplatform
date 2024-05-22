import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({data , handleClickDrop}) {
  const [val, setVal] = React.useState('');
  const set = new Set();
  const arr = [];

  if(data)
    {
      for(let item of data){
      set.add(item.location)
    }
  }

  for(let key of set) arr.push(key)

  const handleChange = (event) => {
    setVal(event.target.value);
  };


  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Market</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={val}
        label="Value"
        onChange={handleChange}
      >
        {
            arr && arr.map((e,i)=>{
                return(
                    <MenuItem key={i} value={e} onClick={handleClickDrop}>{e}</MenuItem>
                )
            })
        }
      </Select>
    </FormControl>
  );
}
