import {ColorPicker} from '@shopify/polaris';
import {useState} from 'react';

export function ColorPickerExample() {
  const [color, setColor] = useState({
    hue: 120,
    brightness: 0,
    saturation: 0,
  });
console.log(color);
  return <div style={{display:"flex",gap:"100px"}}>
  
  <ColorPicker onChange={(obj)=>setColor({...obj})} color={color} />
  <div style={{color:"rgba(0, 0, 0, 0.5)",height:"100px",width:"100px",padding:"20px",display:"flex",alignItems:"center",fontWeight:"bold",justifyContent:"center",backgroundColor:`hsl(${color.hue},${color.saturation*100}%,${color.brightness*100}%)`}}>
    color
  </div>
  </div>;
}