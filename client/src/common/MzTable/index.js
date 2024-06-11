import React, { useEffect, useRef, useState } from "react";
// import { MultiSelect } from "primereact/multiselect";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const getRowsPerPageOption = (pageSize, totalPages, totalRecords) => {
  return GRID.DEFAULT.PAGINATION.AVAILABLE_PAGE_SIZE.filter(
    (val) => val <= pageSize * totalPages
  );
};

const filterColumnFromDataSet = (dataList, dataKey) => {
  return dataList.filter((col) => col.dataKey !== dataKey);
};

const GRID = {
  DEFAULT: {
    PAGINATION: {
      AVAILABLE_PAGE_SIZE: [1, 5, 10, 15, 20, 50],
      TEMPLETE: "",
      CURRENT_PAGE_REPORT_TEMPLETE: "",
    },
  },
};

const MzTable = (props) => {
  const {
    showGlobalFilter,
    areFilterVisible,
    loading,
    columns,
    paginationInfo,
    dataKey,
    value,
    emptyMessage,
    filters,
    sortField,
    // showMoreAction,
    globalFilteFields,
    onReadRecord,
    loadLazyData,
    // screenPermission,
  } = props;

  const dt = useRef(null);
  const cm = useRef(null);
  const [selectedRow, setSelectedRow] = useState([]);

  // const [currentRowData, setCurrentRowData] = useState(null);

  const { pageSize, totalRecords, totalPages, pageNumber } =
    paginationInfo || {};

  let isReadAllowed = (screenPermission) => !!screenPermission?.read;

  const [selectedColumns, setSelectColumns] = useState(
    filterColumnFromDataSet(columns, "id")
  );
  //   const onColumnToggle = (event) => {
  //     let selectedColumns = event.value;
  //     let orderedSelectedColumns = columns.filters((col) => {
  //       selectedColumns.some((sCol) => (sCol.dataKey === col.dataKey))
  //       setSelectColumns(orderedSelectedColumns);
  //     }
  //     );
  //   };

  // eslint-disable-next-line
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.dataKey === col.dataKey)
    );
    setSelectColumns(orderedSelectedColumns);
  };
  // eslint-disable-next-line
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    let value = e.target.value;
    let _filters = { ...filters };
    _filters["global"].value = value;
  };

  const renderHeader = () => {
    return (
      <div style={{ justifyContent: "space-between", display: "flex" }}>
        <div style={{ textAlign: "left" }}>
          {/* <MultiSelect
            className={"grid-multi-select-wrapper"}
            panelClassName=""
            display={"chip"}
            value={selectedColumns}
            options={filterColumnFromDataSet(columns, "id")}
            optionLabel="colLabel"
            onChange={onColumnToggle}
          /> */}
        </div>
        {showGlobalFilter && (
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Global Search In Table"
            />
          </span>
        )}
      </div>
    );
  };

  const [lazyParams, setLazyParams] = useState({
    first: 0,
    rows: pageSize,
    page: 1,
    sortField,
    sortOrder: null,
    filters: filters,
  });

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun) {
      isFirstRun.current = false;
    }
    loadLazyData(getFetchDataParams(lazyParams));
  });

  const getFetchDataParams = () => {
    const { sortOrder, sortField, page, rows, filters } = lazyParams;

    debugger;
    let modifiedFilters = [];
    if (filters) {
      const filterKeys = Object.keys(filters);
      modifiedFilters = filterKeys.reduce((acc, filterKey) => {
        if (filters[filterKey]?.value) {
          const { valueMapper, value } = filters[filterKey];
          return [
            ...acc,
            {
              filterField: filters[filterKey]?.filterKey || filterKey,

              query: valueMapper ? valueMapper(value) : value,
            },
          ];
        }
        return acc;
      }, modifiedFilters);
    }
    return {
      filters: filters && modifiedFilters,
      sortOrder,
      sortField,
      pageSize: rows,
      pageNumber: page ?? pageNumber - 1,
    };
  };

  const readRecord = (rowData) => {
    onReadRecord(rowData);
  };

  const onPage = (event) => {
    setLazyParams(event);
  };
  const onSort = (event) => {
    setLazyParams(event);
  };
  const onFilter = (event) => {
    setLazyParams(event);
  };

  //   let isReadAllowed = true;
  const actionBodyTemplate = (rowData) => {
    const btnClass =
      // "p-button-sm p-button-raised p-component p-button-rounded p-button-text p-button-icon-only";
      "p-button-sm p-componentd p-button-text";
    return (
      <React.Fragment>
        {isReadAllowed && (
          // <Button
          //   icon="pi pi-eye"
          //   className={`${btnClass} p-button-warning`}
          //   onClick={() => {
          //     readRecord(rowData);
          //   }}
          // />
          <Button
            // icon="pi pi-eye"
            label="View Details"
            className={`${btnClass} p-button-info`}
            onClick={() => {
              readRecord(rowData);
            }}
          />
        )}
      </React.Fragment>
    );
  };
  const getActionBodyColumn = () => {
    return {
      key: "action key",
      body: actionBodyTemplate,
      field: "action",
      header: "View Details",
      sortable: false,
      hidden: false,
    };
  };
  const onContextMenu = (event) => {
    if (cm.current) {
      cm.current.show(event);
    }
  };
  const dataTableProps = {
    ref: dt,
    header: renderHeader(),
    dataKey,
    selectionMode: "single",
    size: "small",
    stripedRows: true,
    resizableColumns: true,
    reorderableColumns: true,
    responsiveLayout: "scroll",
    value,
    removableSort: true,
    emptyMessage,
    globalFilteFields,
    ...(areFilterVisible ? { filterDisplay: "row" } : {}),
    paginator: true,
    paginatorTemplete: GRID.DEFAULT.PAGINATION.TEMPLETE,
    currentPageReportTemplete:
      GRID.DEFAULT.PAGINATION.CURRENT_PAGE_REPORT_TEMPLETE,
    rowsPerPageOption: getRowsPerPageOption(pageSize, totalPages, totalRecords),
    rows: pageSize,
    contextMenuSelection: selectedRow,
    selection: selectedRow,
    onContextMenuSelectionChange: (e) => {
      setSelectedRow(e.value);
    },
    onContextMenu: onContextMenu,
    // onSelectionChange: (e) => setSelectedRow([...selectedRow, e.value]),
    onSelectionChange: (e) => setSelectedRow(e.value),
    lazy: true,
    totalRecords,
    onSort,
    onPage,
    onFilter,
    first: lazyParams.first,
    sortField: lazyParams.sortField,
    sortOrder: lazyParams.sortOrder,
    filters: filters,
    loading,
  };

  const getFilterProps = (extraProps, dataKey) => {
    if (extraProps) {
      const { shouldFilter, showFilterMenu } = extraProps;
      let enrichedFilterProps = {
        filter: shouldFilter ?? false,
        showFilterMenu: showFilterMenu ?? false,
      };

      return enrichedFilterProps;
    }
    return {};
  };

  const showActionColumn = () => {
    return (isReadAllowed = true);
    //   isDeleteAllowed(screenPermissions) ||
    //   isReadAllowed(screenPermissions) ||
    //   isDeleteAllowed(screenPermissions)
  };

  const getColumnProps = (column) => {
    const filterProps = getFilterProps(column?.extraProps, column.dataKey);
    return {
      ...column,
      key: column.dataKey,
      field: column.dataKey,
      header: column.colLabel,
      sortable: column?.extraProps?.isSortable,
      sortField: column?.extraProps?.sortField,
      hidden: column?.extraProps?.hidden,
      //   body: (rowData) => {
      //     column?.extraProps?.body
      //       ? column?.extraProps?.body(rowData)
      //       : rowData[column.dataKey];
      //   },

      //   body: (rowData) => {
      //     return column?.extraProps?.body
      //       ? column?.extraProps?.body(rowData)
      //       : rowData[column.dataKey];
      //   },
      //   body: (rowData) => {
      //     if (column.dataKey === "account") {
      //       return (
      //         <ul>
      //           {rowData.account.map((acc) => (
      //             <li key={acc.id}>
      //               {acc.bankName} - {acc.accountNo}
      //             </li>
      //           ))}
      //         </ul>
      //       );
      //     } else {

      //       return rowData[column.dataKey];
      //     }
      //   },
      body: (rowData) => {
        if (column.dataKey === "taxPaidStatus") {
          const taxPaidStatus = rowData[column.dataKey];
          if (taxPaidStatus === "Paid") {
            return (
              <Button
                className="w-full"
                style={{
                  backgroundColor: "rgba(196, 241, 214, 1)",
                  color: "#3E8B5C",
                  border: "none",
                }}
                label="Paid"
              />
            );
          } else if (taxPaidStatus === "Unpaid") {
            return (
              <Button
                className="w-full"
                style={{
                  backgroundColor: "rgba(254, 129, 58, 0.2)",
                  color: "#FE813A",
                  border: "none",
                }}
                label="Not Paid"
              />
            );
          } else {
            return (
              <Button
                className="w-full"
                style={{
                  backgroundColor: "rgba(196, 241, 214, 1)",
                  color: "#3E8B5C",
                  border: "none",
                }}
                label={taxPaidStatus}
              />
            );
          }
        } else {
          return rowData[column.dataKey];
        }
      },
      ...filterProps,
    };
  };
  return (
    <div className="card">
      <DataTable {...dataTableProps}>
        {selectedColumns.map((column) => (
          <Column {...getColumnProps(column)} />
        ))}
        {showActionColumn() && <Column {...getActionBodyColumn()} />}
      </DataTable>
    </div>
  );
};
MzTable.defaultProps = {
  showGlobalFilter: false,
  showMoreActions: true,
  dataKey: "id",
  sortField: "date",
  emptyMessage: "No Record found",
};
export default MzTable;
