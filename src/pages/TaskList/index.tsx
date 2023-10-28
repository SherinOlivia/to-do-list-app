import { useCallback, useContext, useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from 'react-router-dom';
import { TaskList as TaskListComponent } from '../../components'
import styles from './TaskList.module.css'
import { TaskListInfo } from '../../types';
import format from 'date-fns/format';
import { AuthContext } from '../../provider/AppProvider';

const TaskList: React.FC = () => {
  const {user, setUser } = useContext(AuthContext)
  const [tasks, setTasks] = useState<TaskListInfo[]>([]);
  const navigate = useNavigate();

  const getName = useCallback(
    async () => {
      try {
        const response = await fetch (`https://w18sh-ry.up.railway.app/api/users/profile`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: "include"
        })
    
        if(response.ok){
          const data = await response.json()
          setUser?.(data.data[0])
        } else {
          console.log("Error in Fetching User's Name..")
        }

      } catch (error) {
        console.error(error)
      }
    },[setUser])

    useEffect(
      () => {
        getName()
      },
      [getName])

  const getTaskList = useCallback(
    async () => {

  try {
    const response = await fetch('https://w18sh-ry.up.railway.app/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log(data)
    
    if (data && data.data) {
      const datas = data.data.map((task: { id: number }) => ({
        ...task,
        key: task.id
      }));
      setTasks(datas);
    } else {
      setTasks([]);
    }
  } catch (error) {
    console.error("ERROR:", error);
    alert("Failed to fetch Tasks!");
  }
},[navigate]);

useEffect(() => {
  getTaskList()
}, [getTaskList])

  // remove/delete item
  const removeTask = async (taskId: number) => {
    try {
        const response = await fetch(`https://w18sh-ry.up.railway.app/api/tasks/delete/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: "include",
        })
  
        if(response) {
          setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== taskId)
        );
          console.log('Successfully Removed Task');
        }
    } catch (error) {
        console.error(error)
    }
  }
  
  const handleCompleted = async (task: TaskListInfo) => {
    const newStatus = !task.completed;
    const requestBody = {
      completed: newStatus,
    };
    try {
      const response = await fetch(`https://w18sh-ry.up.railway.app/api/tasks/update/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });
  
      if (response) {
        setTasks((prevTasks) =>
          prevTasks.map((prevTask) =>
            prevTask.id === task.id ? { ...prevTask, completed: newStatus } : prevTask
          )
        );
        navigate(0);
        console.log('Successfully Updated Task Completion');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const columns: ColumnsType<TaskListInfo> = [
    {
      title: 'Purpose',
      dataIndex: 'purpose',
      key: 'purpose',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
      render: (dueDate) => dueDate ? format(new Date(dueDate), 'EEEE, d MMMM yyyy') : 'N/A',
    },        
    {
      title: 'Completed',
      dataIndex: 'completed',
      key: 'completed',
      render: (_, record) => (
        <>
          <label>
            <Checkbox
              checked={record.completed}
              onChange={() => handleCompleted(record)}
            />
          </label>
        </>
      ),
    },
    
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button type='primary' onClick={() => navigate(`/edit/${record.id}`)} className={styles.actionButton}>Edit</Button>
          <Button type='primary' onClick={() => removeTask(record.id)} htmlType="button" danger>Delete</Button>
        </>
      ),
    },
  ];
  

  return (
    <>
    <div className={styles.categoryList}>
      <div className={styles.categoryTitle}>
        <span><Button type={'primary'} onClick={() => navigate('/add')}>Create New</Button></span>

        <h1> {user?.username}'s Task List </h1>
      </div>
      <TaskListComponent
      columns={columns} 
      data={tasks || []}
      />
      <Link to="/dashboard" className={styles.link}>Return</Link>
      <div className={styles.taskListBody}></div>
    </div>
    </>
  )
}

export default TaskList;