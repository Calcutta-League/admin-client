import React, { useState, useEffect } from 'react';
import { useNavState, useNavDispatch } from '../../context/navContext';
import { Modal, Form, Input, Button, Checkbox } from 'antd';
import { signIn } from '../../services/auth/auth.service';
import { useAuthDispatch } from '../../context/authContext';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  style: { textAlign: 'center' },
  wrapperCol: { span: 24 }
};

function AuthModal() {

  const { authModalVisible } = useNavState();

  const navDispatch = useNavDispatch();
  const authDispatch = useAuthDispatch();

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    signIn(values.email, values.password).then(response => {
      if (response.token !== undefined) {
        authDispatch({ type: 'update', key: 'token', value: response.token });
      }

      dismissModal();
      setLoading(false);
    }).catch(error => {
      // display error message
      setLoading(false);
    });
  }

  const handleCancel = (event) => {
    console.log(event);

    setLoading(false);

    dismissModal();
  }

  const dismissModal = () => {
    navDispatch({ type: 'update', key: 'authModalVisible', value: false });
  }

  return (
    <Modal
      visible={authModalVisible}
      onCancel={handleCancel}
      closable={false}
      maskClosable={true}
      footer={null}
      style={{ maxWidth: '480px' }}
      title='Please Sign In'
    >
      <Form
        {...layout}
        name='basic'
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name='remember' valuePropName='checked'>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit' loading={loading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AuthModal;