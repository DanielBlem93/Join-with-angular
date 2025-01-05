import { animate, state, style, transition, trigger } from "@angular/animations";


export const introAnimation = trigger('introAnimation', [
  state(
    'start',
    style({

      top: '{{top1}}',
      left: '{{left}}',
      scale: '{{scale1}}',
    }),
    { params: { scale1: '2.5', top1:'500%', left:'47%' } }
  ),
  state(
    'end',
    style({
      top: '{{top2}}',
      left: '4%',
      scale: '{{scale2}}',
    }),
    { params: { scale2: '1', top2: '40%' } }
  ),
  state('visable', style({
    opacity: 1,
    zIndex: 1,
  })), state('unvisable', style({
    opacity: 0,
    zIndex: -1
  })),
  state('overflow', style({
    opacity: 1,
  })), state('overflow-hidden', style({
    opacity: 0,
  })),
  transition('start => end', [animate('0.5s')]),
  transition('end => start', [animate('0.5s')]),
  transition('visable => unvisable', [animate('0.5s')]),
  transition('unvisable => visable', [animate('0.5s')]),
]);