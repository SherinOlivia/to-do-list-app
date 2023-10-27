import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';
import { ProfileInfo } from '../.././types';
import styles from './Profile.module.css'

const Profile: React.FC<ProfileInfo> = ({username, email, name, city, about_me }) => (
<div className={styles.profilePage}>
    <Card title="Profile Page" bordered={false} className={styles.profile}>
        <p>Username: <span className={styles.profileData}>{username}</span></p>
        <p>Email: <span className={styles.profileData}>{email}</span></p>
        <p>Name: <span className={styles.profileData}>{name}</span></p>
        <p>City: <span className={styles.profileData}>{city}</span></p>
        <p>About Me: <span className={styles.profileData}>{about_me}</span></p>
        <Link to="/dashboard" className={styles.link}>Return</Link>
        <div className={styles.profileBody}></div>

    </Card>
</div>

);

export default Profile;