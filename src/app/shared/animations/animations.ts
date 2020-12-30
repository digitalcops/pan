import { trigger, state, style, animate, transition } from '@angular/animations';

export const SlidePanelAnimation = [
  trigger('profileSection', [
    state('true', style({ right: '0px' })),
    state('false', style({ right: '-746px' })),
    transition('0 => 1', animate('0.2s')),
    transition('1 => 0', animate('0.2s'))
  ]),
  trigger('moreFilterSection', [
    state('true', style({ right: '0px' })),
    state('false', style({ right: '-600px' })),
    transition('0 => 1', animate('0.2s')),
    transition('1 => 0', animate('0.2s'))
  ]),
  trigger('moreFilterSectionEmp', [
    state('true', style({ right: '0px' })),
    state('false', style({ right: '-650px' })),
    transition('0 => 1', animate('0.2s')),
    transition('1 => 0', animate('0.2s'))
  ]),
  trigger('ManagementSectionEmp', [
    state('true', style({ right: '0px' })),
    state('false', style({ right: '-650px' })),
    transition('0 => 1', animate('0.2s')),
    transition('1 => 0', animate('0.2s'))
  ]),
  trigger('createHTMLSection', [
    state('true', style({ right: '0px' })),
    state('false', style({ right: '-600px' })),
    transition('0 => 1', animate('0.2s')),
    transition('1 => 0', animate('0.2s'))
  ]),
  trigger('overlay', [
    state('true', style({ opacity: 1, display: 'block' })),
    state('false', style({ opacity: 0, display: 'none' })),
    transition('0 => 1', animate('0.2s')),
    transition('1 => 0', animate('0.5s'))
  ])
];

