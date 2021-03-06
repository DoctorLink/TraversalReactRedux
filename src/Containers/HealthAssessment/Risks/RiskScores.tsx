import React, { useState } from 'react';
import {
  HealthReportPanelHeader,
  PanelContent,
  InlineDropdown,
  RiskChart,
  UpdateWhenVisible,
} from '../../../Components';
import { useRiskSummary } from '../Hooks';

const AgeOptions = [50, 60, 70, 80, 90, 100, 110];

const RiskScores: React.FC<{
  traversalId?: any;
}> = ({ traversalId }) => {
  const [selectedAge, setSelectedAge] = useState(90);
  const riskSummary = useRiskSummary(traversalId, AgeOptions);
  if (!riskSummary) return null;

  const { age, risks } = riskSummary;
  const visibleAgeOptions = AgeOptions.filter(option => option > age);
  const selectedTimescale = selectedAge - age;
  const selectedRisks = risks.filter(
    (risk: any) => risk.time === selectedTimescale
  );
  const onDropdownChange = (e: any) => setSelectedAge(e.target.value);
  return (
    <>
      <HealthReportPanelHeader>
        Your risks before the age of{' '}
        <InlineDropdown
          options={visibleAgeOptions}
          value={selectedAge}
          onChange={onDropdownChange}
        />
      </HealthReportPanelHeader>
      <PanelContent>
        <UpdateWhenVisible offset={{ top: -30 }}>
          <RiskChart risks={selectedRisks} />
        </UpdateWhenVisible>
      </PanelContent>
    </>
  );
};

export default RiskScores;
