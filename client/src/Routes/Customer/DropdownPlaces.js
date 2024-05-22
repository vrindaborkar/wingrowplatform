import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ProductContext from '../../cartContext/ProductContext';
import React , {useContext} from 'react';

export default function Dropdownplaces() {
  const {places , handleClickDrop} = useContext(ProductContext)
  const [val, setVal] = React.useState('');

  const handleChange = (event) => {
    setVal(event.target.value);
  };


  return (
    <FormControl sx={{ m: 1, minWidth: 120 , maxWidth: 300 , alignSelf:"center"}} size="small">
      <InputLabel id="demo-select-small">Market</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={val}
        label="Value"
        onChange={handleChange}
      >
        {
            places && places.map((e,i)=>{
                return(
                    <MenuItem key={i} value={e} onClick={handleClickDrop}>{e}</MenuItem>
                )
            })
        }
      </Select>
    </FormControl>
  );
}
