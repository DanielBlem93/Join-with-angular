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
    display: 'block',
  })), state('unvisable', style({
    opacity: 0,
    display: 'none',
  })),
  transition('open => closed', [animate('0.2s')]),
  transition('closed => open', [animate('0.2s')]),
  transition('visable => unvisable', [animate('0.2s')]),
  transition('unvisable => visable', [animate('0.2s')]),
]);