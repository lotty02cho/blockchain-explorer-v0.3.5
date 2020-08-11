/**
 *    SPDX-License-Identifier: Apache-2.0
 */

const namespaces = 'tables';

const BLOCK_LIST = `${namespaces}/BLOCK_LIST`;
const CHAINCODE_LIST = `${namespaces}/CHAINCODE_LIST`;
const CHANNELS = `${namespaces}/CHANNELS`;
const PEER_LIST = `${namespaces}/PEER_LIST`;
const TRANSACTION = `${namespaces}/TRANSACTION`;
const TRANSACTION_LIST = `${namespaces}/TRANSACTION_LIST`;
const BLOCK_LIST_SEARCH = `${namespaces}/BLOCK_LIST_SEARCH`;
const TRANSACTION_LIST_SEARCH = `${namespaces}/TRANSACTION_LIST_SEARCH`;
const ORGS = `${namespaces}/ORGS`;
const BC_AUTH = `${namespaces}/BC_AUTH`;
const PROCESS_TRACE = `${namespaces}/PROCESS_TRACE`;
const PROCESS_MONITOR = `${namespaces}/PROCESS_MONITOR`;
const WEIGHT_VERIFY = `${namespaces}/WEIGHT_VERIFY`;

export default {
  BLOCK_LIST,
  CHAINCODE_LIST,
  CHANNELS,
  PEER_LIST,
  TRANSACTION,
  TRANSACTION_LIST,
  BLOCK_LIST_SEARCH,
  TRANSACTION_LIST_SEARCH,
  ORGS,
  BC_AUTH,
  PROCESS_TRACE,
  PROCESS_MONITOR,
  WEIGHT_VERIFY
};
