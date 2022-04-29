// @flow

import { MEDIA_TYPE, VIDEO_TYPE } from '../base/media';
import { getLocalParticipant } from '../base/participants';
import { StateListenerRegistry } from '../base/redux';
import { getTrackByMediaTypeAndParticipant } from '../base/tracks';
import { appendSuffix } from '../display-name';
import { shouldDisplayTileView } from '../video-layout';

declare var APP: Object;
declare var interfaceConfig: Object;

/**
 * StateListenerRegistry provides a reliable way of detecting changes to
 * preferred layout state and dispatching additional actions.
 */
StateListenerRegistry.register(
    /* selector */ state => shouldDisplayTileView(state),
    /* listener */ displayTileView => {
        APP.API.notifyTileViewChanged(displayTileView);
    });

StateListenerRegistry.register(
    /* selector */ state => state['features/base/settings'].displayName,
    /* listener */ (displayName, store) => {
        const localParticipant = getLocalParticipant(store.getState());

        // Initial setting of the display name occurs happens on app
        // initialization, before the local participant is ready. The initial
        // settings is not desired to be fired anyways, only changes.
        if (localParticipant) {
            const { id } = localParticipant;

            APP.API.notifyDisplayNameChanged(id, {
                displayName,
                formattedDisplayName: appendSuffix(
                    displayName,
                    interfaceConfig.DEFAULT_LOCAL_DISPLAY_NAME)
            });
        }
    });

/**
 * Updates the on stage participant value.
 */
StateListenerRegistry.register(
    /* selector */ state => state['features/large-video'],
    /* listener */ (participant, store) => {
        const videoTrack = getTrackByMediaTypeAndParticipant(
            store.getState()['features/base/tracks'], MEDIA_TYPE.VIDEO, participant.participantId, participant.videoType);

        // https://github.com/jitsi/jitsi-meet/commit/c5438ecd0c6c9e13510eec8cf08ff08e6a58bb80#diff-f08529692d75f6fdbf2cc56aa558701490ba35bd9e2cb7716d67187115fd934d
        if (videoTrack) {
            APP.API.notifyOnStageParticipantChanged(participant.participantId, participant.videoType);
        }
    }
);
