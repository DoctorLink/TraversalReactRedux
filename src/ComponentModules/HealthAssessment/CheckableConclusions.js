import React, { useState } from "react";
import { connect } from "react-redux";
import { populateModal } from '../../Actions';
import { HealthReportPanelHeader, PanelContent, PanelConclusion, Checkbox, Label, InfoIcon, Answer } from "../../Components";

const CheckableConclusion = ({ conclusion, checked, onChange, showExplanation }) => (
    <Answer>
        <Label answer={conclusion}>
            <Checkbox type="checkbox" checked={checked} onChange={e => onChange(conclusion.assetId, e.target.checked)} />
        </Label>
        <InfoIcon onClick={showExplanation} explanation={conclusion.explanation} />
    </Answer>
)

const CheckableConclusions = ({ conclusions, checkableConclusions, onChange, dispatch }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const onCheckboxChange = (assetId, checked) => {
        const newSelectedIds = checked
            ? [...selectedIds, assetId]
            : selectedIds.filter(id => id !== assetId);
        setSelectedIds(newSelectedIds);
        onChange(newSelectedIds);
    }

    const showExplanation = explanation => dispatch(populateModal(explanation));

    const conclusionsToDisplay = conclusions.filter(c => !c.silent && checkableConclusions.indexOf(c.assetId) > -1);

    if (conclusionsToDisplay.length === 0) {
        return null;
    }

    return (
        <>
            <HealthReportPanelHeader>
                See the impact of making the following changes to your lifestyle
            </HealthReportPanelHeader>
            <PanelContent>
                {conclusionsToDisplay.map(conc => (
                    <PanelConclusion key={conc.assetId}>
                        <CheckableConclusion
                            conclusion={conc}
                            checked={selectedIds.indexOf(conc.assetId) > -1}
                            onChange={onCheckboxChange}
                            showExplanation={showExplanation} />
                    </PanelConclusion>
                ))}
            </PanelContent>


        </>
    );
};

export default connect()(CheckableConclusions);
