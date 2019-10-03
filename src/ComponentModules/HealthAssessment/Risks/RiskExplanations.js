import React, { useState } from 'react';
import { connect } from "react-redux";
import { AccordionHeader, AccordionBody, HealthReportPanelHeader, PanelContent, PanelConclusion } from "../../../Components";
import { replaceLineBreaks } from "../../../Helpers";
import { riskExplanationsSelector } from '../../../Selectors/healthAssessment';

const HtmlContent = ({ children = "", element = "div" }) => React.createElement(element, {
    dangerouslySetInnerHTML: { __html: replaceLineBreaks(children) }
})

const Bullets = ({ bullets }) => {
    const [header, ...items] = bullets;
    return (
        <>
            {header && <HtmlContent>{header.displayText}</HtmlContent>}
            <ul>
                {items.map(item => <HtmlContent element="li" key={item.bulletUniqueId}>{item.displayText}</HtmlContent>)}
            </ul>
        </>
    )
}

const RiskExplanation = ({ conclusion }) => {
    const [open, setOpen] = useState(false);
    const toggleOpen = () => setOpen(!open);
    return (
        <PanelConclusion>
            <AccordionHeader open={open} toggleOpen={toggleOpen}>
                {conclusion.displayText}
            </AccordionHeader>
            <AccordionBody open={open}>
                <HtmlContent>{conclusion.explanation}</HtmlContent>
                <HtmlContent>{conclusion.moreDetail}</HtmlContent>
                <Bullets bullets={conclusion.bullets} />
            </AccordionBody>
        </PanelConclusion>
    );
}

const RiskExplanations = ({ riskExplanations }) => {
    return (
        <>
            <HealthReportPanelHeader>
                Your risks explained
            </HealthReportPanelHeader>
            <PanelContent>
                {riskExplanations.map(conc => <RiskExplanation key={conc.assetId} conclusion={conc} />)}
            </PanelContent>
        </>
    )
}

const mapStateToProps = state => ({
    riskExplanations: riskExplanationsSelector(state)
});
export default connect(mapStateToProps)(RiskExplanations);