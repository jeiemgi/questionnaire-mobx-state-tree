import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { clone, getSnapshot, applySnapshot } from 'mobx-state-tree';
import { Card, Button, Typography } from 'antd';
import { EditOutlined, DeleteFilled, SaveFilled } from '@ant-design/icons';
import QuestionnaireItemEditable from './QuestionItemEdit';


const QuestionnaireItemView = ({ item }) => {
    const [state, setState] = useState({
        isEditing: false,
        clone: null
    });

    const onEdit = () => {
        setState({
            isEditing: true,
            clone: clone(item)
        });
    };


    const onCancelEdit = () => {
        setState({
            isEditing: false,
        });
    };

    const onSaveEdit = () => {
        applySnapshot(item, getSnapshot(state.clone));

        setState({
            isEditing: false,
            clone: null
        });
    };

    return (
        <Card type={"inner"} title={item.title} actions={[
            <Button
                type={"primary"}
                disabled={state.isEditing}
                onClick={onEdit}
                icon={<EditOutlined/>}
            />,
            <Button
                type={"danger"}
                disabled={state.isEditing}
                onClick={item.remove}
                icon={<DeleteFilled/>}
            />,
            <Button
                type={"danger"}
                disabled={!state.isEditing}
                onClick={onCancelEdit}
                icon={<DeleteFilled/>}
            />,
            <Button
                type={"primary"}
                disabled={!state.isEditing}
                onClick={onSaveEdit}
                icon={<SaveFilled/>}
            />,
        ]}>
            {
                !state.isEditing &&
                <Typography> {item.value ? item.value : "No hay valor"}</Typography>
            }
            {
                state.isEditing &&
                <QuestionnaireItemEditable item={state.clone} isEditing={state.isEditing}/>
            }
        </Card>
    )
};

export default observer(QuestionnaireItemView);
