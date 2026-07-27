import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppFooter from '@widgets/footer/ui/AppFooter.vue'

describe('AppFooter', () => {
  it('renders the copyright text', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain('Ivan Condori Choquehuanca')
    expect(wrapper.text()).toContain('Icondoric')
  })

  it('displays the current year', () => {
    const wrapper = mount(AppFooter)
    expect(wrapper.text()).toContain(String(new Date().getFullYear()))
  })
})
