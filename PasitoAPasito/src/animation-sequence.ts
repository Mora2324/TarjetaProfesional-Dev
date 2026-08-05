import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'animation-sequence',

  stateMachine: ({ world, eid }) => {
    const play = (clip: string, loop = false) => {
      ecs.GltfModel.set(world, eid, {
        animationClip: clip,
        paused: false,
        loop,
        time: 0,
        timeScale: 1,
        crossFadeDuration: 0.25,
      })
    }

    ecs.defineState('idle')
      .initial()
      .onEnter(() => play('Idle'))
      .wait(3000, 'kneeling')

    ecs.defineState('kneeling')
      .onEnter(() => play('Kneeling'))
      .wait(2500, 'punch')

    ecs.defineState('punch')
      .onEnter(() => play('punchElbow'))
      .wait(2500, 'idle')
  },
})