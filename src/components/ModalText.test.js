import React from 'react';
import { mount } from 'enzyme';

import ModalText from './ModalText';

describe('<ModalText />', () => {
  function onToggleFunc({}) {return {}};

  it('Component <ModalText /> and matches snapShot', () => {
    let modalProps = {
      isOpen: false || true,
      isLogged: false || true,
      isLoading: false || true,
      onSubmitData: onToggleFunc,
      onChangesName: onToggleFunc,
      onLogout: onToggleFunc,
      onToggle: onToggleFunc
    };
    const wrapper = shallow(<ModalText {...modalProps} />)
    expect(wrapper).toMatchSnapshot();
  });

});