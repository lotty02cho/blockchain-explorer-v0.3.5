/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import View from '../Styled/View';
import Loader from 'react-loader-spinner';
import Dialog from '@material-ui/core/Dialog';
import DatePicker from '../Styled/DatePicker';
import moment from 'moment-timezone';
import ProcessMonitor from '../Lists/ProcessMonitor';
import { tableOperations, tableSelectors } from '../../state/redux/tables';
import { bcAuthType, getProcessMonitorType } from '../types';

const styles = theme => {
  return {
    dataLoader: {
      textAlign: 'center',
      padding: 20
    },
    loader: {
      margin: '0 auto',
      width: 100
    }
  };
};

const { bcAuthSelector, processMonitorSelector } = tableSelectors;
const { processMonitor } = tableOperations;

export class ProcessMonitorView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalOpen: false,
      hasDbError: true,
      processPlaceNo: '',
      from: moment().subtract(1, 'days'),
      to: moment(),
      dateCompareErr: false,
      processMonitorList: []
    };
  }

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeFrom = date => {
    this.setState({ from: date });
    if (date > this.state.to) this.setState({ dateCompareErr: true });
    else this.setState({ dateCompareErr: false });
  };

  handleChangeTo = date => {
    this.setState({ to: date });
    if (date > this.state.from) this.setState({ dateCompareErr: false });
    else this.setState({ dateCompareErr: true });
  };

  handleOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleClose = () => {
    this.setState({ modalOpen: false });
  };

  handleSelect = async () => {
    if (this.props.bcAuth !== undefined) {
      if (this.state.from === null || this.state.to === null) {
        alert('올바른 가공일자를 입력하세요.');
        this.hasDbErrorState(true);
        return;
      }

      if (this.state.dateCompareErr) {
        alert('시작일이 종료일 보다 큽니다.');
        this.hasDbErrorState(true);
        return;
      }

      if (!this.state.processPlaceNo) {
        alert('올바른 가공장코드를 입력하세요.');
        this.hasDbErrorState(true);
        this.input.select();
        return;
      }

      await this.handleOpen();

      this.props
        .getProcessMonitor(
          this.state.processPlaceNo,
          this.state.from.format('YYYY-MM-DD HH:mm') + ':00',
          this.state.to.format('YYYY-MM-DD HH:mm') + ':00',
          this.props.bcAuth
        )
        .then(() => {
          if (
            this.props.processMonitor.success &&
            this.props.processMonitor.result.length > 0
          ) {
            this.hasDbErrorState(false);
            this.setState({
              processMonitorList: this.props.processMonitor.result
            });
            this.handleClose();
          } else {
            this.handleClose();
            this.hasDbErrorState(true);
            if (this.props.processMonitor.code === 401) {
              alert('API 토큰이 만료되어 토큰을 재생성 합니다.');
              window.location.reload();
            }
          }
        });
    }
  };

  handleKeypress = e => {
    if (e.key === 'Enter') {
      this.handleSelect();
    }
  };

  hasDbErrorState = boolean => {
    this.setState({
      hasDbError: boolean
    });
  };

  render() {
    const { classes } = this.props;
    const { modalOpen } = this.state;

    return (
      <Fragment>
        <View>
          <div style={{ margin: '10px' }}>
            <label
              className="label"
              style={{ float: 'left', paddingTop: '6px' }}
            >
              From&nbsp;
            </label>
            <div style={{ float: 'left', width: '180px', marginRight: '5px' }}>
              <DatePicker
                id="from"
                selected={this.state.from}
                showTimeSelect
                timeIntervals={30}
                onChange={this.handleChangeFrom}
                placeholderText="From"
                dateFormat="YYYY-MM-DD HH:mm"
              />
            </div>
            <label
              className="label"
              style={{ float: 'left', paddingTop: '6px' }}
            >
              {' '}
              To&nbsp;
            </label>
            <div style={{ float: 'left', width: '180px', marginRight: '5px' }}>
              <DatePicker
                id="to"
                selected={this.state.to}
                showTimeSelect
                timeIntervals={30}
                onChange={this.handleChangeTo}
                placeholderText="To"
                dateFormat="YYYY-MM-DD HH:mm"
              />
            </div>
            <input
              name="processPlaceNo"
              value={this.state.processPlaceNo}
              onChange={this.handleChangeInput}
              onKeyPress={this.handleKeypress}
              placeholder="가공장코드"
              ref={ref => (this.input = ref)}
              style={{ float: 'left', height: '35px', marginRight: '5px' }}
            />
            <button onClick={this.handleSelect} style={{ height: '36px' }}>
              조회
            </button>
          </div>
          {(() => {
            if (this.state.hasDbError === false)
              return (
                <ProcessMonitor
                  processMonitorList={this.state.processMonitorList}
                />
              );
            else {
              return (
                <Fragment>
                  <hr style={{ margin: '0px' }} />
                  <div
                    style={{
                      height: '70vh',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <h1>검색결과가 없습니다.</h1>
                  </div>
                </Fragment>
              );
            }
          })()}
          <Dialog
            open={modalOpen}
            onClose={this.handleClose}
            fullWidth={false}
            maxWidth="md"
          >
            <div className={classes.dataLoader}>
              <h4>Loading Data</h4>
              <Loader
                type="ThreeDots"
                color="#005069"
                height={70}
                width={70}
                className={classes.loader}
              />
            </div>
          </Dialog>
        </View>
        <br />
        <br />
      </Fragment>
    );
  }
}

ProcessMonitorView.porpTypes = {
  bcAuth: bcAuthType.isRequired,
  getProcessMonitor: getProcessMonitorType.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    state => ({
      bcAuth: bcAuthSelector(state),
      processMonitor: processMonitorSelector(state)
    }),
    {
      getProcessMonitor: processMonitor
    }
  )
)(ProcessMonitorView);
