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
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
} from "@dnd-kit/sortable";
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { Task } from '../../models/Task.model';
import Spinner from '../../app/components/Spinner/Spinner.component';
import ErrorAlert from '../../app/components/ErrorAlert/ErrorAlert.component';

function ToDoList() {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const[newTask, setNewTask] = useState("");
    const [currentStatus, setCurrentStatus] = useState<number>(3);
    const [activeId, setActiveId] = useState(null);
    const [showSpinner, setShowSpinner] = useState(false);

    useEffect(() => {
        ToDoListStore.loadTasks(currentStatus);
      }, [currentStatus]);

      
    useEffect(() => {
        let timer: NodeJS.Timeout | null = null;

        if (ToDoListStore.isLoading) {
            timer = setTimeout(() => setShowSpinner(true), 1000); 
        } else {
            setShowSpinner(false); 
        }

        return () => {
            if (timer) clearTimeout(timer);
        };

    }, [ToDoListStore.isLoading]);

    if (ToDoListStore.error) {
        return <ErrorAlert errorMessage={ToDoListStore.error}/>
    }
    
    function handleInputChange(event:  React.ChangeEvent<HTMLInputElement>) {
        setNewTask(event.target.value);
    }

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

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
                modifiers={[restrictToWindowEdges]}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
            >
            <SortableContext
                items={ToDoListStore.tasks.map((task) => task.id)}
                strategy={verticalListSortingStrategy}
            >
            <ol>
                {ToDoListStore.isLoading && showSpinner ? (<div className="tasks-spinner">
                                <Spinner />
                            </div>) : (ToDoListStore.tasks.map((task) => 
                    <ToDoItem 
                        task={task}
                        key={task.id}
                        toggleTask={ToDoListStore.toggleTask.bind(ToDoListStore)}
                        deleteTask={ToDoListStore.deleteTask.bind(ToDoListStore)}
                        updateTask={ToDoListStore.updateTask.bind(ToDoListStore)}
                        />
                ))}
                
            </ol>
            </SortableContext>

            <DragOverlay>
            {activeId ? (
                <ToDoItem
                    task={ToDoListStore.tasks.find((task) => task.id === activeId)!}    
                    className="dragging-item"
                    toggleTask={() => {}}
                    deleteTask={() => {}}
                    updateTask={() => {}}/>
                ) : null}
            </DragOverlay>
            </DndContext>
        </div>);
}

export default observer(ToDoList)