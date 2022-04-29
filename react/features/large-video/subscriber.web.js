// @flow

import VideoLayout from '../../../modules/UI/videolayout/VideoLayout';
import { StateListenerRegistry } from '../base/redux';

/**
 * Updates the on stage participant video.
 */
StateListenerRegistry.register(
    /* selector */ state => state['features/large-video'],
    /* listener */ participant => {
        // If we use force parameter as true, page behaves as remote video selected twice!
        VideoLayout.updateLargeVideo(participant.participantId, participant.videoType, false);
    }
);
