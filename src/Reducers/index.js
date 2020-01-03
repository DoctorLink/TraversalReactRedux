import { combineReducers } from 'redux'
import traversal from './Traversal'
import chat from './Chat'
import summary from './Summary'
import conclusion from './Conclusion'
import modal from './Modal'
import healthAssessment from './HealthAssessment'
import clientProducts from './Products'
import labels from './Labels'

const reducers = {
    traversal, 
    summary,
    conclusion,
    modal,
    healthAssessment,
    clientProducts,
    labels,
}

export const rootTraversalReducer = combineReducers(reducers)

export const rootChatReducer = combineReducers({
    ...reducers,
    traversal: chat
})