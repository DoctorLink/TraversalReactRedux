import { takeLatest } from 'redux-saga/effects';
import * as actions from '../../../Actions';
import * as generators from '../../Generators';

export default () => ([
    takeLatest([actions.TRAVERSAL_CONTINUE_SET, actions.TRAVERSAL_NEXT_SET], generators.createScrollIntoViewGenerator("CurrentQuestion")),
    takeLatest(actions.TRAVERSAL_PREVIOUS_SET, generators.createScrollIntoViewGenerator("CurrentQuestion", true)),
])