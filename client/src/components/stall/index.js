import React, { useMemo, useState } from "react";
import MzCalendar from "../../common/MzForm/MzCalendar";
import { Calendar } from "primereact/calendar";
import { FORM_FIELDS_NAME } from "./constant";
import { useForm } from "react-hook-form";
import { GREEN_STALL } from "../../assets/images";
import stallList from "./data.json";

const StallComponent = (props) => {
  const {
    fetchStallList,
    isPageLevelError,
    isLoading,
    userRole,
    handleOnReadRecord,
    handleOnDeleteRecord,
    handleOnEditRecord,
    handleOnCreatedRecord,
    formFieldValueMap,
  } = props.stallProps;
  const [date, setDate] = useState(null);
  const {
    control,
    formState: { errors },
    watch,
    handleSubmit,
    reset,
    setValue,
  } = useForm({
    defaultValues: useMemo(() => {
      return formFieldValueMap;
    }, [formFieldValueMap]),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  const dat = new Date();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="flex w-full bg-white flex-column align-items-center justify-content-center border-1 border-200 border-round mt-3 p-2 md:p-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-2 w-full px-4 md:mt-5"
        >
          {" "}
          <div className="flex justify-content-end">
            <MzCalendar
              control={control}
              name={FORM_FIELDS_NAME.B_DATE.name}
              label={FORM_FIELDS_NAME.B_DATE.label}
              placeholder={FORM_FIELDS_NAME.B_DATE.placeholder}
              rules={FORM_FIELDS_NAME.B_DATE.rules}
              isError={errors[FORM_FIELDS_NAME.B_DATE.name]}
              errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.B_DATE.name)}
              showButtonBar={true}
              minDate={dat}
              disabledDays={[0, 2, 3, 4, 5, 6]}
            />
          </div>
          <div className="card">
          <div className="market-layout p-grid">
           
            

            
              {stallList.map((stall, index) => (
                <div key={index} className="p-col-12 p-md-6 p-lg-4 p-xl-3">
                  <div className="p-card p-shadow-2">
                    <div className="p-card-header">
                    <div dangerouslySetInnerHTML={{ __html: GREEN_STALL }} />
                    </div>
                    <div className="p-card-body">
                      <h5>{stall.stallName}</h5>
                      <p>Stall No: {stall.stallNo}</p>
                      <p>Price Range: {stall.stallPrice}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </form>
      </div>
    </>
  );
};

export default StallComponent;
