import React from 'react';
import { Button, Form, Input } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
};

const tailLayout = {
  style: { textAlign: 'center' },
  wrapperCol: { span: 24 }
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 16, offset: 6 },
  },
};

const addFieldLayout = {
  wrapperCol: {
    xs: { span: 16, offset: 4 }
  }
};

function NewTournamentPhaseFormList() {

  return (
    <Form.List
      name='phases'
      rules={[
        {
          validator: async (_, phases) => {
            if (!phases || phases.length < 1) {
              return Promise.reject(new Error('At least one phase is required'));
            }
          },
        }
      ]}
    >
      {(fields, { add, remove }, { errors }) => (
        <>
          {fields.map((field, index) => (
            <Form.Item
              {...(index === 0 ? layout : formItemLayoutWithOutLabel)}
              label={index === 0 ? 'Phases' : ''}
              required={false}
              key={field.key}
            >
              <Form.Item
                {...field}
                validateTrigger={['onChange', 'onBlur']}
                rules={[
                  {
                    required: true,
                    whitespace: true,
                    message: 'Please enter a phase name or delete this field',
                  },
                ]}
                noStyle
              >
                <Input placeholder='Phase name' style={{ width: '80%' }} />
              </Form.Item>
              {fields.length > 1 ? (
                <MinusCircleOutlined
                  className='dynamic-delete-button'
                  onClick={() => remove(field.name)}
                />
              ) : null}
            </Form.Item>
          ))}
          <Form.Item
            style={{ textAlign: 'center' }}
            {...addFieldLayout}
          >
            <Button
              type='dashed'
              onClick={() => add()}
              style={{ width: '100%' }}
              icon={<PlusOutlined />}
            >
              Add Phase
            </Button>
            <Form.ErrorList errors={errors} />
          </Form.Item>
        </>
      )}
    </Form.List>
  );
}

export default NewTournamentPhaseFormList;