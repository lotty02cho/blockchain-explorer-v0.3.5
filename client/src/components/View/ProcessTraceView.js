/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Select from '../Styled/Select';
import View from '../Styled/View';
import TraceTimelineStream from '../Lists/TraceTimelineStream';
import { tableOperations, tableSelectors } from '../../state/redux/tables';
import { bcAuthType, getProcessTraceType } from '../types';

const styles = theme => {
  return {
    selectBox: {
      width: '150px',
      float: 'left',
      marginRight: '5px'
    }
  };
};

const { bcAuthSelector, processTraceSelector } = tableSelectors;
const { processTrace } = tableOperations;

export class ProcessTraceView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: 'cattleNo',
      traceTimeline: [],
      hasDbError: true,
      inputNo: ''
    };
  }

  setNotifications = processTrace => {
    let traceTimelineArr = [];
    if (processTrace !== undefined) {
      for (let i = 0; processTrace && processTrace[i]; i++) {
        const block = processTrace[i];
        const notify = {
          title: block.id,
          type: 'block',
          time: '',
          txcount: block.list.length,
          datahash: block.list,
          blockhash: ''
        };
        traceTimelineArr.push(notify);
      }
    }
    this.setState({
      traceTimeline: traceTimelineArr
    });
  };

  handleChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleChangeCombo = selectOption => {
    this.setState({
      selectedOption: selectOption.value
    });
    //console.log(`Option selected:`, selectOption);
  };

  handleSelect = () => {
    if (this.props.bcAuth !== undefined) {
      if (
        this.state.inputNo === 'cattleNo' &&
        (isNaN(this.state.inputNo) || this.state.inputNo.length !== 12)
      ) {
        alert('유효하지 않은 개체식별번호 입니다.');
        this.hasDbErrorState(true);
        this.input.select();
        return;
      }
      /*
      if (this.state.inputNo === 'barcode' && isNaN(this.state.inputNo)) {
        alert("유효하지 않은 바코드번호 입니다.");
        this.hasDbErrorState(true);
        this.input.select();
        return;
      }
      */
      this.props
        .getProcessTrace(
          this.state.selectedOption,
          this.state.inputNo,
          this.props.bcAuth
        )
        .then(() => {
          if (
            this.props.processTrace.success &&
            this.props.processTrace.result.length > 0
          ) {
            this.hasDbErrorState(false);
            this.setNotifications(this.props.processTrace.result);
          } else {
            this.hasDbErrorState(true);
            if (this.props.processTrace.code === 401) {
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
    const options = [
      { value: 'cattleNo', label: '이력번호' },
      { value: 'barCode', label: '바코드번호' }
    ];

    return (
      <View>
        <div style={{ margin: '10px' }}>
          <Select
            className={classes.selectBox}
            placeholder="검색조건"
            name="selectOption"
            value={this.state.selectedOption}
            onChange={this.handleChangeCombo}
            options={options}
          />
          <input
            name="inputNo"
            value={this.state.inputNo}
            onChange={this.handleChangeInput}
            onKeyPress={this.handleKeypress}
            placeholder="이력번호 or 바코드번호"
            ref={ref => (this.input = ref)}
            style={{ height: '36px', marginRight: '5px' }}
          />
          <button onClick={this.handleSelect} style={{ height: '36px' }}>
            조회
          </button>
        </div>
        <hr style={{ margin: '0px' }} />
        {(() => {
          if (this.state.hasDbError === false) {
            return (
              <TraceTimelineStream traceTimeline={this.state.traceTimeline} />
            );
          } else {
            return (
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
            );
          }
        })()}
      </View>
    );
  }
}

ProcessTraceView.porpTypes = {
  bcAuth: bcAuthType.isRequired,
  getProcessTrace: getProcessTraceType.isRequired
};

export default compose(
  withStyles(styles),
  connect(
    state => ({
      bcAuth: bcAuthSelector(state),
      processTrace: processTraceSelector(state)
    }),
    {
      getProcessTrace: processTrace
    }
  )
)(ProcessTraceView);
