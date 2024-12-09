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
    Radio,
    Slider, 
    Switch, 
    Typography } from 'antd';
import { observer } from "mobx-react-lite";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskStatuses } from '../../app/types/TaskStatuses';
import { Task } from '../../app/types/Task.model';
import TruncatedText from '../../app/components/TruncutedText/TruncutedText.component';
import { DeleteOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface ToDoItemProps {
    task: Task;
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
    task,
    toggleTask,
    deleteTask,
    updateTask
    }) => {

    const [updatedTitle, setUpdatedTitle] = useState(task.title);
    const [updatedStatus, setUpdatedStatus] = useState(task.status);
    const [updatedDescription, setUpdatedDescription] = useState(task.description);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { attributes, listeners, setNodeRef, transform, transition,  } = useSortable({ id: task.id, disabled: isModalOpen });
    
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
        deleteTask(task.id); 
        confirm(undefined); 
    };

    function handleUpdatedTitle(event:  React.ChangeEvent<HTMLInputElement>) {
        setUpdatedTitle(event.target.value);
    }

    function handleUpdatedStatus(event: any) {
        setUpdatedStatus(event.target.value);
    }

    function handleUpdatedDescription(event:  React.ChangeEvent<HTMLTextAreaElement>) {
        setUpdatedDescription(event.target.value);
    }

    const showModal = () => {
        setIsModalOpen(true);
        setUpdatedStatus(task.status);
        
    };

    const handleOk = () => {
        setIsModalOpen(false);
        
        updateTask(task.id, updatedTitle, updatedDescription, updatedStatus)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        
        <li className="todo-item" ref={setNodeRef} style={style} {...attributes} {...listeners}>
            
            <div className="first-row">
            
            <Checkbox checked={task.status === TaskStatuses.Done} onChange={() => toggleTask(task.id)}></Checkbox>  

            <span className={`task-name ${task.status === TaskStatuses.Done? 'completed' : ''}`}>{task.title}</span>
            <span className={`status-text ${task.status === TaskStatuses.ToDo ? 'to-do' :
                task.status === TaskStatuses.InProgress ? 'in-progress' : 'done'
            }`}>{task.status}</span>
            
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
                    onChange={handleUpdatedTitle}
                    maxLength={70}/>

                <p className="modal-text">Description</p>
                <TextArea
                    className="description-modal"
                    rows={5} 
                    placeholder="Maximum Length is 500"
                    maxLength={500}
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
                        <DeleteOutlined/>
                    </Button>
            </Popconfirm>
            </div>
            <div className="second-row">
                <div >
                    <TruncatedText 
                        text={task.description}
                        maxLength={70} />
                </div>
            </div>
        </li>
    );
}

export default observer(ToDoItem)