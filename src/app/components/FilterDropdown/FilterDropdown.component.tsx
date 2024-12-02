import React from 'react';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import './FilterDropdown.styles.scss';

const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span className="todo-text text">ToDo</span>
      ),
    },
    {
      key: '2',
      label: (
        <span className="progres-text text">In Progress</span>
      ),
    },
    {
      key: '3',
      label: (
        <span className="done-text text">Done</span>
      ),
    },
    {
        key: '4',
        label: (
          <span className="showall-text text">Show all</span>
        ),
    },
  ];
  
  const FilterDropdown: React.FC = () => (
    <Dropdown menu={{ items }} placement="bottom">
          <Button>Filter</Button>
    </Dropdown>
  );
  
  export default FilterDropdown;