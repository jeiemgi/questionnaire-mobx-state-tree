import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Layout, Button, Card } from 'antd';
import QuestionnaireItemView from './QuestionnaireItemView';
import QuestionItemEntry from './QuestionItemEntry';

const QuestionnaireView = ({ questionnaire }) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <QuestionItemEntry
                questionnaire={questionnaire}
                visible={modalVisible}
                toggleVisibility={() => setModalVisible(false)}
            />
            <Layout>
                <Layout.Header>
                    <Button
                        type={"primary"}
                        onClick={() => setModalVisible(!modalVisible)}
                    >
                        Add new question
                    </Button>
                </Layout.Header>
                <Layout.Content>
                    <Card>
                        {
                            questionnaire.items.map((item, index) => (
                                <QuestionnaireItemView
                                    key={`QuestionnaireItem-${index}`}
                                    item={item}
                                />
                            ))
                        }
                    </Card>
                </Layout.Content>
            </Layout>
        </>
    )


};

export default observer(QuestionnaireView);
