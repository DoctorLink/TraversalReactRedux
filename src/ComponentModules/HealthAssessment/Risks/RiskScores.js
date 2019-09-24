import React, { useState } from 'react';
import { HealthReportPanelHeader, PanelContent, InlineDropdown, RiskChart } from '../../../Components';
import { useRiskSummary } from "../Hooks/useRiskSummary";

const AgeOptions = [50, 60, 70, 80, 90, 100, 110];

const RiskScores = ({traversalId}) => {
    const riskSummary = useRiskSummary(traversalId, AgeOptions);
    if (!riskSummary) return null;

    const { age, risks } = riskSummary;
    const visibleAgeOptions = AgeOptions.filter(option => option > age);
    const [selectedAge, setSelectedAge] = useState(90);
    const selectedTimescale = selectedAge - age;
    const selectedRisks = risks.filter(risk => risk.time === selectedTimescale);
    const onDropdownChange = e => setSelectedAge(e.target.value);
    return (
        <>
            <HealthReportPanelHeader>
                Your risks before the age of <InlineDropdown options={visibleAgeOptions} value={selectedAge} onChange={onDropdownChange} />
            </HealthReportPanelHeader>
            <PanelContent>
                <RiskChart risks={selectedRisks} />
            </PanelContent>
        </>
    )
}

export default RiskScores;