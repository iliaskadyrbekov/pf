import React from 'react';
import TaskLayout from './TaskLayout';

interface ITaskProps {
  icon: React.ReactNode;
  iconText: string;
  title: string;
  description: string;
  button: React.ReactNode;
}

const Task = ({ icon, iconText, title, description, button }: ITaskProps) => {
  return <TaskLayout icon={icon} iconText={iconText} title={title} description={description} button={button} />;
};

export default Task;
