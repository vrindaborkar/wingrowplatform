import { Button } from "primereact/button";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import ErrorPage from "../../../common/Error";

const MyBookingComponent = (props) => {
  const {
    stallBookList,
    isPageLevelError,
    isLoading,
    userRole,
    user,
    handleOnDeleteRecord,
  } = props.stallProps;

  const [myStalls, setMyStalls] = useState([]);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLocation = (payload) => {
    window.open(payload, "_blank");
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date
      .toLocaleDateString("en-GB", options)
      .replace(/ /g, "/")
      .toUpperCase();
  };

  const isBookingExpired = (dateStr) => {
    const today = new Date();
    const bookingDate = new Date(dateStr);
    return bookingDate < today;
  };

  useEffect(() => {
    // user = getCurrentUser();

    if (Array.isArray(stallBookList) && user?.id) {
      const userId = user.id;
      const filteredData = stallBookList.filter((e) => e.bookedBy === userId);
      const sortedData = filteredData.sort(
        (a, b) => new Date(b.bookedAt) - new Date(a.bookedAt)
      );
      setMyStalls(sortedData);
    }
  }, [user, stallBookList]);

  const shouldRenderFullPageError = () => isPageLevelError;
  const shouldRenderStallBookList = () => myStalls?.length > 0;
  const shouldRenderNotFoundView = () =>
    !isPageLevelError && !isLoading && myStalls.length === 0;

  return (
    <>
      {shouldRenderFullPageError() && (
        <div>
          <ErrorPage />
        </div>
      )}
      {shouldRenderNotFoundView() && (
        <div className="text-center w-full mt-3 md:px-5">
          <h3>{t("no booking found")}</h3>
        </div>
      )}
      {shouldRenderStallBookList() && (
        <div className="text-center w-full mt-3 md:px-5">
          <div className="px-3">
            <Link to="/farmer" className="text-d-none">
              <Button
                className="p-button-rounded flex justify-content-start"
                icon="pi pi-angle-left mr-2"
              >
                {t("back")}
              </Button>
            </Link>
            <h2 className="mt-3">My Booking</h2>
          </div>
          <div className="grid grid-nogutter w-full md:px-5 ">
            {myStalls?.map((stall, index) => {
              const formattedDate = formatDate(stall.bookedAt);
              //   const buttonLabel = isBookingExpired(stall.bookedAt) ? 'Expired' : 'Upcoming';

              return (
                <div
                  key={index}
                  className="col-12 md:col-6 lg:col-4 xl:col-3 mb-4"
                >
                  <div className="p-3 h-full">
                    <div
                      className="shadow-2 p-3 h-full flex flex-column"
                      style={{ borderRadius: "6px" }}
                    >
                      <div className="text-900 font-medium text-xl mb-2">
                        {stall.location}
                      </div>
                      <div className="text-600">{stall.stallName}</div>
                      <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                      <div className="flex px-2 align-items-center justify-content-between">
                        <span className="font-medium text-red-700">
                          {stall.stallNo}
                        </span>
                        <span className="font-bold text-2xl text-900">
                          {formattedDate}
                        </span>
                      </div>
                      <hr className="my-3 mx-0 border-top-1 border-bottom-none border-300" />
                      <ul className="list-none p-0 m-0 flex-grow-1">
                        <li className="flex align-items-center mb-3">
                          <i className="pi pi-check-circle text-green-500 mr-2"></i>
                          <span>
                            {stall.isBooked
                              ? "Booking Confirm"
                              : "Booking Cancelled"}
                          </span>
                        </li>
                        <li className="flex align-items-center mb-3">
                          <i className="pi pi-map-marker text-green-500 mr-2"></i>
                          <span className="text-left">{stall.address}</span>
                        </li>
                      </ul>
                      <hr className="mb-3 mx-0 border-top-1 border-bottom-none border-300 mt-auto" />
                      <Button
                        label={
                          isBookingExpired(stall.bookedAt)
                            ? "Expired"
                            : "Cancel"
                        }
                        disabled={isBookingExpired(stall.bookedAt)}
                        onClick={() => {
                          handleOnDeleteRecord(stall);
                        }}
                        className="p-3 w-full mt-auto"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <div />
          </div>
        </div>
      )}
    </>
  );
};

export default MyBookingComponent;
