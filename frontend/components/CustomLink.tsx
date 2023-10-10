import Link from '@tiptap/extension-link'


export const CustomLink = Link.extend({
  priority: 1000,

  addOptions() {
    return {
      openOnClick: true,
      linkOnPaste: true,
      autolink: false,
      protocols: [],
      HTMLAttributes: {
        target: '_blank',
        rel: 'noopener noreferrer nofollow',
        onclick: null,
        class: null,
      },
      validate: undefined,
    }
  },

  addAttributes() {
    return {
      href: {
        default: null,
      },
      target: {
        default: this.options.HTMLAttributes.target,
      },
      rel: {
        default: this.options.HTMLAttributes.rel,
      },
      class: {
        default: this.options.HTMLAttributes.class,
      },
      onclick: {
        default: this.options.HTMLAttributes.onclick,
      },
    }
  },
})
