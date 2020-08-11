/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Iframe from 'react-iframe';
import { tableSelectors } from '../../state/redux/tables';
import { bcAuthType } from '../types';

const styles = theme => {
  const { type } = theme.palette;
  const dark = type === 'dark';
  return {
    fullwidth: {
      width: '100%',
      marginTop: 105,
      backgroundColor: dark ? 'rgb(36, 32, 54)' : '#f0f5f9'
    }
  };
};

const { bcAuthSelector } = tableSelectors;

export class UnitTraceView extends Component {
  render() {
    const { classes } = this.props;
    const urlPath = 'traceTree.html?bcAuth=' + this.props.bcAuth;
    const style = {
      width: '99vw',
      height: '82vh',
      marginLeft: '5px',
      border: '1px solid #D8D8D8',
      boxShadow: '1px 2px 2px #E6E6E6',
      borderRadius: '3px',
      backgroundColor: '#FFFFFF',
      scrolling: 'no'
    };

    return (
      <div className={classes.fullwidth}>
        <Iframe
          url={urlPath}
          id="unitTraceTree"
          display="initial"
          position="relative"
          styles={style}
          allowFullScreen
        />
      </div>
    );
  }
}

UnitTraceView.porpTypes = {
  bcAuth: bcAuthType.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    state => ({
      bcAuth: bcAuthSelector(state)
    }),
    {}
  )
)(UnitTraceView);
