import React from "react";
import { BrowserRouter as Router } from 'react-router-dom'
import "@testing-library/jest-dom/extend-expect";
import { rootTraversalReducer } from "../../../Reducers";
import { renderWithRedux } from "../../../TestUtils";
import HealthAge from "./HealthAge";

describe("HealthAge component", () => {
    const state = {
        healthAssessment: {
            riskSummary: {
                age: 40,
                healthAge: 35,
                minimumHealthAge: 30
            },
            conclusionIds: {
                riskConclusions: [ 1000, 1003 ]
            },
            checkedConclusions: [],
        },
        conclusion: {
            conclusions: [
                { assetId: 1000, displayText: "Lower BP to less than 140/90", explanation: "" },
                { assetId: 1001, displayText: "Eat more healthily", explanation: "" },
                { assetId: 1002, displayText: "Your Mediterranean Diet Rating is 50 out of 100", explanation: "" },
                { assetId: 1003, displayText: "Stop smoking", explanation: "" }
            ]
        }
    };

    const renderComponent = () => renderWithRedux(<Router><HealthAge traversalId="abc" /></Router>, rootTraversalReducer, state);

    test("Renders health age dial with correct ages", () => {
        const result = renderComponent();

        expect(result.getByText(/Your health age is/).textContent).toBe("Your health age is 35");
        expect(result.getByText(/But you could be/).textContent).toBe("But you could be up to 5 years younger by making the below changes");
    })

    test("Renders risk conclusions", () => {
        const result = renderComponent();

        expect(result.queryByText("Lower BP to less than 140/90")).not.toBeNull();
        expect(result.queryByText("Eat more healthily")).toBeNull();
        expect(result.queryByText("Your Mediterranean Diet Rating is 50 out of 100")).toBeNull();
        expect(result.queryByText("Stop smoking")).not.toBeNull();
    })
})