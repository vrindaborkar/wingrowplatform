import React, { useState, useEffect, useRef } from 'react'
import { DataTable } from 'primereact/datatable'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Column } from 'primereact/column'
import { MultiSelect } from 'primereact/multiselect'
import { Calendar } from 'primereact/calendar'
import { Dropdown } from 'primereact/dropdown'
import { InputSwitch } from 'primereact/inputswitch'
import { formatDate, isValidTimeStamp } from '../../utils/date'
import './index.css'

const GRID = {
  DEFAULTS: {
    PAGINATION: {
      AVAILABLE_PAGE_SIZES: [1, 5, 10, 20, 50],
      TEMPLATE:
        'CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      CURRENT_PAGE_REPORT_TEMPLATE: '',
    },
  },
}

const getRowsPerPageOptions = (pageSize, totalPages, totalRecords) => {
  return GRID.DEFAULTS.PAGINATION.AVAILABLE_PAGE_SIZES.filter(
    val => val <= pageSize * totalPages
  )
}

const filterColumFromDataSet = (dataList, dataKey) => {
  return dataList.filter(col => col.dataKey !== dataKey)
}

const isDeleteAllowed = screenPermission => !!screenPermission?.delete
const isEditAllowed = screenPermission => !!screenPermission?.update
const isReadAllowed = screenPermission => !!screenPermission?.read
const isDownloadAllowed = screenPermission => !!screenPermission?.download

const MzTable = props => {
  const {
    screenPermission,
    showGlobalFilter,
    dataKey,
    paginationInfo,
    areFiltersVisible,
    columns,
    onDeleteRecord,
    onEditRecord,
    onReadRecord,
    onDownloadRecord,
    value,
    emptyMessage,
    globalFilterFields,
    filters,
    loading,
    sortField,
    loadLazyData,
    // eslint-disable-next-line
    moreActionProps,
    // eslint-disable-next-line
    selectionMode,
    showMoreActions,
    parentCallback,
    isCallbackEnable,
  } = props

  const { pageSize, totalRecords, totalPages, pageNumber } = paginationInfo

  const initialSelectedColumns = columns.filter(col => !col.extraProps?.hidden)
  const [selectedColumns, setSelectedColumns] = useState(initialSelectedColumns)
  const [selectedRow, setSelectedRow] = useState(null)
  const [selectedRows, setSelectedRows] = useState([])

  // eslint-disable-next-line
  const cm = useRef(null)
  const dt = useRef(null)

  // eslint-disable-next-line
  const toBeDeletedRecordId = useRef(-1)

  const onColumnToggle = event => {
    let selectedColumns = event.value
    let orderedSelectedColumns = columns.filter(col =>
      selectedColumns.some(sCol => sCol.dataKey === col.dataKey)
    )
    setSelectedColumns(orderedSelectedColumns)
  }

  const [selectedRecords, setSelectedRecords] = useState(0)

  // eslint-disable-next-line
  const toggleRecordSelection = rowData => {
    const selectedIndex = selectedRecords.findIndex(
      record => record.id === rowData.id
    )
    if (selectedIndex === -1) {
      setSelectedRecords([...selectedRecords, rowData])
    } else {
      const updatedRecords = [...selectedRecords]
      updatedRecords.splice(selectedIndex, 1)
      setSelectedRecords(updatedRecords)
    }
  }

  const [globalFilterValue, setGlobalFilterValue] = useState('')
  const onGlobalFilterChange = e => {
    const value = e.target.value
    let _filters = { ...filters }
    _filters['global'].value = value

    setGlobalFilterValue(value)
  }

  // eslint-disable-next-line
  const renderHeader = () => {
    return (
      <div
        style={{
          justifyContent: 'space-between',
          display: 'flex',
          overflow: 'scroll',
        }}>
        <div style={{ textAlign: 'left' }}>
          <MultiSelect
            className={'grid-multi-select-wrapper'}
            panelClassName={''}
            display={'chip'}
            value={selectedColumns}
            options={filterColumFromDataSet(columns, 'id')}
            optionLabel='colLabel'
            onChange={onColumnToggle}
          />
        </div>
        {showGlobalFilter && (
          <span className='p-input-icon-left'>
            <i className='pi pi-search' />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder='Global search in table'
            />
          </span>
        )}
      </div>
    )
  }

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: pageSize,
    page: 1,
    sortField,
    sortOrder: null,
    filters: filters,
  })
  const isFirstRun = useRef(true)
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false
      return
    }
    loadLazyData(getFetchDataParams(lazyParams))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyParams])

  useEffect(() => {
    if (isCallbackEnable === true) {
      parentCallback(selectedRows)
    }
    // eslint-disable-next-line
  }, [selectedRows])

  const getFetchDataParams = () => {
    const { sortOrder, sortField, page, rows, filters } = lazyParams
    let modifiedFilters = []

    if (filters) {
      const filterKeys = Object.keys(filters)
      modifiedFilters = filterKeys.reduce((acc, filterKey) => {
        if (filters[filterKey]?.value) {
          return [
            ...acc,
            {
              filterField: filters[filterKey]?.filterKey || filterKey,
            },
          ]
        }
        return acc
      }, modifiedFilters)
    }

    return {
      filters: filters && modifiedFilters,
      sortOrder,
      sortField,
      pageSize: rows,
      pageNumber: page ?? pageNumber - 1,
    }
  }

  const editRecord = rowData => {
    onEditRecord(rowData)
  }
  const readRecord = rowData => {
    onReadRecord(rowData)
  }
  const downloadRecord = rowData => {
    onDownloadRecord(rowData)
  }

  const deleteRecord = rowData => {
    onDeleteRecord(rowData)
  }

  const onPage = event => {
    setLazyParams(event)
  }

  const onSort = event => {
    setLazyParams(event)
  }

  const onFilter = event => {
    setLazyParams(event)
  }

  const actionBodyTemplate = rowData => {
    const btnClass =
      'p-button-sm p-button-raised p-component p-button-rounded p-button-text p-button-icon-only mx-1'
    return (
      <React.Fragment>
        {isReadAllowed(screenPermission) && (
          <Button
            icon='pi pi-eye'
            className={`${btnClass} p-button-primary`}
            onClick={() => {
              readRecord(rowData)
            }}
          />
        )}
        {isDownloadAllowed(screenPermission) && (
          <Button
            icon='pi pi-plus'
            className={`${btnClass} p-button-success`}
            onClick={() => {
              downloadRecord(rowData)
            }}
          />
        )}
        {isEditAllowed(screenPermission) && (
          <Button
            icon='pi pi-pencil'
            className={`${btnClass} p-button-info`}
            onClick={() => {
              editRecord(rowData)
            }}
          />
        )}
        {isDeleteAllowed(screenPermission) && (
          <Button
            icon='pi pi-trash'
            className={`${btnClass} p-button-danger`}
            onClick={() => {
              deleteRecord(rowData)
            }}
          />
        )}
      </React.Fragment>
    )
  }
  const getActionBodyColumn = () => {
    return {
      key: 'action key',
      body: actionBodyTemplate,
      field: 'action',
      header: 'Actions',
      sortable: false,
      hidden: true,
    }
  }
  const onSelectionChange = e => {
    setSelectedRows(e.value)
  }

  const dataTableProps = {
    ref: dt,
    dataKey,
    selectionMode: 'single',
    size: '',
    stripedRows: true,
    resizableColumns: true,
    reorderableColumns: true,
    showGridlines: true,
    responsiveLayout: 'scroll',
    value,
    removableSort: true,
    emptyMessage,
    globalFilterFields,
    ...(areFiltersVisible ? { filterDisplay: 'row' } : {}),
    paginator: true,
    paginatorTemplate: GRID.DEFAULTS.PAGINATION.TEMPLATE,
    currentPageReportTemplate:
      GRID.DEFAULTS.PAGINATION.CURRENT_PAGE_REPORT_TEMPLATE,
    rowsPerPageOptions: getRowsPerPageOptions(
      pageSize,
      totalPages,
      totalRecords
    ),
    rows: pageSize,
    contextMenuSelection: selectedRow,
    onContextMenuSelectionChange: e => setSelectedRow(e.value),
    selection: selectedRows,
    onSelectionChange: onSelectionChange,
    lazy: true,
    totalRecords,
    onSort,
    onFilter,
    onPage,
    first: lazyParams.first,
    sortField: lazyParams.sortField,
    sortOrder: lazyParams.sortOrder,
    filters: lazyParams.filters,
    loading,
  }

  const dateBodyTemplate = (dataKey, rowData, strategy) => {
    const dateValue = rowData[dataKey]
    const value = isValidTimeStamp(dateValue)
      ? formatDate(dateValue, strategy)
      : dateValue

    return (
      <span style={{ display: 'flex' }}>
        <span style={{ alignContent: 'center' }}>{value}</span>
      </span>
    )
  }
  const monthNavigatorTemplate = e => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={event => e.onChange(event.originalEvent, event.value)}
        style={{ lineHeight: 1 }}
      />
    )
  }

  const yearNavigatorTemplate = e => {
    return (
      <Dropdown
        value={e.value}
        options={e.options}
        onChange={event => e.onChange(event.originalEvent, event.value)}
        className='ml-2'
        style={{ lineHeight: 1 }}
      />
    )
  }

  const dateFilterTemplate = options => {
    return (
      <Calendar
        monthNavigator
        yearNavigator
        monthNavigatorTemplate={monthNavigatorTemplate}
        yearNavigatorTemplate={yearNavigatorTemplate}
        yearRange={'2010:2040'}
        showIcon
        onChange={e => {
          filterDate(e.value, options)
        }}
        dateFormat='dd/mm/yy'
        placeholder='DD/MM/YYYY'
        mask='99/99/99'
      />
    )
  }
  const filterDate = (calendarValue, options) => {
    if (calendarValue) {
      setLazyParams({
        ...lazyParams,
        filters: {
          ...filters,
          date: { value: formatDate(calendarValue) },
        },
      })
    }
  }

  const getFilterProps = (extraProps, dataKey) => {
    if (extraProps) {
      const { isDateField, shouldFilter, showFilterMenu, strategy } = extraProps
      let enrichedFilterProps = {
        filter: shouldFilter ?? false,
        showFilterMenu: showFilterMenu ?? false,
      }

      if (isDateField) {
        enrichedFilterProps = {
          ...enrichedFilterProps,
          dataType: 'date',
          filterField: 'date',
          body: rowData => dateBodyTemplate(dataKey, rowData, strategy),
          filterElement: dateFilterTemplate,
        }
      }

      return enrichedFilterProps
    }

    return {}
  }
  const showActionColumn = () => {
    return (
      showMoreActions ||
      isEditAllowed(screenPermission) ||
      isDeleteAllowed(screenPermission) ||
      isReadAllowed(screenPermission) ||
      isDeleteAllowed(screenPermission)
    )
  }

  const handleToggleActive = (rowData, newValue) => {
    onDeleteRecord(rowData)
  }

  const getColumnProps = column => {
    const filterProps = getFilterProps(column?.extraProps, column.dataKey)

    return {
      ...column,
      key: column.dataKey,
      field: column.dataKey,
      header: column.colLabel,
      sortable: column?.extraProps?.isSortable,
      sortField: column?.extraProps?.sortField,
      body: rowData => {
        // Split dataKey to handle nested properties
        const keys = column.dataKey.split('.')
        let value = rowData
        keys.forEach(key => {
          if (value) {
            value = value[key]
          }
        })

        if (column.dataKey.includes('+')) {
          const keys = column.dataKey.split('+')
          const concatenatedValue = keys
            .map(key => rowData[key.trim()])
            .join(' ')
          return concatenatedValue
        }
        const columnContent = column?.extraProps?.body
          ? column?.extraProps?.body(rowData)
          : value

        // Render special components based on column.dataKey
        if (column.dataKey === 'active') {
          return (
            <InputSwitch
              checked={rowData.active}
              onChange={e => handleToggleActive(rowData, e.value)}
            />
          )
        } else {
          return columnContent
        }
      },
      ...filterProps,
    }
  }
  const indexBodyTemplate = (rowData, { rowIndex }) => {
    return rowIndex + 1
  }
  return (
    <div>
      <div className='card'>
        <DataTable {...dataTableProps}>
          <Column
            key='index'
            field='index'
            header='Sr.No'
            body={indexBodyTemplate}
          />
          {selectedColumns.map(column => (
            <Column
              {...getColumnProps(column)}
              style={{
                maxWidth: '10rem',
                overflow: 'scroll',
                textWrap: 'nowrap',
              }}
            />
          ))}
          {showActionColumn() && <Column {...getActionBodyColumn()} />}
        </DataTable>
      </div>
    </div>
  )
}

MzTable.defaultProps = {
  showGlobalFilter: false,
  showMoreActions: true,
  dataKey: 'id',
  sortField: 'date',
  emptyMessage: 'No Record found',
}

export default MzTable
