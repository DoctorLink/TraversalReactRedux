const parser = new DOMParser();

export function parseNumberConclusion(conclusion) {
    const numbersXml = parser.parseFromString(conclusion.moreDetail, "text/xml").documentElement;
    return {
        ...conclusion,
        value: numbersXml.getAttribute("value") || "?"
    };
}