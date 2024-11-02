import React from 'react'
import StockHistoryTable from '../../Tables/StockHistoryTable'
import FetchStockHistory from '../../../api/FetchStockHistory'

export default function StockHistory() {
  return (
    <>
        <FetchStockHistory>
            <StockHistoryTable></StockHistoryTable>
        </FetchStockHistory>
    </>
  )
}
