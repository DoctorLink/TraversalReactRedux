import React from 'react'

import Response from '../Components/Response'
import Question from '../Components/Question'
import Section from '../Components/Section'
import Answer from '../Components/Answer'
import Label from '../Components/Label'
import InfoIcon from '../Components/InfoIcon'

import Checkbox from '../Containers/ConnectedCheckbox'
import Radio from '../Containers/ConnectedRadio'
import TextField from '../Containers/ConnectedTextField'
import NumberField from '../Containers/ConnectedNumberField'
import DateField from '../Containers/ConnectedDateField'

export default ({ question, answers, error, showExplanation }) => {
    const display = question.data.display ? question.data.display : [{ header: null, answers: question.answers.map(x => Number(x.split("_")[2])) }];
    return (<Response>
        <Question displayText={question.displayText} error={error}>
            <InfoIcon onClick={showExplanation} explanation={question.explanation} />
        </Question>
        {display.map((section, i) => {
            const sectionAnswerKeys = question.answers.filter(x => section.answers.includes(Number(x.split("_")[2])));
            return (<React.Fragment key={i}>
                <Section text={section.header}/>
                {sectionAnswerKeys.map((answerId) => { 
                    const answer = answers[answerId]
                    return (<Answer key={answerId}>
                        <Label answer={answer}>
                            {answer.controlType === "Radio" && <Radio answer={answer} answerId={answerId} questionAnswerIds={question.answers} />}
                            {answer.controlType === "Checkbox" && <Checkbox answer={answer} answerId={answerId} questionAnswerIds={question.answers} />}
                            {answer.controlType === "Text" && <TextField answer={answer} answerId={answerId} questionAnswerIds={question.answers} />}
                            {answer.controlType === "Number" && <NumberField answer={answer} answerId={answerId} questionAnswerIds={question.answers} />}
                            {answer.controlType === "Date" && <DateField answer={answer} answerId={answerId} questionAnswerIds={question.answers} />}
                        </Label>
                        <InfoIcon onClick={showExplanation} explanation={answer.explanation} />
                    </Answer>)
                })}
            </React.Fragment>)
        })}
    </Response>)
};