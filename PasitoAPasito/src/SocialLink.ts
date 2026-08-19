import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'Social Link',

  schema: {
    url: ecs.string,
  },

  stateMachine: ({world, eid, schemaAttribute}) => {
    ecs.defineState('default')
      .initial()
      .listen(eid, ecs.input.UI_PRESSED, () => {
        const {url} = schemaAttribute.get(eid)

        if (url) {
          window.location.href = url
        }
      })
  },
})