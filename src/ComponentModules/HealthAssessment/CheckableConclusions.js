import React, { useState } from "react";
import { PanelHeader, PanelContent, PanelConclusion, PanelBodyText, Checkbox, Label, InfoIcon, Answer } from "../../Components";
import colors from '../../Theme/base/colors';

const CheckableConclusion = ({ conclusion, checked, onChange, showExplanation }) => (
    <Answer>
        <Label answer={conclusion}>
            <Checkbox type="checkbox" checked={checked} onChange={e => onChange(conclusion.assetId, e.target.checked)} />
        </Label>
        <InfoIcon onClick={showExplanation} explanation={conclusion.explanation} />
    </Answer>
)

const CheckableConclusions = ({ conclusionIds, conclusions, onChange, showExplanation }) => {
    const [selectedIds, setSelectedIds] = useState([]);

    const onCheckboxChange = (assetId, checked) => {
        const newSelectedIds = checked
            ? [...selectedIds, assetId]
            : selectedIds.filter(id => id !== assetId);
        setSelectedIds(newSelectedIds);
        onChange(newSelectedIds);
    }

    if (!conclusions || conclusions.length === 0) {
        return null;
    }

    const checkableConclusions = conclusions.filter(c => !c.silent && conclusionIds.riskConclusions.indexOf(c.assetId) > -1);

    return (
        <>
            <PanelHeader color={colors.grey200}>
                <PanelBodyText bold>See the impact of making the following changes to your lifestyle</PanelBodyText>
            </PanelHeader>
            <PanelContent>
                {checkableConclusions.map(conc => (
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

export default CheckableConclusions;
