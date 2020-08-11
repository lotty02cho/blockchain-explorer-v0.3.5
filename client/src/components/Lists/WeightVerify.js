/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import matchSorter from 'match-sorter';
import { weightVerifyListType } from '../types';
import _ from 'lodash';

class WeightVerify extends Component {
  reactTableSetup = () => {
    return [
      {
        Header: '개체정보',
        columns: [
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
          }
        ]
      },
      {
        Header: '가공장 반출실적',
        columns: [
          {
            Header: '가공장',
            accessor: 'processPlaceNm',
            aggregate: vals => _.head(vals),
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
            Header: '반출일시',
            accessor: 'saleYmd',
            aggregate: () => '',
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
            Header: '중량(Kg)',
            accessor: 'saleWeight',
            aggregate: vals => _.round(_.sum(vals), 1),
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['saleWeight'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'right'
            },
            width: 80
          }
        ]
      },
      {
        Header: '판매장 매입실적',
        columns: [
          {
            Header: '판매장',
            accessor: 'saleCorpNm',
            aggregate: vals => _.head(vals),
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['saleCorpNm'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true
          },
          {
            Header: '매입일시',
            accessor: 'marketInYmd',
            aggregate: () => '',
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['marketInYmd'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'center'
            },
            width: 160
          },
          {
            Header: '중량(Kg)',
            accessor: 'marketInWeight',
            aggregate: vals => _.round(_.sum(vals), 1),
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['marketInWeight'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'right'
            },
            width: 80
          }
        ]
      },
      {
        Header: '비교',
        columns: [
          {
            Header: '중량(Kg)',
            accessor: 'diffWeight',
            aggregate: vals => _.round(_.sum(vals), 1),
            filterMethod: (filter, rows) =>
              matchSorter(
                rows,
                filter.value,
                { keys: ['diffWeight'] },
                { threshold: matchSorter.rankings.SIMPLEMATCH }
              ),
            filterAll: true,
            style: {
              textAlign: 'right'
            },
            Cell: row => (
              <span
                style={{
                  color: row.value === 0 ? 'blue' : 'red',
                  fontWeight: row.value === 0 ? 'normal' : 'bold'
                }}
              >
                {row.value}
              </span>
            ),
            width: 80
          }
        ]
      }
    ];
  };

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.weightVerifyList}
          columns={this.reactTableSetup()}
          pivotBy={['cattleNo', 'standardPartNm']}
          defaultPageSize={20}
          className="-striped -highlight"
          filterable
          minRows={0}
          showPagination={this.props.weightVerifyList.length < 5 ? false : true}
        />
      </div>
    );
  }
}

WeightVerify.propTypes = {
  weightVerifyList: weightVerifyListType.isRequired
};

export default WeightVerify;
