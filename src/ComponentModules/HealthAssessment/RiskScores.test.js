import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import RiskScores from "./RiskScores";

describe("RiskScores component", () => {

    const riskSummary = {
        age: 67,
        risks: [
            { time: 3, name: "Heart Disease", current: 0.2, reduced: 0.1 },
            { time: 13, name: "Heart Disease", current: 0.3, reduced: 0.2 },
            { time: 23, name: "Heart Disease", current: 0.4, reduced: 0.3 },
            { time: 3, name: "Lung Cancer", current: 0.2, reduced: 0.1 },
            { time: 13, name: "Lung Cancer", current: 0.3, reduced: 0.2 },
            { time: 23, name: "Lung Cancer", current: 0.4, reduced: 0.3 },
        ]
    };

    let result;
    beforeEach(() => result = render(<RiskScores riskSummary={riskSummary} />));

    const getDropdown = () => result.getByText(/Your risks before the age of/).getElementsByTagName("select")[0];
    const getRiskItems = () => result.getAllByRole("listitem");

    test("shows the age options that greater than the user's age", () => {
        const options = getDropdown().getElementsByTagName("option");
        expect(Array.from(options).map(opt => opt.value)).toEqual(["70", "80", "90", "100", "110"]);
    })

    test("age defaults to 90", () => {
        expect(getDropdown()).toHaveValue("90");
    })

    test("shows risks for the selected age", () => {
        const riskItems = getRiskItems();
        expect(riskItems).toHaveLength(2);
        expect(riskItems[0]).toHaveTextContent("Heart Disease: Current 0.4, Reduced 0.3");
        expect(riskItems[1]).toHaveTextContent("Lung Cancer: Current 0.4, Reduced 0.3");
    })

    test("changing the selected age updates the risks", () => {
        fireEvent.change(getDropdown(), { target: { value: "70" } });

        const riskItems = getRiskItems();
        expect(riskItems).toHaveLength(2);
        expect(riskItems[0]).toHaveTextContent("Heart Disease: Current 0.2, Reduced 0.1");
        expect(riskItems[1]).toHaveTextContent("Lung Cancer: Current 0.2, Reduced 0.1");
    })
});