import React from 'react';
import QuestionnaireView from './QuestionnaireView';

function App({ questionnaire }) {
    return (
        <div className="App">
            <QuestionnaireView questionnaire={questionnaire}/>
        </div>
    );
}

export default App;
