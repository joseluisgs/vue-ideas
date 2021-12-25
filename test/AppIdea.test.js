import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import AppIdea from '../src/components/AppIdea.vue'

test('mount component', async () => {
  const idea = {
    name: 'Idea name 1',
    userName: 'Username 1',
    votes: 99
  }

  expect(AppIdea).toBeTruthy()
  const wrapper = mount(AppIdea, {
    props: {
      idea: idea
    }
  })
  expect(wrapper.text()).toContain('Idea name 1')
  expect(wrapper.text()).toContain('Username 1')
  expect(wrapper.html()).toMatchSnapshot()
  const votes = wrapper.find('#votes').text().trim()
  expect(votes).toBe('99')
  const up = wrapper.find('#voteup')
  await up.trigger('click')
  expect(wrapper.emitted('vote-idea')).toBeTruthy()
  // const event = wrapper.emitted('vote-idea')[0][0]
  // expect(event.type).toBe(true)
  expect(wrapper.emitted('vote-idea').length).toBe(1)
  const down = wrapper.find('#votedown')
  await down.trigger('click')
  expect(wrapper.emitted('vote-idea').length).toBe(2)
})
