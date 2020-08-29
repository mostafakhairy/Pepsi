import React, { useEffect, useState, useContext } from 'react';
import Classes from './History.module.scss';
import Breadcrumb from './../common/breadcrumb/Breadcrumb';
import Table from 'react-bootstrap/Table';
import translation from './../../assets/localization/language';
import couponsService from '../../services/coupons.service';
import { VoucherDetail } from '../../models/interfaces/IUserHistory';
import { InfiniteScroll } from 'react-simple-infinite-scroll-patched';
import Loader from '../common/loader/Loader';
import { ApplicationContext } from '../../context/ApplicationContext';

export default function History() {
  const [appState] = useContext(ApplicationContext);
  const [historyState, setHistoryState] = useState({
    historyList: [] as VoucherDetail[],
    totalCount: 0,
    page: 0,
    isLoading: false,
  });
  const getHistory = () => {
    setHistoryState({ ...historyState, isLoading: true });
    couponsService
      .history(10, historyState.page)
      .then((res) => {
        setHistoryState({
          historyList: [...historyState.historyList, ...res.voucherDetails],
          totalCount: res.totalCount,
          page: historyState.page + 1,
          isLoading: false,
        });
      })
      .catch((err) => {
        setHistoryState({ ...historyState, isLoading: false });
        console.log(err);
      });
  };

  useEffect(() => {
    setHistoryState({ ...historyState, historyList: [], isLoading: true });
    couponsService
      .history(10, 0)
      .then((res) => {
        setHistoryState({
          historyList: [...res.voucherDetails],
          totalCount: res.totalCount,
          page: 1,
          isLoading: false,
        });
      })
      .catch((err) => {
        setHistoryState({ ...historyState, isLoading: false });
        console.log(err);
      });
  }, [appState.lang]);

  const loadMore = () => {
    getHistory();
  };

  // const renderTransactionStatus = (status: String) => {
  //   if (status === 'Subscribed' || status === 'مشترك') {
  //     return (
  //       <span className="text-success">
  //         <i className="las la-check icon"></i> {status}
  //       </span>
  //     );
  //   } else if (status === 'Burned' || status === 'مستخدم') {
  //     return (
  //       <>
  //         <i className="las la-check-double icon"></i>
  //         {status}
  //       </>
  //     );
  //   } else if (status === 'Expired' || status === 'منتهى الصلاحية') {
  //     return (
  //       <span className="text-danger">
  //         <i className="las la-times icon"></i>
  //         {status}
  //       </span>
  //     );
  //   }
  // };

  const convertDate = (date: any) => {
    const convertedDate = date.split('T')[0];
    const dateWithoutSpace = convertedDate.split(' ')[0];
    return dateWithoutSpace;
  };

  return (
    <div className={Classes.history}>
      <Breadcrumb
        activePage="giftsHistory"
        previousPage="pepsiGifts"
        header="giftsHistory"
        text="giftsHistoryListText"
      />

      <div className={'mb-4'} style={{ minHeight: '334px' }}>
        <Loader show={historyState.isLoading} position={'Absolute'} center={true} />
        <InfiniteScroll
          throttle={100}
          threshold={300}
          isLoading={historyState.isLoading}
          hasMore={historyState.historyList.length < historyState.totalCount ? true : false}
          onLoadMore={loadMore}
        >
          <Table responsive bordered className="table-style-1">
            <thead>
              <tr>
                <th>{translation.dateTime}</th>
                <th>{translation.gift}</th>
                <th>{translation.couponNumber}</th>
                <th>{translation.expireDate}</th>
              </tr>
            </thead>
            <tbody>
              {historyState.historyList && historyState.historyList.length > 0 ? (
                historyState.historyList.map((record: any) => {
                  return (
                    <tr key={record.voucherNumber}>
                      <td>{convertDate(record.lastModifiedAction)}</td>
                      <td>{record.offerTitle}</td>
                      <td>
                        <span className="num">{record.voucherNumber}</span>
                      </td>
                      <td>
                        <span className="date">{convertDate(record.expiryDate)}</span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td style={{ height: '246px', textAlign: 'center' }} colSpan={5}>
                    {!historyState.isLoading ? translation['noHistory'] : ''}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </InfiniteScroll>
      </div>
    </div>
  );
}
