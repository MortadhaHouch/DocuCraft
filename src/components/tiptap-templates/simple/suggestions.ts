import { computePosition, flip, shift } from '@floating-ui/dom'
import { Editor, posToDOMRect, ReactRenderer } from '@tiptap/react'
import MentionList from '@/components/main/MentionList'
import { randomUsers } from '../../../../utils/constants'

const updatePosition = (editor: Editor, element: HTMLElement) => {
  const virtualElement = {
    getBoundingClientRect: () => posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  }

  computePosition(virtualElement, element, {
    placement: 'bottom-start',
    strategy: 'absolute',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content'
    element.style.position = strategy
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  })
}

interface SuggestionProps {
  editor: Editor
  query: string
  items: Array<{
    id: string
    label: string
  }>
  command: (attrs: { id: string; label: string }) => void
  clientRect?: (() => DOMRect | null) | null
}

const suggestions = {
  items: ({ query }: { query: string }) => {
    return randomUsers
      .map(user => ({ id: user.name, label: user.name }))
      .filter(item => item.label.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 5)
  },

  render: () => {
  let component: ReactRenderer | null = null;
  let latestProps: SuggestionProps | null = null;
  let latestIndex = 0

  const setSelectedElement = (el: HTMLElement, index: number) => {
    const items = Array.from(el.querySelectorAll('.mention-list__item')) as HTMLElement[]
    items.forEach((it, i) => {
      if (i === index) {
        it.classList.add('mention-list__item--selected')
        it.setAttribute('aria-selected', 'true')
        it.tabIndex = 0
        it.scrollIntoView({ block: 'nearest' })
      } else {
        it.classList.remove('mention-list__item--selected')
        it.setAttribute('aria-selected', 'false')
        it.tabIndex = -1
      }
    })
  }

    return {
      onStart: (props: SuggestionProps) => {
        latestProps = props;
        latestIndex = 0
        component = new ReactRenderer(MentionList, {
          props: {
            items: props.items,
            command: (attrs: { id: string }) => {
              const found = props.items.find(i => i.id === attrs.id)
              props.command({ id: attrs.id, label: found?.label ?? attrs.id })
            }
          },
          editor: props.editor
        });

        if (!props.clientRect) {
          return;
        }

        component.element.style.position = 'absolute';
        document.body.appendChild(component.element);
        updatePosition(props.editor, component.element);
        // ensure initial selection state in case the renderer doesn't manage it
        setSelectedElement(component.element, latestIndex)
      },

      onUpdate(props: SuggestionProps) {
        latestProps = props;
        latestIndex = 0
        if (!component) return;

        component.updateProps({
          items: props.items,
          command: (attrs: { id: string }) => {
            const found = props.items.find(i => i.id === attrs.id)
            props.command({ id: attrs.id, label: found?.label ?? attrs.id })
          }
        });

        if (!props.clientRect) {
          return;
        }

        updatePosition(props.editor, component.element);
        setSelectedElement(component.element, latestIndex)
      },

      onKeyDown(props: { event: KeyboardEvent }) {
        if (!component) return false;

        const key = props.event.key;

        // Always handle escape by closing the component
        if (key === 'Escape') {
          component.destroy();
          latestProps = null;
          return true;
        }

        // Delegate to the component's imperative onKeyDown handler (if present)
        const ref = component.ref as {
          onKeyDown?: (event: KeyboardEvent) => boolean
          getSelectedIndex?: () => number
          selectCurrent?: () => void
        };

        // call the component's handler with the raw KeyboardEvent (Tiptap passes { event })
        // add debug logging to help trace key handling
        // debug logging (console may be stripped by linter in production)

        const handledByComponent = ref?.onKeyDown?.(props.event) ?? false;
        // if the component handled navigation, sync the selected index from it
        if (handledByComponent && ref?.getSelectedIndex) {
          // sync selected index from inner component if available
          latestIndex = ref.getSelectedIndex()
        }
        if (handledByComponent) return true;

        // Handle arrow navigation at the wrapper level if the component didn't handle it
        if (key === 'ArrowUp' || key === 'ArrowDown') {
          if (!latestProps) return false;
          const len = latestProps.items.length
          if (len === 0) return false;

          if (key === 'ArrowUp') {
            latestIndex = (latestIndex + len - 1) % len
          } else {
            latestIndex = (latestIndex + 1) % len
          }

          if (component) setSelectedElement(component.element, latestIndex)
          return true
        }

        // Fallback: use the component's reported selected index when available,
        // otherwise use latestIndex to pick the highlighted item.
        if (key === 'Enter' || key === 'Tab') {
          if (ref?.selectCurrent) {
            // let the component perform selection of the highlighted item
            try {
              ref.selectCurrent();
            } finally {
              component.destroy();
              latestProps = null;
            }
            return true;
          }

          if (latestProps) {
            const item = latestProps.items[latestIndex] ?? latestProps.items[0]
            if (item) {
              try {
                latestProps.command({ id: item.id, label: item.label });
              } finally {
                component.destroy();
                latestProps = null;
              }
              return true;
            }
          }
        }
        return false;
      },

      onExit() {
        if (!component) return;
        latestProps = null;
        component.element.remove();
        component.destroy();
      },
    };
  },
}
export default suggestions;