import { Button, Card, Col, Select, Row, Input, Form as AntForm, DatePicker } from 'antd';
import styles from './CreateTask.module.css'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import { TaskListInfo, CreateTaskInfo } from "../../types";
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'

interface Props {
    onSubmit: (values: CreateTaskInfo) => void;
    task?: TaskListInfo
}
const initialValues = {
    title: '',
    purpose: '',
    description: '',
    priority:'',
    due_date: null
}

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please Give the Task a Title'),
    purpose: Yup.string().oneOf(['WORK','STUDY','GENERAL','PERSONAL'], 'Please Select the Task Purpose').required('Please Select the Task Purpose!'),
    priority: Yup.string().oneOf(['LOW','MEDIUM','HIGH'], 'Please set the Task Priority Level').required('Please set the Task Priority Level!'),
    description: Yup.string().required('Please Give the Task a Description'),
    due_date: Yup.date().required('Please set a Due Date'),
})

const CreateTask = ({onSubmit, task}: Props) => {
    const handleTask = async (values: CreateTaskInfo) => {
        onSubmit(values)
    }
    
    return (
        <Row className={styles.wrapper}>
        <Col span={8}></Col>
        <Col span={8}>
            <Card className={styles.card}>
                <Formik 
                initialValues={task ?? initialValues}
                validationSchema={validationSchema}
                onSubmit={handleTask}>
                    {(formikProps) => (
                    <Form name="basic" autoComplete="off" >
                        <div className={styles.middle}>
                            <h3> Create New Task </h3>
                            <Link to={'/task'} className={styles.link}>Back</Link>
                        </div>


                        <AntForm.Item label="Title" name="title">
                            <div>
                                <Field name="title" as={Input} placeholder="Enter Title" />
                        
                                <span className={styles.error}>
                                    <ErrorMessage name="title" />
                                </span>
                            </div>

                        </AntForm.Item>

                        <AntForm.Item label="Description" name="description">
                            <div>
                                <Field className={styles.descriptionField} as={Input} name="description" placeholder="Enter Description" />
                        
                                <span className={styles.error}>
                                    <ErrorMessage name="description" />
                                </span>
                            </div>
                        </AntForm.Item>

                        <AntForm.Item label="Purpose" name="purpose">
                            <div>
                                <Select onChange={(value) => {
                                formikProps.setFieldValue("purpose", value);
                                }} 
                                value={formikProps.values.purpose || undefined} placeholder="Select Purpose"
                                >
                                <Select.Option value="WORK">WORK</Select.Option>
                                <Select.Option value="STUDY">STUDY</Select.Option>
                                <Select.Option value="GENERAL">GENERAL</Select.Option>
                                <Select.Option value="PERSONAL">PERSONAL</Select.Option>
                                </Select>
                                
                                <div className={styles.error}>
                                    <ErrorMessage name="purpose" />
                                </div>
                            </div>
                        </AntForm.Item>

                        <AntForm.Item label="Priority" name="priority">
                            <div>
                                <Select onChange={(value) => {
                                formikProps.setFieldValue("priority", value);
                                }} 
                                value={formikProps.values.priority || undefined} placeholder="Select Priority"
                                >
                                <Select.Option value="LOW">LOW</Select.Option>
                                <Select.Option value="MEDIUM">MEDIUM</Select.Option>
                                <Select.Option value="HIGH">HIGH</Select.Option>
                                </Select>
                                
                                <div className={styles.error}>
                                    <ErrorMessage name="priority" />
                                </div>
                            </div>
                        </AntForm.Item>

                        <AntForm.Item label="Due Date" name="due_date">
                            <div>
                                <DatePicker
                                showTime 
                                format="YYYY-MM-DD HH:mm:ss"
                                name="due_date"
                                placeholder="Enter the Due Date"
                                value={formikProps.values.due_date ? dayjs(formikProps.values.due_date) : null}
                                onChange={(due_date, _dateString) => formikProps.setFieldValue("due_date", due_date ? due_date.format("YYYY-MM-DD HH:mm:ss") : null)}
                                />
                                <span className={styles.error}>
                                <ErrorMessage name="due_date" />
                                </span>
                            </div>
                        </AntForm.Item>

                        <AntForm.Item wrapperCol={{ offset: 8, span: 16 }} className={styles.button}>
                            <div>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Create
                                </Button>
                            </div>
                        </AntForm.Item>
                    </Form>
                    )}
                </Formik>
            </Card>
        </Col>
        </Row>
    )
}

export default CreateTask