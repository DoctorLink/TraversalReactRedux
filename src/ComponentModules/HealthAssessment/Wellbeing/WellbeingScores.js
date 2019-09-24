import React from 'react';
import { HealthReportPanelHeader, PanelContent } from '../../../Components';
import { useWellness } from "../Hooks";

const WellbeingScores = ({ traversalId }) => {
    const wellness = useWellness(traversalId);
    return (
        <>
            <HealthReportPanelHeader>
                Your lifestyle and wellbeing scores
            </HealthReportPanelHeader>
            <PanelContent>
                <ul>
                    {wellness.scores.map(score => <li key={score.name}>{score.name}: {score.score}</li>)}
                </ul>
            </PanelContent>
        </>
    )
}

export default WellbeingScores;