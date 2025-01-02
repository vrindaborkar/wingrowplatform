import React, { useEffect, useState } from 'react'
import { fetchCustomerList } from '../../../redux/action/admin'
import { useDispatch, useSelector } from 'react-redux'
import customerTableData from '../../../containers/adminScreen/data.json'
import MzTable from '../../../common/MzTable'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useTranslation } from 'react-i18next'

export default function CustomersListComponent() {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const [customerData, setCustomerData] = useState([])
  const [paginationInfo, setPaginationInfo] = useState({
    pageSize: 10,
    pageNumber: 0,
    totalPages: 0,
    totalRecords: 0,
  })

  useEffect(() => {
    dispatch(fetchCustomerList())
  }, [dispatch])

  const customersList = useSelector(
    state => state.adminReducer?.customerList ?? []
  )
  const isLoading = useSelector(state => state.adminReducer?.isLoading ?? false)

  useEffect(() => {
    setCustomerData(customersList.slice(0, paginationInfo.pageSize))
    setPaginationInfo(prevInfo => ({
      ...prevInfo,
      totalPages: Math.ceil(customersList.length / prevInfo.pageSize),
      totalRecords: customersList.length,
    }))
  }, [customersList, paginationInfo.pageSize])

  const loadLazyData = event => {
    const { pageNumber, pageSize } = event
    const startIndex = pageNumber * pageSize
    const endIndex = startIndex + pageSize
    const paginatedCustomers = customersList.slice(startIndex, endIndex)

    setPaginationInfo({
      ...paginationInfo,
      pageNumber,
      pageSize,
    })
    setCustomerData(paginatedCustomers)
  }

  const filters = {
    global: { value: null },
    userName: { filterKey: 'username', value: null },
    email: { filterKey: 'email', value: null },
  }

  const tableProps = {
    value: customerData,
    loading: isLoading,
    columns: customerTableData?.tableData?.columns,
    paginationInfo,
    screenPermission: customerTableData?.tableData?.screenPermission,
    loadLazyData,
    emptyMessage: 'No Customer Record Found',
    filters,
    sortField: null,
    showMoreAction: false,
  }

  return (
    <div className='border-1 border-200 border-round mt-3 p-4 bg-white'>
      <div className='text-left'>
        <div className='d-inline-block m-3'>
          <Link to='/admin' className='text-d-none'>
            <Button
              className='p-button-rounded flex justify-content-start'
              icon='pi pi-angle-left mr-2'>
              {t('back')}
            </Button>
          </Link>
        </div>
      </div>
      <MzTable {...tableProps} />
    </div>
  )
}
