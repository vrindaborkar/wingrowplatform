import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FORM_FIELDS_NAME } from "./constant";
import MzInput from "../../../common/MzForm/MzInput";
import { Button } from "primereact/button";
import { Link, useNavigate, useParams } from "react-router-dom";
import MzAutoComplete from "../../../common/MzForm/MzAutoComplete";

import { WINGROW_LOGO } from "../../../assets/images";
import { useTranslation } from "react-i18next";
import { ROUTE_PATH } from "../../../constant/urlConstant";

const AddInwardComponent = (props) => {
  const {
    createInwardRecord,
    formFieldValueMap,
    isLoading,
    isCreateInwardSuccess,
    isEditInwardSuccess,
    isInwardDetailSuccess,
    isPageLevelError,
    isEdit,
    handleFetchInwardRecord,
    commodity,
    marketData,
    initInward,
  } = props.addInwardProps;

  console.log(isInwardDetailSuccess);
  const {
    control,
    formState: { errors, isDirty },
    watch,
    setValue,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: useMemo(() => {
      // console.log("check value come or not", formFieldValueMap);
      return formFieldValueMap;
    }, [formFieldValueMap]),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const history = useNavigate();

  const { t } = useTranslation();

  const { id } = useParams();
  useEffect(() => {
    if (isCreateInwardSuccess || isEditInwardSuccess) {
      reset();
   setTimeout(()=>{
    initInward()
    history(ROUTE_PATH.FARMER.HOME)
   },2000)
    }
  }, [isCreateInwardSuccess]);

  useEffect(() => {
    if (isInwardDetailSuccess) {
      reset({
        ...formFieldValueMap,
      });
    }
  }, [isInwardDetailSuccess]);

  useEffect(() => {
    if (isEdit && id) {
      handleFetchInwardRecord(id);
      reset({
        ...formFieldValueMap,
      });
    } else {
      reset();
    }
    // eslint-disable-next-line
  }, [isEdit, id]);

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };

  const onSubmit = (data) => {
    const payload={

    }
    createInwardRecord(payload);
  };

  return (
    <div className="w-full">
      <div className="p-2 md:px-6 md:py-8 w-full  text-center md:flex align-items-cente justify-content-center relative">
        <Link
          to="/farmer"
          className="text-d-none absolute"
          style={{ left: "5%" }}
        >
          <Button
            className="p-button-rounded flex justify-content-start"
            icon="pi pi-angle-left mr-2"
          >
            {t("back")}
          </Button>
        </Link>
        <div className="flex mt-7 md:mt-0 w-full flex-column align-items-center justify-content-center ">
          <div
            style={{
              borderRadius: "56px",
              padding: "1rem",
              background:
                "linear-gradient(90deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)",
            }}
          >
            <div
              className="w-full text-center surface-card py-6 px-5 flex flex-column align-items-center"
              style={{ borderRadius: "53px" }}
            >
              <img
                src={WINGROW_LOGO}
                alt="Wingrow logo"
                className="mb-2 w-5rem flex-shrink-0"
              />
              <h1 className="text-900 font-bold text-xl md:text-3xl mb-2">
                {/* {t("welcome_message")} */}
                Wingrow Market Pune
              </h1>
              <div className="text-600 mb-2">Inward Data</div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-5 p-fluid w-full"
              >
                <div className="">
                  <MzAutoComplete
                    control={control}
                    name={FORM_FIELDS_NAME.MARKET.name}
                    label={FORM_FIELDS_NAME.MARKET.label}
                    optionLabel={FORM_FIELDS_NAME.MARKET.optionLabel}
                    optionValue={FORM_FIELDS_NAME.MARKET.optionValue}
                    placeholder={FORM_FIELDS_NAME.MARKET.placeholder}
                    rules={FORM_FIELDS_NAME.MARKET.rules}
                    isError={!!errors[FORM_FIELDS_NAME.MARKET.name]}
                    errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MARKET.name)}
                    suggestions={marketData ?? []}
                    dropdown
                  />
                </div>
                <div className="">
                  <MzAutoComplete
                    control={control}
                    name={FORM_FIELDS_NAME.COMMODITY.name}
                    label={t(FORM_FIELDS_NAME.COMMODITY.label)}
                    optionLabel={FORM_FIELDS_NAME.COMMODITY.optionLabel}
                    optionValue={FORM_FIELDS_NAME.COMMODITY.optionValue}
                    placeholder={FORM_FIELDS_NAME.COMMODITY.placeholder}
                    rules={FORM_FIELDS_NAME.COMMODITY.rules}
                    isError={!!errors[FORM_FIELDS_NAME.COMMODITY.name]}
                    errorMsg={getFormErrorMessage(
                      FORM_FIELDS_NAME.COMMODITY.name
                    )}
                    suggestions={commodity ?? []}
                    dropdown
                  />
                </div>

                <div className="">
                  <MzInput
                    control={control}
                    name={FORM_FIELDS_NAME.PURCHASE_QUANTITY.name}
                    label={FORM_FIELDS_NAME.PURCHASE_QUANTITY.label}
                    type={FORM_FIELDS_NAME.PURCHASE_QUANTITY.type}
                    placeholder={FORM_FIELDS_NAME.PURCHASE_QUANTITY.placeholder}
                    rules={FORM_FIELDS_NAME.PURCHASE_QUANTITY.rules}
                    isError={!!errors[FORM_FIELDS_NAME.PURCHASE_QUANTITY.name]}
                    errorMsg={getFormErrorMessage(
                      FORM_FIELDS_NAME.PURCHASE_QUANTITY.name
                    )}
                  />
                </div>

                <div className="">
                  <MzInput
                    control={control}
                    name={FORM_FIELDS_NAME.PURCHASE_RATE.name}
                    label={FORM_FIELDS_NAME.PURCHASE_RATE.label}
                    type={FORM_FIELDS_NAME.PURCHASE_RATE.type}
                    placeholder={FORM_FIELDS_NAME.PURCHASE_RATE.placeholder}
                    rules={FORM_FIELDS_NAME.PURCHASE_RATE.rules}
                    isError={!!errors[FORM_FIELDS_NAME.PURCHASE_RATE.name]}
                    errorMsg={getFormErrorMessage(
                      FORM_FIELDS_NAME.PURCHASE_RATE.name
                    )}
                  />
                </div>

                <Button
                  label="submit"
                  type="submit"
                  className="mt-3 border-round-sm"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInwardComponent;
