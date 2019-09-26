import React from 'react';
import { HealthReportPanelHeader, PanelContent, WellbeingChart } from '../../../Components';
import { useWellness } from "../Hooks";

const WellbeingScores = ({ traversalId }) => {
    const wellness = useWellness(traversalId);
    return (
        <>
            <HealthReportPanelHeader>
                Your lifestyle and wellbeing scores
            </HealthReportPanelHeader>
            <PanelContent>
                <WellbeingChart scores={wellness.scores} />
            </PanelContent>
        </>
    )
}

export default WellbeingScores;