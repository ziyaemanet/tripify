import React, { PropTypes } from 'react';
import Hamburger from './Hamburger';
// import {  } from '../actions/FirebaseActions';


export default function Layout(props) {
  return (
    <div className="mainDiv">
      <Hamburger />
      {props.children}
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.object, // eslint-disable-line
};
