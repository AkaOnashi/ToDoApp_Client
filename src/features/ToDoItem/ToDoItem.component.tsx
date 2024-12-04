import React, { useState} from 'react';     
import './ToDoItem.styles.scss';
import { Button,
    message,
    Popconfirm,
    PopconfirmProps,
    Checkbox,
    CheckboxProps,
    Modal,
    Input,
    Flex,
    Radio } from 'antd';
import { observer } from "mobx-react-lite";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskStatuses } from '../../app/types/TaskStatuses';

interface ToDoItemProps {
    id: number;
    title: string; 
    description: string;
    status: TaskStatuses;
    toggleTask: (id: number) => void;
    deleteTask: (id: number) => void; 
    updateTask: (id: number, newTitle: string, newDescription: string, newStatus: TaskStatuses) => void; 
}

const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
    message.success('Task was deleted');
  };
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
  };
  
const ToDoItem: React.FC<ToDoItemProps> = ({
    id,
    title,
    description,
    status,
    toggleTask,
    deleteTask,
    updateTask
    }) => {

    const { attributes, listeners, setNodeRef, transform, transition,  } = useSortable({ id });
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedStatus, setUpdatedStatus] = useState(status);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const options = [
        { label: 'ToDo', value: TaskStatuses.ToDo },
        { label: 'In Progress', value: TaskStatuses.InProgress },
        { label: 'Done', value: TaskStatuses.Done },
      ];

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: transition,
    };

    const handleConfirm = () => {
        deleteTask(id); 
        confirm(undefined); 
    };

    function handleUpdatedTitle(event:  React.ChangeEvent<HTMLInputElement>) {
        setUpdatedTitle(event.target.value);
    }

    function handleUpdatedStatus(event: any) {
        setUpdatedStatus(event.target.value);
    }

    function handleUpdatedDescription(event:  React.ChangeEvent<HTMLInputElement>) {
        setUpdatedDescription(event.target.value);
    }

    const showModal = () => {
        setIsModalOpen(true);
        setUpdatedStatus(status);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        updateTask(id, updatedTitle, updatedDescription, updatedStatus)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        
        <li className="todo-item" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            
            <div className="first-row">
            <Checkbox checked={status === TaskStatuses.Done} onChange={() => toggleTask(id)}></Checkbox>  

            <span className={`task-name ${status === TaskStatuses.Done? 'completed' : ''}`}>{title}</span>
            <span className="status-text">{status}</span>
            
            <Button 
                className="edit-button"
                color="default" 
                variant="filled"
                onClick={showModal}>
                Edit
            </Button>
            
            <Modal title="Edit your task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p className="modal-text">Title</p>
                <Input 
                    type="text"
                    value={updatedTitle}
                    onChange={handleUpdatedTitle}/>

                <p className="modal-text">Description</p>
                <Input 
                    type="text"
                    value={updatedDescription}
                    onChange={handleUpdatedDescription}/>

                <p className="modal-text">Status</p>
                <Flex vertical gap="middle">
                    <Radio.Group 
                    block options={options}
                    value={updatedStatus}
                    onChange={handleUpdatedStatus}
                    optionType="button" />
                </Flex>
            </Modal>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={handleConfirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No">
                    <Button danger className="delete-button">
                        Delete
                    </Button>
            </Popconfirm>
            </div>
            <div className="second-row">
                <p className="description-text">{description}</p>
            </div>
        </li>
    );
}

export default observer(ToDoItem)