import React from 'react';
import { DatePicker, Space } from 'antd';
const onChange = (date, dateString) => {
  console.log(date, dateString);
};
const Date = () => (
  <Space direction="vertical">
    <DatePicker  onChange={onChange} picker="date" min="2017-01-01" max="2022-01-01"/>
  </Space>
);
export default Date;