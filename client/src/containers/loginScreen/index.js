import React, { useMemo } from "react";
import { BASKET_FRUIT, WINGROW_LOGO } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import MzInput from "../../common/MzForm/MzInput";
import { FORM_FIELDS_NAME } from "./constant";
import { getBasicValidationRule } from "../../utils/form/from-util";
import MzDropDown from "../../common/MzForm/MzDropDown/WithFloatLabel";
import data from "./data.json";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "primereact/button";

import {
  MSG91_AUTH_KEY,
  TEMPLATE_ID_LOGIN,
  TEMPLATE_ID_VERIFICATION,
} from "../../constant/msg91";
import MzAutoComplete from "../../common/MzForm/MzAutoComplete";
import MzPhoneInput from "../../common/MzForm/MzPhoneInput";
import { InputText } from "primereact/inputtext";
import {
  login,
  sendVerificationCode,
  userVerify,
  verifyCode,
} from "../../redux/action/auth";

const LoginScreen = () => {
  const {
    control,
    // eslint-disable-next-line
    formState: { errors, isDirty },
    handleSubmit,
    getValues,
    trigger,
    setError,
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        type: "",
        mobile: "",
        otp: "",
      };
    }, []),
  });

  const isLoggedIn = useSelector((state) => state.authReducer?.isLoggedIn);

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    if(isLoggedIn){
      const payload = {
        otp: data.otp,
        mobile: `+${getValues(FORM_FIELDS_NAME.MOBILE)}`,
        authkey: MSG91_AUTH_KEY,
      };
      dispatch(verifyCode(payload));
    }
  };

  const handleFetchOtp = async () => {
    const result = await trigger(FORM_FIELDS_NAME.MOBILE);
    if (result) {
      const payload = {
        phone: `+${getValues(FORM_FIELDS_NAME.MOBILE)}`,
        role: getValues(FORM_FIELDS_NAME.TYPE),
      };
      dispatch(login(payload));
      if(isLoggedIn){
        const payload = {
          mobile: `+${getValues(FORM_FIELDS_NAME.MOBILE)}`,
          template_id: TEMPLATE_ID_LOGIN,
          authkey: MSG91_AUTH_KEY,
        };
        dispatch(sendVerificationCode(payload))
      }
    }

   else {
      setError(FORM_FIELDS_NAME.MOBILE, {
        type: "manual",
        message: "Mobile number is required",
      });
    }
  };

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    );
  };
  return (
    <div className="surface-0 md:px-8 mt-3 w-full flex justify-content-center md:align-items-center">
      <Container fluid className="mt-3 mb-3">
        <Row className="g-3">
          <Col
            lg={6}
            className=" flex justify-content-center align-items-center "
          >
            <div className="hidden lg:block">
              <img src={BASKET_FRUIT} className="h-30rem" alt="basket_fruit" />
            </div>
          </Col>
          <Col lg={5} className="flex justify-content-center">
            <div className="flex flex-column align-items-center justify-content-center p-2">
              <div
                style={{
                  borderRadius: "56px",
                  padding: "0.3rem",
                  background:
                    "linear-gradient(180deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)",
                }}
              >
                <div
                  className="w-full text-center surface-card py-5 px-5 sm:px-8 flex flex-column align-items-center"
                  style={{ borderRadius: "53px" }}
                >
                  <img
                    src={WINGROW_LOGO}
                    alt="Wingrow logo"
                    className="mb-2 w-6rem flex-shrink-0"
                  />

                  <h1 className="text-900 font-bold text-xl md:text-3xl mb-2">
                    {t("welcome_message")}
                  </h1>
                  <div className="text-600 mb-2">Login here</div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-5 p-fluid"
                  >
                    <Container fluid>
                      <Row className="g-3">
                        {
                          <>
                            <Col sm={12}>
                              <MzAutoComplete
                                control={control}
                                name={FORM_FIELDS_NAME.TYPE}
                                label={"Type"}
                                optionLabel={"label"}
                                optionValue={"name"}
                                placeholder={"Select user role"}
                                isError={!!errors[FORM_FIELDS_NAME.TYPE]}
                                errorMsg={getFormErrorMessage(
                                  FORM_FIELDS_NAME.TYPE
                                )}
                                rules={
                                  getBasicValidationRule().DEFAULT
                                    .VALIDATION_RULE
                                }
                                suggestions={data.type}
                                dropdown
                              />
                            </Col>
                            <Col sm={12}>
                              <div className="p-inputgroup flex-1 justify-content-center align-items-center ">
                                <div className="w-full ">
                                  <MzPhoneInput
                                    control={control}
                                    name={FORM_FIELDS_NAME.MOBILE}
                                    label={"Mobile Number"}
                                    rules={
                                      getBasicValidationRule().DEFAULT
                                        .VALIDATION_RULE
                                    }
                                    isError={errors[FORM_FIELDS_NAME.MOBILE]}
                                    errorMsg={getFormErrorMessage(
                                      FORM_FIELDS_NAME.MOBILE
                                    )}
                                    country="in"
                                  />
                                </div>

                                <div>
                                  <Button
                                    // icon="pi pi-search"
                                    label="fetch"
                                    onClick={() => handleFetchOtp()}
                                    className="mt-3"
                                  />
                                </div>
                              </div>
                            </Col>
                          </>
                        }
                        <Col sm={12}>
                          <MzInput
                            name={FORM_FIELDS_NAME.OTP}
                            control={control}
                            label={"OTP"}
                            rules={
                              getBasicValidationRule().DEFAULT.VALIDATION_RULE
                            }
                            isError={errors[FORM_FIELDS_NAME.OTP]}
                            errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.OTP)}
                            wrapperClass={"p-float-label"}
                          />
                        </Col>
                      </Row>
                    </Container>
                    <Button
                      type="submit"
                      label="submit"
                      raised
                      className="w-50"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginScreen;
