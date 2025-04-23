import React from 'react';
import { Button, Input, Space } from 'antd';
const options = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
  },
];
const SendButton = ({message,setMessage,handleSendMessage}) => (
  <Space direction="vertical" size="middle" style={{ width: '100%' }}>
    <Space.Compact style={{ width: '100%' }}>
      <Input
        allowClear
        placeholder= "Write"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
         />
      <Button onClick={handleSendMessage} type="primary">Submit</Button>
    </Space.Compact>
  </Space>
);
export default SendButton;