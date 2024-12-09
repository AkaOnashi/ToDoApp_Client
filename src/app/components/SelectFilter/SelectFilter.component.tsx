import React from 'react';
import { Select, Space } from 'antd';
import { TaskStatuses } from '../../types/TaskStatuses';



type SelectFilterProps = {
  value: number;
  onChange: (value: number) => void; 
};

const SelectFilter: React.FC<SelectFilterProps> = ({value, onChange}) => (
  <Space wrap>
    <Select
      value={value}
      style={{ width: 120 }}
      onChange={onChange}
      options={[
        { value: 0, label: 'ToDo' },
        { value: 1, label: 'In Progress' },
        { value: 2, label: 'Done' },
        { value: 3, label: 'Show All' },
      ]}
    />
  </Space>
);

export default SelectFilter;