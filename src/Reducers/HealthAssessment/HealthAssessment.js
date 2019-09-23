import { HEALTH_RISKS_SET, HRA_CONCLUSIONS_SET, CHECK_CONCLUSION, UNCHECK_CONCLUSION } from '../../Actions'

const defaultState = {
    riskSummary: {
        risks: [],
        modifiableRisks: [],
    },
    checkedConclusions: [],
    conclusionIds: {
        riskConclusions: [],
        wellnessConclusions: [],
    }
}

const healthAssessment = (state = defaultState, action) => {
    switch (action.type) {
        case HEALTH_RISKS_SET:
            return { ...state, riskSummary: action.healthRisks };
        case HRA_CONCLUSIONS_SET:
            return { ...state, conclusionIds: action.conclusionIds };
        case CHECK_CONCLUSION:
            return { ...state, checkedConclusions: [...state.checkedConclusions, action.id] };
        case UNCHECK_CONCLUSION:
            return { ...state, checkedConclusions: state.checkedConclusions.filter(id => id !== action.id) };
        default:
            return state;
    }
};

export default healthAssessment;