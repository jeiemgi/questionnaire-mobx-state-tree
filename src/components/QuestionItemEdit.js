import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react';
import { Checkbox, DatePicker, Input } from 'antd';

const QuestionnaireItemEditable = ({ item, isEditing }) => {

    const onInputChange = (event) => {
        item.changeValue(event.target.value);
    };

    const onCheckboxChange = (event) => {
        item.changeValue(event.target.checked.toString());
    };

    const onDatePickerChange = (event, dateString) => {
        item.changeValue(dateString);
    };

    const commonProperties = {
        disabled: !isEditing,
        size: "large"
    };

    switch (item.type) {
        default:
        case "text":
            return (
                <Input
                    value={item.value}
                    onChange={onInputChange}
                    {...commonProperties}
                />
            );
        case "boolean":
            return (
                <Checkbox
                    checked={item.value === "true"}
                    onChange={onCheckboxChange}
                    {...commonProperties}
                />
            );
        case "date":
            return (
                <DatePicker
                    value={item.value ? moment(item.value) : null}
                    onChange={onDatePickerChange}
                    {...commonProperties}
                />
            );
    }

};

export default observer(QuestionnaireItemEditable)
