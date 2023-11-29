import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'antd';
import { DashboardInfo } from '../../types';
import styles from './Dashboard.module.css'

const Dashboard: React.FC<DashboardInfo> = ({name, handleLogOut}) => {
    const navigate = useNavigate()

    return (
        <div className={styles.dashboardPage}>
            <Card title="Dashboard" bordered={false} className={styles.dashboard}>
                <p>Hello, <span className={styles.dashboardData}>{name}</span></p>
                <div className={styles.buttons}>
                    <Button onClick={() => navigate(`/profile`)} className={styles.profileButton}>Profile</Button>
                    <Button onClick={() => navigate(`/task`)} className={styles.tasksButton}>Task List</Button>
                    <Button onClick={(handleLogOut)} className={styles.logoutButton}>Log Out</Button>
                </div>
                <div className={styles.dashboardBody}></div>
            </Card>
        </div>
    )

};

export default Dashboard;