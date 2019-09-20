import React from "react";
import { getPointerAngle } from "./getPointerAngle";
import { DialArc } from "./DialArc";
import { DialPointer } from "./DialPointer";

const HealthAgeDial = ({ age, healthAge, minimumHealthAge }) => {
    const angle = getPointerAngle(age, healthAge, minimumHealthAge);
    return (
        <svg viewBox="0 0 100 52">
            <DialArc cx={50} cy={50} radius={44} startAngle={-90} endAngle={90} />
            <DialPointer cx={50} cy={50} radius={46} width={4} height={4} angle={angle} />
            <text x="50" y="37" textAnchor="middle">{healthAge}</text>
        </svg>
    );
}

export { HealthAgeDial };