import { normalize, schema } from 'normalizr'

export default json => {
    const answer = new schema.Entity('answers', {}, { idAttribute: value => `${value.nodeId}_${value.questionId}_${value.answerId}` });
    const question = new schema.Entity('questions', { answers: [answer] }, { idAttribute: value => `${value.nodeId}_${value.questionId}` });
    const error = new schema.Entity('errors', {}, { idAttribute: (value,parent) => `${parent.nodeId}_${value.questionId}` });
    // const node = new schema.Entity('nodes', { questions: [question],  errors: [error] }, { idAttribute: value => value.nodeId });
    const traversal = { questions: [question], errors: [error] }

    const normalizedData = normalize(json.data, traversal);

    normalizedData.entities.traversalId = normalizedData.result.traversalId;
    normalizedData.entities.questionIds = normalizedData.result.questions;
    normalizedData.entities.algoId = normalizedData.result.algoId;
    normalizedData.entities.assessmentType = json.data.assessmentType;
    if (!normalizedData.entities.errors) normalizedData.entities.errors = {}

    return normalizedData.entities
}