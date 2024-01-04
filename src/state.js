import {atom} from 'recoil';

const selectedStateAtom = atom({
  key: 'selectedState',
  default: 'Inbox'
});

export default selectedStateAtom;