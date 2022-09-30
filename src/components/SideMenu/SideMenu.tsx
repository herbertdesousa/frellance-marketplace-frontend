import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import classNames from 'classnames';

import style from './SideMenu.module.css';

export interface ISideMenuRef {
  open(): void;
  close(): void;
  toggle(): void;
}

interface IProps {
  className?: string;
  children?: React.ReactNode;
  side?: 'left' | 'right';
}

const SideMenu: React.ForwardRefRenderFunction<ISideMenuRef, IProps> = (
  { className, children, side = 'left' },
  ref,
) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rootClassName = classNames(
    style.root,
    { [style['root-left-open']]: isOpened && side === 'left' },
    { [style['root-left-close']]: !isOpened && side === 'left' },
    { [style['root-right-open']]: isOpened && side === 'right' },
    { [style['root-right-close']]: !isOpened && side === 'right' },
    className,
  );

  const bgClassName = classNames(
    style.bg,
    { [style['bg-open']]: isOpened },
    { [style['bg-close']]: !isOpened },
  );

  useImperativeHandle(ref, () => ({
    open() {
      openSideMenu();
    },
    close() {
      closeSideMenu();
    },
    toggle() {
      if (isOpened) closeSideMenu();
      else openSideMenu();
    },
  }));

  const closeSideMenu = useCallback(() => {
    setIsOpened(false);
  }, []);
  const openSideMenu = useCallback(() => {
    setIsVisible(true);
    setTimeout(() => setIsOpened(true), 100);
  }, []);

  if (!isVisible) return <></>;
  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
      <div
        role="button"
        tabIndex={0}
        className={bgClassName}
        onClick={() => closeSideMenu()}
        onKeyDown={() => closeSideMenu()}
      />
      <div
        className={rootClassName}
        onTransitionEnd={() => setIsVisible(isOpened)}
      >
        {children}
      </div>
    </>
  );
};

export default forwardRef(SideMenu);
