import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CheckableConclusions from "./CheckableConclusions";

describe("CheckableConclusions component", () => {
    
    const riskSummary = {
        modifiableRisks: [
            { condition: "Heart Disease", factor: "Diet" },
            { condition: "Heart Disease", factor: "Sedentary Behaviour" },
            { condition: "Lung Cancer", factor: "Tobacco" },
        ]
    };
    const conclusions = [
        { assetId: 1000, displayText: "Lower BP to less than 140/90", explanation: "" },
        { assetId: 1001, displayText: "Eat more healthily", explanation: "" },
        { assetId: 1002, displayText: "Your Mediterranean Diet Rating is 50 out of 100", explanation: "" },
        { assetId: 1003, displayText: "Stop smoking", explanation: "" },
        { assetId: 1004, displayText: "Eat more vegetables", silent: true, explanation: "" },
    ]

    const conclusionIds = {
        riskConclusions: [ 1001, 1003, 1004, 1005, 1234 ]
    };

    const onChange = jest.fn();

    let result;
    beforeEach(() => result = render(<CheckableConclusions conclusions={conclusions} conclusionIds={conclusionIds} onChange={onChange} />));

    const queryCheckboxByConclusionId = (assetId) => result.queryByLabelText(conclusions.find(c => c.assetId == assetId).displayText);

    test("Shows only non-silent modifiable risks", () => {
        expect(queryCheckboxByConclusionId(1000)).toBeFalsy();
        expect(queryCheckboxByConclusionId(1001)).toBeTruthy();
        expect(queryCheckboxByConclusionId(1002)).toBeFalsy();
        expect(queryCheckboxByConclusionId(1003)).toBeTruthy();
        expect(queryCheckboxByConclusionId(1004)).toBeFalsy();
    })

    test("Checking risks calls onChange with checked IDs", () => {
        const conc1001 = queryCheckboxByConclusionId(1001);
        const conc1003 = queryCheckboxByConclusionId(1003);

        fireEvent.click(conc1001);
        expect(onChange).lastCalledWith([1001]);

        fireEvent.click(conc1003);
        expect(onChange).lastCalledWith([1001, 1003]);

        fireEvent.click(conc1001);
        expect(onChange).lastCalledWith([1003]);
    })
});