import React, { useMemo } from "react";
import { BASKET_FRUIT, WINGROW_LOGO } from "../../assets/images";
import { t } from "i18next";
import { useForm } from "react-hook-form";
import MzInput from "../../common/MzForm/MzInput";
import { FORM_FIELDS_NAME } from "./constant";
import { getBasicValidationRule } from "../../utils/form/from-util";
import MzDropDown from "../../common/MzForm/MzDropDown/WithFloatLabel";
import data from "./data.json";
import { Col, Container, Row } from "react-bootstrap";
import { Button } from "primereact/button";
import { sendVerificationCode } from "../../services/business/msg91Service";
import { MSG91_AUTH_KEY, TEMPLATE_ID_VERIFICATION } from "../../constant/msg91";


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
        name: "",
        email: "",
        address: "",
      };
    }, []),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFetchOtp = async () => {
    const result = await trigger(FORM_FIELDS_NAME.MOBILE);
    if (result) {
      // dispatch( loginSuccess())
      const payload = {
        mobile: `+91${getValues(FORM_FIELDS_NAME.MOBILE)}`,
        template_id:TEMPLATE_ID_VERIFICATION,
        authkey:MSG91_AUTH_KEY
       }
      sendVerificationCode(payload);
    } else {
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
                    Login here
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-5 p-fluid"
                  >
                    <Container fluid>
                      <Row className="g-3">
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
                        <Col sm={12} className="flex justify-content-end">
                          <div className="w-full">
                            <MzInput
                              name={FORM_FIELDS_NAME.MOBILE}
                              control={control}
                              label={"Mobile Number"}
                              type={"number"}
                              rules={
                                getBasicValidationRule().DEFAULT.VALIDATION_RULE
                              }
                              isError={errors[FORM_FIELDS_NAME.MOBILE]}
                              errorMsg={getFormErrorMessage(
                                FORM_FIELDS_NAME.MOBILE
                              )}
                              wrapperClass={"p-float-label"}
                            />
                          </div>

                          <div>
                            <Button
                              label="Fetch"
                              onClick={() => handleFetchOtp()}
                              className=""
                            />
                          </div>
                        </Col>
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

    // <div className="surface-0 p-8  w-full flex justify-content-center md:align-items-center">
    //   <div className="grid  md:border-1 border-green-500 w-full text-center ">
    //     <div className="col-12 md:col-6 flex justify-content-center mb-3">
    //       <img src={WINGROW_LOGO} className="winagro-logo" alt="winagro-logo" />
    //     </div>
    //     <div className="col-12 md:col-6 flex justify-content-center mb-3">
    //       <div>
    //         <img
    //           src={WINGROW_LOGO}
    //           className="winagro-logo"
    //           alt="winagro-logo"
    //         />
    //         <div className="font-bold md:text-xl mb-3">
    //           <span>{t("welcome_message")}</span>
    //         </div>
    //         <div className="font-bold md:text-lg">
    //           <span>{t("login_here")}</span>
    //         </div>
    //         <div className="py-3 gap-3">
    //           <form onSubmit={handleSubmit(onSubmit)}>
    //             <MzInput
    //               name={FORM_FIELDS_NAME.MOBILE}
    //               control={control}
    //               label={"Mobile"}
    //               rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
    //               isError={errors[FORM_FIELDS_NAME.MOBILE]}
    //               errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MOBILE)}
    //               wrapperClass={"p-float-label"}
    //             />
    //             <MzDropDown
    //               name={FORM_FIELDS_NAME.ROLE}
    //               control={control}
    //               optionLabel={"name"}
    //               optionValue={"name"}
    //               options={data.role}
    //               label={"Role"}
    //               rules={getBasicValidationRule().DEFAULT.VALIDATION_RULE}
    //               isError={errors[FORM_FIELDS_NAME.ROLE]}
    //               errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.ROLE)}
    //               wrapperClass={"p-float-label"}
    //               labelClassName={"ml-2"}
    //             />
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default LoginScreen;
