/**
 *    SPDX-License-Identifier: Apache-2.0
 */
import actions from './actions';
import { get, post, getFromBc } from '../../../services/request';
const blockList = channel => dispatch =>
  get(`/api/blockAndTxList/${channel}/0`)
    .then(resp => {
      if (resp.status === 500) {
        dispatch(
          actions.getErroMessage(
            '500 Internl Server Error: The server has encountered an internal error and unable to complete your request'
          )
        );
      } else if (resp.status === 400) {
        dispatch(actions.getErroMessage(resp.error));
      } else {
        dispatch(actions.getBlockList(resp));
      }
    })
    .catch(error => {
      console.error(error);
    });
const blockListSearch = (channel, query) => dispatch =>
  get(`/api/blockAndTxList/${channel}/0?${query}`)
    .then(resp => {
      dispatch(actions.getBlockListSearch(resp));
    })
    .catch(error => {
      console.error(error);
    });

const chaincodeList = channel => dispatch =>
  get(`/api/chaincode/${channel}`)
    .then(resp => {
      if (resp.status === 500) {
        dispatch(
          actions.getErroMessage(
            '500 Internl Server Error: The server has encountered an internal error and unable to complete your request'
          )
        );
      } else if (resp.status === 400) {
        dispatch(actions.getErroMessage(resp.error));
      } else {
        dispatch(actions.getChaincodeList(resp));
      }
    })
    .catch(error => {
      console.error(error);
    });

// table channel
const channels = () => dispatch =>
  get('/api/channels/info')
    .then(resp => {
      if (resp.status === 500) {
        dispatch(
          actions.getErroMessage(
            '500 Internl Server Error: The server has encountered an internal error and unable to complete your request'
          )
        );
      } else if (resp.status === 400) {
        dispatch(actions.getErroMessage(resp.error));
      } else {
        dispatch(actions.getChannels(resp));
      }
    })
    .catch(error => {
      console.error(error);
    });

const peerList = channel => dispatch =>
  get(`/api/peersStatus/${channel}`)
    .then(resp => {
      if (resp.status === 500) {
        dispatch(
          actions.getErroMessage(
            '500 Internl Server Error: The server has encountered an internal error and unable to complete your request'
          )
        );
      } else if (resp.status === 400) {
        dispatch(actions.getErroMessage(resp.error));
      } else {
        dispatch(actions.getPeerList(resp));
      }
    })
    .catch(error => {
      console.error(error);
    });

const transaction = (channel, transactionId) => dispatch =>
  get(`/api/transaction/${channel}/${transactionId}`)
    .then(resp => {
      if (resp.status === 500) {
        dispatch(
          actions.getErroMessage(
            '500 Internl Server Error: The server has encountered an internal error and unable to complete your request'
          )
        );
      } else if (resp.status === 400) {
        dispatch(actions.getErroMessage(resp.error));
      } else {
        dispatch(actions.getTransaction(resp));
      }
    })
    .catch(error => {
      console.error(error);
    });

const transactionListSearch = (channel, query) => dispatch =>
  get(`/api/txList/${channel}/0/0?${query}`)
    .then(resp => {
      dispatch(actions.getTransactionListSearch(resp));
    })
    .catch(error => {
      console.error(error);
    });

const transactionList = channel => dispatch =>
  get(`/api/txList/${channel}/0/0/`)
    .then(resp => {
      if (resp.status === 500) {
        dispatch(
          actions.getErroMessage(
            '500 Internl Server Error: The server has encountered an internal error and unable to complete your request'
          )
        );
      } else if (resp.status === 400) {
        dispatch(actions.getErroMessage(resp.error));
      } else {
        dispatch(actions.getTransactionList(resp));
      }
    })
    .catch(error => {
      console.error(error);
    });

const bcAuth = postData => dispatch =>
  post(`http://bc.nebis.co.kr:4000/users`, postData)
    .then(resp => {
      //console.log(resp.token);
      dispatch(actions.getBcAuth(resp.token));
    })
    .catch(error => {
      console.error(error);
    });

const processTrace = (flag, value, auth) => dispatch =>
  getFromBc(
    `http://bc.nebis.co.kr:4000/channels/honeybeechannel/chaincodes/tracecc?args=%5B%22${flag}%22%2C%22${value}%22%5D&fcn=queryTrace&peer=org2%2Fpeer0`,
    auth
  )
    .then(resp => {
      dispatch(actions.getProcessTrace(resp));
    })
    .catch(error => {
      console.error(error);
      dispatch(actions.getProcessTrace(error.error.response.body));
    });

const processMonitor = (processPlaceCd, from, to, auth) => dispatch =>
  getFromBc(
    `http://bc.nebis.co.kr:4000/channels/honeybeechannel/chaincodes/tracecc?args=%5B%22${processPlaceCd}%22%2C%22${from}%22%2C%22${to}%22%5D&fcn=queryMonitoring&peer=org2%2Fpeer0`,
    auth
  )
    .then(resp => {
      dispatch(actions.getProcessMonitor(resp));
    })
    .catch(error => {
      console.error(error);
      dispatch(actions.getProcessMonitor(error.error.response.body));
    });

const weightVerify = (
  processPlaceCd,
  marketPlaceCd,
  from,
  to,
  auth
) => dispatch =>
  getFromBc(
    `http://bc.nebis.co.kr:4000/channels/honeybeechannel/chaincodes/tracecc?args=%5B%22${processPlaceCd}%22%2C%22${marketPlaceCd}%22%2C%22${from}%22%2C%22${to}%22%5D&fcn=queryVerifyTransaction&peer=org2%2Fpeer0`,
    auth
  )
    .then(resp => {
      dispatch(actions.getWeightVerify(resp));
    })
    .catch(error => {
      console.error(error);
      dispatch(actions.getWeightVerify(error.error.response.body));
    });

export default {
  blockList,
  chaincodeList,
  channels,
  peerList,
  transaction,
  transactionList,
  transactionListSearch,
  blockListSearch,
  bcAuth,
  processTrace,
  processMonitor,
  weightVerify
};
