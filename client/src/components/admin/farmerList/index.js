import React, { useEffect, useState } from 'react'
import { fetchFarmerList } from '../../../redux/action/admin'
import { useDispatch, useSelector } from 'react-redux'
import farmerTableData from '../../../containers/adminScreen/data.json'
import MzTable from '../../../common/MzTable'
import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'
import { useTranslation } from 'react-i18next'

export default function FarmersListComponent(props) {
  const { t } = useTranslation()

  const dispatch = useDispatch()
  const [farmerData, setFarmerData] = useState([])
  const [paginationInfo, setPaginationInfo] = useState({ pageSize: 10 })

  useEffect(() => {
    dispatch(fetchFarmerList())
    // eslint-disable-next-line
  }, [])

  const farmerList = useSelector(
    state => state.adminReducer?.farmerList ?? null
  )
  const isLoading = useSelector(state => state.adminReducer?.isLoading ?? null)

  useEffect(() => {
    setFarmerData(farmerList.slice(0, paginationInfo.pageSize))
    setPaginationInfo({
      ...paginationInfo,
      totalPages: Math.ceil(farmerList.length / paginationInfo.pageSize),
      totalRecords: farmerList.length,
    })
    // eslint-disable-next-line
  }, [farmerList, paginationInfo.pageSize])

  const loadLazyData = event => {
    const { pageNumber, pageSize } = event
    const startIndex = pageNumber * pageSize
    const endIndex = startIndex + pageSize
    const paginatedFarmers = farmerList.slice(startIndex, endIndex)

    setPaginationInfo({
      ...paginationInfo,
      pageNumber,
      pageSize,
    })
    setFarmerData(paginatedFarmers)
  }
  const filters = {
    global: { value: null },
    userName: { filterKey: 'username', value: null },
    email: { filterKey: 'email', value: null },
  }

  const tableProps = {
    value: farmerData,
    loading: isLoading,
    columns: farmerTableData?.tableData?.columns,
    paginationInfo,
    screenPermission: farmerTableData?.tableData?.screenPermission,
    loadLazyData,
    emptyMessage: 'No Farmer Record Found',
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
