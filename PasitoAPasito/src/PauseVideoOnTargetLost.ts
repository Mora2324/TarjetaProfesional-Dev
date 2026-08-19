import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Pause Video On Target Lost',

  schema: {
    videoPlayer: ecs.eid,
    playButton: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()

      .listen(world.events.globalId, 'reality.imagelost', () => {
        const {videoPlayer} = schemaAttribute.get(eid)

        ecs.VideoControls.set(world, videoPlayer, {
          paused: true,
        })
      })

      .listen(world.events.globalId, 'reality.imagefound', () => {
        const {playButton} = schemaAttribute.get(eid)

        ecs.Hidden.remove(world, playButton)

        ecs.Ui.set(world, playButton, {
          opacity: 1,
        })
      })
  },
})