import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Play Pause Video',

  schema: {
    videoPlayer: ecs.eid,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_CLICK, () => {
        const videoPlayer = schemaAttribute.get(eid).videoPlayer
        const video = ecs.VideoControls.get(world, videoPlayer)

        const shouldPlay = video.paused

        ecs.VideoControls.set(world, videoPlayer, {
          paused: !shouldPlay,
        })

        ecs.Ui.set(world, eid, {
          opacity: shouldPlay ? 0 : 1,
        })
      })
  },
})