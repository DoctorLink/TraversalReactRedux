import { HEALTH_RISKS_SET } from '../../Actions'

const defaultState = {
    risks: null
}

const healthAssessment = (state = defaultState, action) => {
    switch (action.type) {
        case HEALTH_RISKS_SET:
            return { ...state, risks: action.healthRisks };
        default:
            return state;
    }
};

export default healthAssessment;