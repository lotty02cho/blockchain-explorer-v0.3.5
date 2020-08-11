/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import { processMonitorListType } from '../types';

class ProcessMonitor extends Component {
  reactTableSetup = () => {
    return [
      {
        Header: '가공장 정보',
        columns: [
          {
            Header: '바코드',
            accessor: 'barCode',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['barCode'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'center'
            },
            width: 120
          },
          {
            Header: '이력번호',
            accessor: 'cattleNo',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['cattleNo'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'center'
            },
            width: 120
          },
          {
            Header: '부위명',
            accessor: 'standardPartNm',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['standardPartNm'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            width: 100
          },
          {
            Header: '중량(Kg)',
            accessor: 'pakWeight',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['pakWeight'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'right'
            },
            width: 80
          },
          {
            Header: '가공장',
            accessor: 'processPlaceNm',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['processPlaceNm'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true
          },
          {
            Header: '가공일시',
            accessor: 'pakYmd',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['pakYmd'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'center'
            },
            width: 160
          }
        ]
      },
      {
        Header: '판매장 정보',
        columns: [
          {
            Header: '반출일시',
            accessor: 'saleYmd',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['saleYmd'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'center'
            },
            width: 160
          },
          {
            Header: '판매장',
            accessor: 'marketPlaceNm',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['marketPlaceNm'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true
          },
          {
            Header: '매입일시',
            accessor: 'inYmdMarket',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['inYmdMarket'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'center'
            },
            width: 160
          }
        ]
      }
    ];
  };

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.processMonitorList}
          columns={this.reactTableSetup()}
          defaultPageSize={20}
          className="-striped -highlight"
          filterable
          minRows={0}
          showPagination={
            this.props.processMonitorList.length < 5 ? false : true
          }
        />
      </div>
    );
  }
}

ProcessMonitor.propTypes = {
  processMonitorList: processMonitorListType.isRequired
};

export default ProcessMonitor;
