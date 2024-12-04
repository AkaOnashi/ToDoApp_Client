import React, { useState} from 'react';
import './ToDoList.styles.scss';
import { observer } from "mobx-react-lite";
import ToDoListStore from '../../app/stores/ToDoList-store';
import ToDoItem from '../ToDoItem/ToDoItem.component';
import { Button, Input, Modal} from "antd";
import { TaskStatuses } from '../../app/types/TaskStatuses';
import FilterDropdown from '../../app/components/FilterDropdown/FilterDropdown.component';
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

function ToDoList() {
    const[newTask, setNewTask] = useState("");

    function handleInputChange(event:  React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

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

    
  
    return(
        <div>
            <div className="input-box">
            <Input
                type="text"
                placeholder="Enter a task..."
                value={newTask}
                onChange={handleInputChange} />

            <Button
                className="addtask-button"
                type="primary"
                onClick={() => {
                    ToDoListStore.addTask(newTask);
                    setNewTask("");
                }}>
                Add Task        
            </Button>
            <span className="filter-button">
                <FilterDropdown/>
            </span>
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
                        id={task.id}
                        key={task.id}
                        title={task.title}
                        description={task.description}
                        status={task.status}
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