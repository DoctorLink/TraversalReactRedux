import React from "react";
import { connect } from "react-redux";
import { populateModal } from '../../../Actions';
import { PanelConclusion, InfoIcon } from "../../../Components";
import {Conclusion, ConclusionContent } from "./Conclusion";

const NonCheckableConclusion = ({ conclusion, showExplanation }) => (
    <Conclusion>
        <ConclusionContent>{conclusion.displayText}</ConclusionContent>
        <InfoIcon onClick={showExplanation} explanation={conclusion.explanation} />
    </Conclusion>
)

const NonCheckableConclusions = ({ conclusions, dispatch }) => {
    if (conclusions.length === 0) {
        return null;
    }
    
    const showExplanation = explanation => dispatch(populateModal(explanation));

    return (
        <>
            {conclusions.map(conc => (
                <PanelConclusion key={conc.assetId}>
                    <NonCheckableConclusion
                        conclusion={conc}
                        showExplanation={showExplanation} />
                </PanelConclusion>
            ))}
        </>
    );
};

export default connect()(NonCheckableConclusions);
