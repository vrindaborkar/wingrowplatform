import React, { useMemo, useState } from "react";
import { BASKET_FRUIT, WINGROW_LOGO } from "../../assets/images";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import MzInput from "../../common/MzForm/MzInput";
import { FORM_FIELDS_NAME } from "./constant";
import { getBasicValidationRule } from "../../utils/form/from-util";
import MzDropDown from "../../common/MzForm/MzDropDown/WithFloatLabel";
import data from "./data.json";
import { Button } from "primereact/button";
import { Col, Container, Row } from "react-bootstrap";
import { sendVerificationCode } from "../../services/business/msg91Service";
import MzPhoneInput from "../../common/MzForm/MzPhoneInput";

const RegisterScreen = () => {
  const {
    control,
    // eslint-disable-next-line
    formState: { errors, isDirty },
    handleSubmit,
    trigger,
    getValues,
    setError,
    watch,
  } = useForm({
    defaultValues: useMemo(() => {
      return {
        [FORM_FIELDS_NAME.FIRST_NAME]: "",
        [FORM_FIELDS_NAME.LAST_NAME]: "",
        [FORM_FIELDS_NAME.MOBILE_NUMBER]: "",
        [FORM_FIELDS_NAME.ENTER_OTP]: "",
      };
    }, []),
  });

  const [selectedType, setSelectedType] = useState("");
  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFetchOtp = async () => {
    console.log("hello");
    const result = await trigger(FORM_FIELDS_NAME.MOBILE_NUMBER);
    if (result) {
      const payload = getValues(FORM_FIELDS_NAME.MOBILE_NUMBER);
      sendVerificationCode(payload);
    } else {
      setError(FORM_FIELDS_NAME.MOBILE_NUMBER, {
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

  const watchType = watch(FORM_FIELDS_NAME.TYPE);

  React.useEffect(() => {
    setSelectedType(watchType);
  }, [watchType]);
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
          <Col lg={6} className="flex justify-content-center">
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
                    {/* Welcome to Wingrow Market */}
                    {t("welcome_message")}
                  </h1>
                  <div className="text-600 mb-2">
                    {/* {t("register_here")} */}
                    Signup with us
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-5 p-fluid"
                  >
                    <Container fluid>
                      <Row className="g-3">
                        <Col sm={12}>
                          <MzInput
                            name={FORM_FIELDS_NAME.FIRST_NAME}
                            control={control}
                            label={"First Name"}
                            rules={
                              getBasicValidationRule().DEFAULT.VALIDATION_RULE
                            }
                            isError={errors[FORM_FIELDS_NAME.FIRST_NAME]}
                            errorMsg={getFormErrorMessage(
                              FORM_FIELDS_NAME.FIRST_NAME
                            )}
                            wrapperClass={"p-float-label"}
                          />
                        </Col>
                        <Col sm={12}>
                          <MzInput
                            name={FORM_FIELDS_NAME.LAST_NAME}
                            control={control}
                            label={"Last Name"}
                            rules={
                              getBasicValidationRule().DEFAULT.VALIDATION_RULE
                            }
                            isError={errors[FORM_FIELDS_NAME.LAST_NAME]}
                            errorMsg={getFormErrorMessage(
                              FORM_FIELDS_NAME.LAST_NAME
                            )}
                            wrapperClass={"p-float-label"}
                          />
                        </Col>
                        <Col sm={12}>
                          <div className="p-inputgroup flex-1 justify-content-center align-items-center ">
                            <div className="w-full ">
                              <MzPhoneInput
                                control={control}
                                name={FORM_FIELDS_NAME.MOBILE_NUMBER}
                                label={"Mobile Number"}
                                rules={
                                  getBasicValidationRule().DEFAULT
                                    .VALIDATION_RULE
                                }
                                isError={errors[FORM_FIELDS_NAME.MOBILE_NUMBER]}
                                errorMsg={getFormErrorMessage(
                                  FORM_FIELDS_NAME.MOBILE_NUMBER
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
                        <Col sm={12} >
                        <div className="p-inputgroup flex-1 justify-content-center align-items-center ">
                        <div className="w-full ">
                            <MzInput
                              name={FORM_FIELDS_NAME.ENTER_OTP}
                              control={control}
                              label={"Enter OTP"}
                              type={"number"}
                              rules={
                                getBasicValidationRule().DEFAULT.VALIDATION_RULE
                              }
                              isError={errors[FORM_FIELDS_NAME.ENTER_OTP]}
                              errorMsg={getFormErrorMessage(
                                FORM_FIELDS_NAME.ENTER_OTP
                              )}
                              wrapperClass={"p-float-label"}
                            />
                          </div>

                          <div>
                            <Button label="Submit"className="mt-3"/>
                          </div>
                          </div>
                        </Col>
                        <Col sm={12}>
                          <MzDropDown
                            name={FORM_FIELDS_NAME.TYPE}
                            control={control}
                            optionLabel={"name"}
                            optionValue={"name"}
                            options={data.type}
                            label={"Type"}
                            rules={
                              getBasicValidationRule().DEFAULT.VALIDATION_RULE
                            }
                            isError={errors[FORM_FIELDS_NAME.TYPE]}
                            errorMsg={getFormErrorMessage(
                              FORM_FIELDS_NAME.TYPE
                            )}
                            wrapperClass={"p-float-label"}
                            labelClassName={"ml-2"}
                          />
                        </Col>
                        {selectedType === "Farmer" && (
                          <Col sm={12}>
                            <MzDropDown
                              name={FORM_FIELDS_NAME.PRODUCT}
                              control={control}
                              optionLabel={"name"}
                              optionValue={"value"}
                              options={data.product}
                              label={"Product"}
                              rules={
                                getBasicValidationRule().DEFAULT.VALIDATION_RULE
                              }
                              isError={errors[FORM_FIELDS_NAME.PRODUCT]}
                              errorMsg={getFormErrorMessage(
                                FORM_FIELDS_NAME.PRODUCT
                              )}
                              wrapperClass={"p-float-label"}
                              // labelClassName={"ml-2"}
                            />
                          </Col>
                        )}

                        <Col sm={12}>
                          <MzInput
                            name={FORM_FIELDS_NAME.ADDRESS}
                            control={control}
                            label={"Address"}
                            rules={
                              getBasicValidationRule().DEFAULT.VALIDATION_RULE
                            }
                            isError={errors[FORM_FIELDS_NAME.ADDRESS]}
                            errorMsg={getFormErrorMessage(
                              FORM_FIELDS_NAME.ADDRESS
                            )}
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
                {/* <div className="lg:hidden block">
             <img src={BASKET_FRUIT} className="h-30rem" alt="basket_fruit" /></div>
                 */}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterScreen;
