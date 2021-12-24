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
  expect(wrapper.html()).toMatchSnapshot()
  expect(wrapper.text()).toContain('Username 1')
})
