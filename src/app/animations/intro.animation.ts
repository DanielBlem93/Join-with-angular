import { animate, state, style, transition, trigger } from "@angular/animations";

export const introAnimation = trigger('introAnimation', [
  state(
    'start',
    style({
      position: 'absolute',
      top: '500%',
      left: '47%',
      scale: '2.5',
    })
  ),
  state(
    'end',
    style({
      top: '40%',
      left: '4%',
      scale: '1',
    })
  ),
  state('visable', style({
    opacity: 1,
    zIndex: 1,
  })), state('unvisable', style({
    opacity: 0,
    zIndex: -1
  })),
  transition('start => end', [animate('0.5s')]),
  transition('end => start', [animate('0.5s')]),
  transition('visable => unvisable', [animate('0.5s')]),
  transition('unvisable => visable', [animate('0.5s')]),
]);