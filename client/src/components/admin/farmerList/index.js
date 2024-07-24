import React, { useEffect, useState } from 'react'
import { fetchFarmerList } from '../../../redux/action/admin';
import { useDispatch, useSelector } from 'react-redux';
import farmerTableData from "../../../containers/adminScreen/data.json";
import MzTable from "../../../common/MzTable";

export default function FarmersListComponent(props) {


    const dispatch = useDispatch();
    const [farmerData, setFarmerData] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({pageSize: 10});

    useEffect(() => {
        dispatch(fetchFarmerList());
    }, []);

    const farmerList = useSelector(
        (state) => state.adminReducer?.farmerList ?? null
    );
    const isLoading = useSelector(
        (state) => state.adminReducer?.isLoading ?? null
    );

    useEffect(() => {
        setFarmerData(farmerList.slice(0, paginationInfo.pageSize));
        setPaginationInfo({
          ...paginationInfo,
          totalPages: Math.ceil(farmerList.length / paginationInfo.pageSize),
          totalRecords: farmerList.length,
        });
      }, [farmerList, paginationInfo.pageSize]);

 

      const loadLazyData = (event) => {
        const { pageNumber, pageSize } = event;
        const startIndex = pageNumber * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedFarmers = farmerList.slice(startIndex, endIndex);
      
        setPaginationInfo({
          ...paginationInfo,
          pageNumber,
          pageSize,
        });
        setFarmerData(paginatedFarmers);
      };
      const filters = {
        global: { value: null },
        userName: { filterKey: "username", value: null },
        email: { filterKey: "email", value: null },
      };
  
    const tableProps = {
        value: farmerData,
        loading: isLoading,
        columns: farmerTableData?.tableData?.columns,
        paginationInfo,
        screenPermission: farmerTableData?.tableData?.screenPermission,
        loadLazyData,
        emptyMessage: "No Farmer Record Found",
        filters,
        sortField: null,
        showMoreAction: false
      };

    return (
        <div className="border-1 border-200 border-round mt-3 p-4 bg-white">
              <MzTable {...tableProps} />
        </div>
    )
}
