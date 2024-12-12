import React from 'react';
import { Alert, Flex, Spin } from 'antd';

const contentStyle: React.CSSProperties = {
  padding: 0,
  margin: 40,
  //background: 'rgba(0, 0, 0, 0.05)',
  borderRadius: 4,
};

const content = <div style={contentStyle} />;

const Spinner: React.FC = () => (
    <Spin tip="Loading">{content}</Spin>
);

export default Spinner;