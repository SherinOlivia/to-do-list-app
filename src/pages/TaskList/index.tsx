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
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const getName = useCallback(
    async () => {
      try {
        const response = await fetch (`http://127.0.0.1:5000/user/profile`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `${token}`
          }
        })
    
        if(response.ok){
          const data = await response.json()
          setUser?.(data)
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
    const response = await fetch('http://127.0.0.1:5000/task/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }
    });
    const data = await response.json();
    console.log(data)
    
    if (data) {
      const datas = data.tasks.map((task: { id: number }) => ({
        ...task,
        key: task.id
      }));

      datas.sort((a: { due_date: string }, b: { due_date: string }) => {
        if (a.due_date && b.due_date) {
          return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
        }
        return 0;
      });
      
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
  const removeTask = async (task_id: number) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/task/delete/${task_id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`
          }
        })
  
        if(response) {
          setTasks((prevTasks) =>
          prevTasks.filter((task) => task.id !== task_id)
        );
          console.log('Successfully Removed Task');
        }
    } catch (error) {
        console.error(error)
    }
  }
  
  const handleStatus = async (task: TaskListInfo) => {
    const newStatus = task.status === 'COMPLETED' ? 'ONGOING' : 'COMPLETED';
    const requestBody = {
      status: newStatus,
    };
    try {
      const response = await fetch(`http://127.0.0.1:5000/task/update/${task.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify(requestBody)
      });
  
      if (response) {
        setTasks((prevTasks) =>
          prevTasks.map((prevTask) =>
            prevTask.id === task.id ? { ...prevTask, status: newStatus } : prevTask
          ) as TaskListInfo[]
        );
        console.log('Successfully Updated Task Status');
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
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => text || 'N/A',
    },       
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => (
        <>
          <label>
            <Checkbox type="checkbox"
              checked={record.status === 'COMPLETED'}
              onChange={() => handleStatus(record)}
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
    <div className={styles.categoryList}>
      <div>
        <div className={styles.categoryTitle}>
          <span><Button type={'primary'} onClick={() => navigate('/add')}>Create New</Button></span>

          <h1> {user?.name}'s Task List </h1>
        </div>

        <TaskListComponent 
        columns={columns} 
        data={tasks || []}
        />

        <Link to="/dashboard" className={styles.link}>Return</Link>

        <div className={styles.taskListBody}></div>
      </div>
    </div>
  )
}

export default TaskList;