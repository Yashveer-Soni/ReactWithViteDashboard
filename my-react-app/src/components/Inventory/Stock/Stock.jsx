import React from 'react'
import StockTable from '../../Tables/StockTable'
import HandleUpdateStockProvider from '../../../api/handleUpdateStock'
import { NavLink } from 'react-router-dom'
import { Icon } from '@iconify/react';

export default function Stock() {
  return (
    <div>
        <HandleUpdateStockProvider>
        <div className='w-full flex justify-end py-4'><NavLink to='/inventory/stock/history'><h4 className='flex items-center gap-1 text-lg'><Icon width={24} icon="fluent-color:history-16"></Icon>History</h4></NavLink></div>
        <StockTable></StockTable>
        </HandleUpdateStockProvider>
    </div>
  )
}
