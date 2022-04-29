// @flow

import { getParticipantById } from '../base/participants';

/**
 * Selector for the participant currently displaying on the large video.
 *
 * @param {Object} state - The redux state.
 * @returns {Object}
 */
export function getLargeVideoParticipant(state: Object) {
    const { participantId } = state['features/large-video'];

    return getParticipantById(state, participantId);
}

/**
 * Selector for the participant's id currently displaying on the large video.
 *
 * @param {Object} state - The redux state.
 * @returns {Object}
 */
 export function getLargeVideoParticipantId(state: Object) {
    const { participantId } = state['features/large-video'];

    return participantId;
}
