import { SmileOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Input, Form as AntForm } from 'antd';
import { Formik, Form, Field, ErrorMessage,  } from 'formik';
import * as Yup from 'yup'
import styles from './Register.module.css'
import { RegisterInfo } from '../../types';
import { Link } from 'react-router-dom';

interface Props {
    onSubmit: (values: RegisterInfo) => void
}
const passwordValidationError = (str: string) => {
    return `Your Password must have at least 1 ${str} character`;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please Enter Your Name'),
    city: Yup.string().required('Please Enter Your City'),
    about_me: Yup.string().required('Tell us about yourself'),
    username: Yup.string().required('Please Enter Your Username'),
    email: Yup.string().email("Invalid Email!").required('Please Enter Your Email'),
    password: Yup.string().min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, passwordValidationError("digit"))
    .matches(/[a-z]/, passwordValidationError("lowercase"))
    .matches(/[A-Z]/, passwordValidationError("uppercase"))
    .required('Please Enter Your Password')
})

  const Register = ({ onSubmit }: Props) => {

    const handleRegister = async (values: RegisterInfo) => {
        console.log(`Successfully Registered..!`, values)
        onSubmit(values)
      }
      
      return (
        <Row className={styles.wrapper}>
            <Col span={8}></Col>
            <Col span={8} className={styles.body}>
                <Card title={"Register"} className={styles.card}>
                    <Formik 
                    initialValues = {{name: "", city: "", about_me: "",username: "", email: "", password: ""}}
                    validationSchema={validationSchema}
                    onSubmit={handleRegister}>
                        <Form name="basic" autoComplete="off">
                    
                            <AntForm.Item label="Name" name="name">
                                <div>
                                    <Field prefix={<SmileOutlined className="site-form-item-icon" />} 
                                    name="name" as={Input} placeholder="Enter Your Name" />

                                    <div className={styles.error}>
                                        <ErrorMessage name="name" />
                                    </div>
                                </div>
                            </AntForm.Item>

                            <AntForm.Item label="City" name="city">
                                <div>
                                    <Field prefix={<SmileOutlined className="site-form-item-icon" />} 
                                    name="city" as={Input} placeholder="Enter Your City" />

                                    <div className={styles.error}>
                                        <ErrorMessage name="city" />
                                    </div>
                                </div>
                            </AntForm.Item>

                            <AntForm.Item label="About Me" name="about_me">
                                <div>
                                    <Field prefix={<SmileOutlined className="site-form-item-icon" />} 
                                    name="about_me" as={Input} placeholder="Tell us about yourself" />

                                    <div className={styles.error}>
                                        <ErrorMessage name="about_me" />
                                    </div>
                                </div>
                            </AntForm.Item>

                            <AntForm.Item label="Username">
                                <div>
                                    <Field prefix={<SmileOutlined className="site-form-item-icon" />} 
                                    name="username" as={Input} placeholder="Enter Your Username" />
                                    
                                    <div className={styles.error}>
                                        <ErrorMessage name="username" />
                                    </div>
                                </div>
                            </AntForm.Item>
                    
                            <AntForm.Item label="Email" name="email">
                                <div>
                                    <Field prefix={<UserOutlined className="site-form-item-icon" />} 
                                    name="email" as={Input} placeholder="Enter Your Email" />
                                    
                                    <div className={styles.error}>
                                        <ErrorMessage name="email" />
                                    </div>
                                </div>
                            </AntForm.Item>
                        
                            <AntForm.Item label="Password" name="password">
                                <div>
                                    <Field prefix={<LockOutlined className="site-form-item-icon" />} 
                                    name="password" as={Input} placeholder="Enter Your Password" />

                                    <div className={styles.error}>
                                        <ErrorMessage name="password" />
                                    </div>
                                </div>
                            </AntForm.Item>
                        
                            <AntForm.Item wrapperCol={{ offset: 8, span: 16 }}>
                                <div>
                                    <Button type="primary" htmlType="submit" >
                                    register
                                    </Button>
                                    <Link to={'/login'} className={styles.link}>Back</Link>
                                </div>
                            </AntForm.Item>
                        </Form>
                    </Formik>
                </Card>
            </Col>
        </Row>
      )
 
    };

  export default Register