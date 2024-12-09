import React, { useEffect, useState} from 'react';
import './ToDoList.styles.scss';
import { observer } from "mobx-react-lite";
import ToDoListStore from '../../app/stores/ToDoList-store';
import ToDoItem from '../ToDoItem/ToDoItem.component';
import { Button, Input, Modal} from "antd";
import { TaskStatuses } from '../../app/types/TaskStatuses';
import SelectFilter from '../../app/components/SelectFilter/SelectFilter.component';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';

function ToDoList() {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const[newTask, setNewTask] = useState("");
    const [currentStatus, setCurrentStatus] = useState<number>(3);

    useEffect(() => {
        ToDoListStore.loadTasks(currentStatus);
      }, [currentStatus]);

    if (ToDoListStore.isLoading) {
    return <p>Loading tasks...</p>;
    }
    
    if (ToDoListStore.error) {
    return <p>Error: {ToDoListStore.error}</p>;
    }
    
    function handleInputChange(event:  React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const oldIndex = ToDoListStore.tasks.findIndex(
            (task) => task.id === active.id
        );
        const newIndex = ToDoListStore.tasks.findIndex(
            (task) => task.id === over.id
        );

        ToDoListStore.tasks = arrayMove(ToDoListStore.tasks, oldIndex, newIndex);
    };

    const handleFilterChange = (value: number) => {
        setCurrentStatus(value);
    };
  
    return(
        <div>
            <div className="nav-box">
            <div className="input-box">
            <Input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange}
                maxLength={70}/>

            <Button
                className="addtask-button"
                type="primary"
                onClick={() => {
                    ToDoListStore.addTask({title: newTask});
                    setNewTask("");
                }}>
            <PlusOutlined />
                Add Task        
            </Button>
            </div>
            <div className="filter-button">
                <SelectFilter value={currentStatus} onChange={handleFilterChange}/>
            </div>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
            <SortableContext
                items={ToDoListStore.tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
            >
            <ol>
                {ToDoListStore.tasks.map((task) => 
                    <ToDoItem 
                        task={task}
                        key={task.id}
                        toggleTask={ToDoListStore.toggleTask.bind(ToDoListStore)}
                        deleteTask={ToDoListStore.deleteTask.bind(ToDoListStore)}
                        updateTask={ToDoListStore.updateTask.bind(ToDoListStore)}/>
                )}
            </ol>
            </SortableContext>
            </DndContext>
        </div>);
}

export default observer(ToDoList)