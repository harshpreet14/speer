import {atom} from 'recoil';

const toggleState = atom({
  key: 'toggle',
  default: 'Inbox'
});

export default toggleState