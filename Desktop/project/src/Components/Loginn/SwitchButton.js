import React from 'react';
import { Switch } from 'antd';
import '/Users/max/Desktop/project/src/Components/Loginn/SwitchButton.css'

const onChange = (checked) => {
  console.log(`switch to ${checked}`);
};
const SwitchButton = ({onChange}) => (<Switch onChange={onChange} className='custom-switch' />);
export default SwitchButton;

