import { animate, state, style, transition, trigger } from "@angular/animations";

export const modalAnimation = trigger('modalToggleAnimation', [
  state(
    'open',
    style({
      left: '50%',

      top: '50%',
    })
  ),
  state(
    'closed',
    style({
      top: '50%',
      left: '151%',

    })
  ),
  state('visable', style({
    opacity: 1,
    zIndex: 333,
  })), state('unvisable', style({
    opacity: 0,
    zIndex: -1
  })),
  transition('open => closed', [animate('0.2s')]),
  transition('closed => open', [animate('0.2s')]),
  transition('visable => unvisable', [animate('0.2s')]),
  transition('unvisable => visable', [animate('0.2s')]),
]);
export const contactModalAnimation = trigger('contactModalToggleAnimation', [
  state(
    'open',
    style({
      right: '50%',
      opacity: 1,
      zIndex: 333,
    })
  ),
  state(
    'closed',
    style({
      right: '-200%',
      opacity: 0,
      zIndex: -1
    })
  ),
  transition('open => closed', [animate('0.225s')]),
  transition('closed => open', [animate('0.225s')]),
  transition('visable => unvisable', [animate('0.125s')]),
  transition('unvisable => visable', [animate('0.125s')]),
]);