import { animate, state, style, transition, trigger } from "@angular/animations";

export const msgBoxAnimation =  trigger('openClose', [
    state(
      'open',
      style({
        left: '50%',
        opacity: 1,
        top: '80%',
      })
    ),
    state(
      'closed',
      style({
        top: '80%',
        left: '200%',
        opacity: 0.0,
      })
    ),
    transition('open => closed', [animate('0.5s')]),
    transition('closed => open', [animate('0.25s')]),
  ]);