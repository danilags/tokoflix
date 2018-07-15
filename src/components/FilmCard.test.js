import React from 'react';
import { mount } from 'enzyme';

import FilmCard from './FilmCard';

describe('<FilmCard />', () => {
  function onToggleFunc({}) {return {}};

  it('Component <FilmCard /> and matches snapShot', () => {
    let FilmCardProps = {
      film: {
        poster_path: 'http://anotherurl.com/7eTWQb475pM9H3NEOiUzGYASEx0.jpg' | null,
        title: 'Jurasic world',
        release_date: '2018-07-15',
        vote_average: 6.5,
        adult: true | false
      }
    };
    const wrapper = shallow(<FilmCard {...FilmCardProps} />)
    expect(wrapper).toMatchSnapshot();
  });

});