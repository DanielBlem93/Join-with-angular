import { animate, state, style, transition, trigger } from "@angular/animations";

export const introAnimation = trigger('introAnimation', [
  state(
    'start',
    style({
      width: '{{widthStart}}',
      top: '50%',
      left: '{{leftStart}}',
    }),
    { params: { widthStart: '274px', leftStart: '50%' } }
  ),
  state(
    'end',
    style({
      width: '{{widthEnd}}',
      top: '10%',
      left: '{{leftEnd}}',
    }),
    { params: { widthEnd: '100px', leftEnd: '5%' } }
  ),
  state('visable', style({
    opacity: 1,
    zIndex: 1,
  })),
  state('unvisable', style({
    opacity: 0,
    zIndex: -1
  })),

  transition('start => end', [animate('0.5s')]),
  transition('end => start', [animate('0.5s')]),
  transition('visable => unvisable', [animate('0.6s')]),
  transition('unvisable => visable', [animate('0.6s')]),
]);
