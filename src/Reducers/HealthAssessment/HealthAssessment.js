import { HEALTH_RISKS_SET } from '../../Actions'

const defaultState = {
    riskSummary: {
        risks: [],
        modifiableRisks: [],
    }
}

const healthAssessment = (state = defaultState, action) => {
    switch (action.type) {
        case HEALTH_RISKS_SET:
            return { ...state, riskSummary: action.healthRisks };
        default:
            return state;
    }
};

export default healthAssessment;