/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Timeline, TimelineEvent } from 'react-event-timeline';
import FontAwesome from 'react-fontawesome';
import Typography from '@material-ui/core/Typography';
import { Badge } from 'reactstrap';
import Timeago from 'react-timeago';
import { traceTimelineType } from '../types';

const styles = theme => {
  const { type } = theme.palette;
  const dark = type === 'dark';
  return {
    scrollable: {
      maxHeight: '80vh',
      overflowY: 'scroll'
    },
    text: {
      color: dark ? '#ffffff' : undefined,
      '& .badge-secondary': {
        backgroundColor: '#5e548f'
      }
    },
    event: {
      wordWrap: 'break-word',
      width: '90% !important',
      backgroundColor: dark ? '#423b5f !important' : undefined,
      '& p': {
        color: dark ? '#ffffff' : undefined
      },
      '& > div': {
        color: dark ? 'red' : undefined
      }
    }
  };
};

class TraceTimelineStream extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      traceTimeline: [],
      dialogOpenBlockHash: false,
      blockHash: {}
    };
  }

  render() {
    const { traceTimeline, classes } = this.props;

    return (
      <div>
        <div className={classes.scrollable}>
          <Timeline>
            {traceTimeline.map(item => (
              <TimelineEvent
                key={item.title}
                title={item.title}
                icon={<FontAwesome name="home" />}
                iconColor="#0D3799"
                container="card"
                className={classes.event}
                titleStyle={{ fontWeight: 'bold' }}
                style={{ width: '65%' }}
                cardHeaderStyle={{
                  backgroundColor: '#6283D0',
                  fontSize: '13pt'
                }}
                contentStyle={{
                  backgroundColor: 'transparent'
                }}
              >
                <Typography variant="body1">
                  <b className={classes.text}> Datahash:</b>
                  <br />
                  {item.datahash.map(element => (
                    <li key={element.no}>
                      [{element.no}] {element.nm}
                      {element.addr && ' - ' + element.addr}
                    </li>
                  ))}
                  <br />
                  <b className={classes.text}> Number of Tx:</b> {item.txcount}
                </Typography>
                <h5 className={classes.text}>
                  <Badge className={classes.text}>
                    <Timeago
                      className={classes.text}
                      date={item.time}
                      live={false}
                      minPeriod={60}
                    />
                  </Badge>
                </h5>
              </TimelineEvent>
            ))}
          </Timeline>
        </div>
      </div>
    );
  }
}

TraceTimelineStream.propTypes = {
  traceTimeline: traceTimelineType.isRequired
};

export default withStyles(styles)(TraceTimelineStream);
