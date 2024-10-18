import React, { useEffect } from "react";
import StallComponent from "../../components/stall";
import { connect } from "react-redux";
import { ProgressBar } from "primereact/progressbar";
import { fetchStallList, initStall } from "../../redux/action/stall";
import { fetchMarketList } from "../../redux/action/market";
import { useParams } from "react-router-dom";
import { MzToast} from "../../common/MzToast";

const StallScreen = (props) => {
  const {
    fetchStallList,
    initStall,
    fetchMarketList,
    isLoading,
    isPageLevelError,
    userRole,
    stallList,
    marketList,
  } = props;
  const { id } = useParams();
  useEffect(() => {
    fetchStallList(id);
    fetchMarketList();    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnReadRecord = (data) => {
    console.log(data);
  };

  const handleOnDeleteRecord = (data) => {
    // setSelectedStall(data);
    // setIsDeleteDialogVisible(true);
  };
  const handleOnEditRecord = (data) => {
    console.log(data);
    // history(`${ROUTE_PATH.COMPANY.EDIT.replace(":id", data?.id)}`);
  };

  const handleOnCreatedRecord = (data) => {
    console.log(data);
    // history(ROUTE_PATH.COMPANY.ADD);
  };

  const stallProps = {
    stallList,
    fetchStallList,
    isPageLevelError,
    isLoading,
    userRole,
    handleOnReadRecord,
    handleOnDeleteRecord,
    handleOnEditRecord,
    handleOnCreatedRecord,
    marketList,
  };

  const renderProgressBar = () => (
    <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
  );

  const getToastProps = () => {
    // if (isDeleteStallSuccess) {
    //   const toastTitle = "Company Delete Successfully";
    //   return {
    //     severity: TOAST_SEVERITY.SUCCESS,
    //     toastTitle,
    //     shouldShowToast: true,
    //   };
    // }

    // if (isDeleteStallError) {
    //   let toastTitle = error ? error : "Error while delete Company";
    //   return {
    //     severity: TOAST_SEVERITY.ERROR,
    //     toastTitle,
    //     shouldShowToast: true,
    //   };
    // }
  };
  return (
    <>
      {isLoading && renderProgressBar()}
      <MzToast {...getToastProps()} />
      <StallComponent stallProps={stallProps} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isPageLevelError: state.stallReducer.isPageLevelError,
  isLoading: state.stallReducer.isLoading,
  error: state.stallReducer.error,
  stallList: state.stallReducer.stallList,
  userRole: state.loginReducer.userRole,
  marketList: state.marketReducer.marketList,
});

const mapDispatchToProps = (dispatch) => ({
  initStall: () => dispatch(initStall()),
  fetchStallList: (payload) => dispatch(fetchStallList(payload)),
  fetchMarketList: () => dispatch(fetchMarketList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StallScreen);
