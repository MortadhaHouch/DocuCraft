"use client";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';

interface MentionListProps {
  items: Array<{ id: string; label: string }>
  command: (attrs: { id: string; label: string }) => void
}

const MentionList = forwardRef(function MentionList(props: MentionListProps, ref) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  const selectItem = (index: number) => {
    const item = props.items[index]

    if (item) {
      props.command({ id: item.id, label: item.label })
    }
  }

  const upHandler = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = (prevIndex + props.items.length - 1) % props.items.length;
      const element = document.querySelector(`.mention-list__item:nth-child(${newIndex + 1})`);
      element?.scrollIntoView({ block: 'nearest' });
      return newIndex;
    });
  };

  const downHandler = () => {
    setSelectedIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % props.items.length;
      const element = document.querySelector(`.mention-list__item:nth-child(${newIndex + 1})`);
      element?.scrollIntoView({ block: 'nearest' });
      return newIndex;
    });
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(ref, () => ({
    onKeyDown: (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          upHandler();
          return true;
        case 'ArrowDown':
          event.preventDefault();
          downHandler();
          return true;
        case 'Enter':
        case 'Tab':
          event.preventDefault();
          enterHandler();
          return true;
        default:
          return false;
      }
    },
    // expose current selection index so external handlers can use it
    getSelectedIndex: () => selectedIndex,
    // helper to programmatically select the current item
    selectCurrent: () => selectItem(selectedIndex),
  }));

  return (
    <div 
      className="mention-list flex flex-col gap-2 overflow-y-auto justify-center items-center rounded-md p-1 bg-slate-200 dark:bg-slate-700"
      role="listbox" 
      aria-label="Mention suggestions"
    >
      {props.items.length ? (
        props.items.map((item, index) => (
          <button
            role="option"
            aria-selected={index === selectedIndex}
            className={`mention-list__item ${index === selectedIndex ? 'mention-list__item--selected' : ''} cursor-pointer w-full text-left text-sm px-2 py-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-all`}
            tabIndex={index === selectedIndex ? 0 : -1}
            key={item.id}
            onClick={() => selectItem(index)}
          >
            {item.label}
          </button>
        ))
      ) : (
        <div className="mention-list__empty" role="status">No result</div>
      )}
    </div>
  )
})

MentionList.displayName = 'MentionList'
export default MentionList
