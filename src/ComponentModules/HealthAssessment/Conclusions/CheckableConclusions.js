import React from "react";
import { connect } from "react-redux";
import { populateModal, checkConclusion, uncheckConclusion } from '../../../Actions';
import { PanelConclusion, Checkbox, Label, InfoIcon } from "../../../Components";
import { Conclusion } from "./Conclusion";

const CheckableConclusion = ({ conclusion, checked, onChange, showExplanation }) => (
    <Conclusion>
        <Label answer={conclusion}>
            <Checkbox type="checkbox" checked={checked} onChange={e => onChange(conclusion.assetId, e.target.checked)} />
        </Label>
        <InfoIcon onClick={showExplanation} explanation={conclusion.explanation} />
    </Conclusion>
)

const CheckableConclusions = ({ conclusions, selectedIds, dispatch }) => {
    const onCheckboxChange = (assetId, checked) => checked
        ? dispatch(checkConclusion(assetId))
        : dispatch(uncheckConclusion(assetId));

    const showExplanation = explanation => dispatch(populateModal(explanation));

    if (conclusions.length === 0) {
        return null;
    }

    return (
        <>
            {conclusions.map(conc => (
                <PanelConclusion key={conc.assetId}>
                    <CheckableConclusion
                        conclusion={conc}
                        checked={selectedIds.indexOf(conc.assetId) > -1}
                        onChange={onCheckboxChange}
                        showExplanation={showExplanation} />
                </PanelConclusion>
            ))}
        </>
    );
};

const mapStateToProps = state => ({
    selectedIds: state.healthAssessment.checkedConclusions
});
export default connect(mapStateToProps)(CheckableConclusions);
