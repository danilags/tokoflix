/**
 * Testing SimilarMovie component
 */

import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';

import SimilarMovie from './SimilarMovie';

describe('<SimilarMovie />', () => {
  // it('Component renders and matches snapShot', () => {
  //   let data = {
  //     backdrop_path: 'http://anotherurl.com/7eTWQb475pM9H3NEOiUzGYASEx0.jpg',
  //     title: 'Jurasic World',
  //     overview: 'Lorem Ipsum Dolor Sit amet'
  //   }
  //   const SimilarMovie = shallow(<SimilarMovie item={data} />)
  //   expect(SimilarMovie).toMatchSnapshot();
  // });

  it('test SimilarMovie matches MOUNT', () => {
    let inst = renderer.create(React.createElement('div', <SimilarMovie />));
    expect(inst.toJSON()).toMatchSnapshot();
  });
})


