import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';

const QuestionItemEntry = ({ questionnaire, visible, toggleVisibility }) => {
    const [entry, setEntry] = useState({
        title: "",
        type: "",
        value: "",
        product: ""
    });

    const onSubmit = () => {
        questionnaire.add(entry);
        toggleVisibility()
    };

    return (
        <Modal
            title={"Add new question"}
            visible={visible}
            onOk={onSubmit}
            onCancel={toggleVisibility}
        >
            <Form>
                <Form.Item label={"Title"}>
                    <Input value={entry.title} onChange={(event) => {
                        const { value } = event.target;
                        setEntry(prevState => ({ ...prevState, title: value }))
                    }}/>
                </Form.Item>
                <Form.Item label={"Type"}>
                    <Select onChange={(value) => {
                        setEntry(prevState => ({ ...prevState, type: value }))
                    }}>
                        <Select.Option value={"text"}>Text</Select.Option>
                        <Select.Option value={"boolean"}>Boolean</Select.Option>
                        <Select.Option value={"date"}>Date</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label={"Product"}>
                    <Select defaultValue={"Insurance"} onChange={(value) => {
                        setEntry(prevState => ({ ...prevState, type: value }))
                    }}>
                        <Select.Option value={"Insurande"}>Insurance</Select.Option>
                        <Select.Option value={"Covid"}>Covid</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default QuestionItemEntry;
