/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import types from './types';

const getBlockList = blockList => ({
  type: types.BLOCK_LIST,
  payload: blockList
});
const getBlockListSearch = blockList => ({
  type: types.BLOCK_LIST_SEARCH,
  payload: blockList
});

const getChaincodeList = chaincodeList => ({
  type: types.CHAINCODE_LIST,
  payload: chaincodeList
});

const getChannels = channels => ({
  type: types.CHANNELS,
  payload: channels
});

const getPeerList = peerList => ({
  type: types.PEER_LIST,
  payload: peerList
});

const getTransaction = transaction => ({
  type: types.TRANSACTION,
  payload: transaction
});

const getTransactionList = transactionList => ({
  type: types.TRANSACTION_LIST,
  payload: transactionList
});
const getTransactionListSearch = transactionList => ({
  type: types.TRANSACTION_LIST_SEARCH,
  payload: transactionList
});

const getBcAuth = bcAuth => ({
  type: types.BC_AUTH,
  payload: bcAuth
});

const getProcessTrace = processTrace => ({
  type: types.PROCESS_TRACE,
  payload: processTrace
});

const getProcessMonitor = processMonitor => ({
  type: types.PROCESS_MONITOR,
  payload: processMonitor
});

const getWeightVerify = weightVerify => ({
  type: types.WEIGHT_VERIFY,
  payload: weightVerify
});

export default {
  getBlockList,
  getChaincodeList,
  getChannels,
  getPeerList,
  getTransaction,
  getTransactionList,
  getBlockListSearch,
  getTransactionListSearch,
  getBcAuth,
  getProcessTrace,
  getProcessMonitor,
  getWeightVerify
};
