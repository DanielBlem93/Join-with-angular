import { animate, state, style, transition, trigger } from "@angular/animations";


// export const introAnimation = trigger('introAnimation', [
//   state(
//     'start',
//     style({
//       left: '{{left}}',
//       transform: 'scale({{scale1}}) translateY({{translateY1}})',
//     }),
//     { params: { scale1: '2.5', left: '47%', translateY1: '50%' } }
//   ),
//   state(
//     'end',
//     style({
//       left: '4%',
//       transform: 'scale({{scale2}}) translateY({{translateY2}})',
//     }),
//     { params: { scale2: '1', top2: '0%', translateY2: '40%' } }
//   ),
//   state('visable', style({
//     opacity: 1,
//     zIndex: 1,
//   })), 
//   state('unvisable', style({
//     opacity: 0,
//     zIndex: -1
//   })),

//   transition('start => end', [animate('0.5s')]),
//   transition('end => start', [animate('0.5s')]),
//   transition('visable => unvisable', [animate('0.5s')]),
//   transition('unvisable => visable', [animate('0.5s')]),
// ]);


export const introAnimation = trigger('introAnimation', [
  state(
    'start',
    style({
      width: '{{widthStart}}',
      top: '50%',
      left: '{{leftStart}}',
      // transform:'translate(-50%, -50%)'
    }),
    { params: { widthStart: '274px', leftStart: '50%' } }
  ),
  state(
    'end',
    style({
      width: '{{widthEnd}}',
      top: '10%',
      left: '{{leftEnd}}',
      // transform:'translate(-50%, -50%)'
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
