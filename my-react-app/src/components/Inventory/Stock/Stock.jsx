import React from 'react'
import StockTable from '../../Tables/StockTable'
import HandleUpdateStockProvider from '../../../api/handleUpdateStock'
export default function Stock() {
  return (
    <div>
        <HandleUpdateStockProvider>
        <StockTable></StockTable>
        </HandleUpdateStockProvider>
    </div>
  )
}
