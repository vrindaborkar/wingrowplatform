import React from "react";
import { Rating } from "primereact/rating";
import { useRef } from "react";
import { Button } from "primereact/button";
import MzInput from "../../../common/MzForm/MzInput";
import MzTextarea from "../../../common/MzForm/MzTextArea";
import { useForm } from "react-hook-form";

import { FORM_FIELDS_NAME } from "./constant";
import { WINGROW_SLIDE_THREE } from "../../../assets/images";

import { baseUrl } from "../../../services/PostAPI";
import { API_PATH } from "../../../constant/urlConstant";
import axios from 'axios';
import { Toast } from "primereact/toast"; 
export default function FeedbackComponent() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
    watch,
  } = useForm({
    defaultValues: {
      [FORM_FIELDS_NAME.RATING.name]: 0, 
    },
  });
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user?.id
  const toast = useRef(null);
  const onSubmit = async (data) => {
    console.log(data);
    const payload={
      userId:userId,
      message: data.message,  
      stars: data.rating, 
    }
    console.log(payload)
    try {
      const response = await axios.post(`${baseUrl}${API_PATH.FEEDBACK.POST}`, payload);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Feedback submitted successfully!",
        life: 3000, 
      });
      reset({
        [FORM_FIELDS_NAME.CUSTOMER.name]: "",
        [FORM_FIELDS_NAME.MESSAGE.name]: "",
        [FORM_FIELDS_NAME.RATING.name]: 0, 
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to submit feedback. Please try again.",
        life: 3000,
      });
      console.error("Error submitting feedback:", error);
    }
  };


  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <span className="p-error">{errors[name].message}</span>
    );
  };

  const handleRatingChange = (event) => {
    console.log(event);
    setValue(FORM_FIELDS_NAME.RATING.name, event?.value);
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="md:p-4 px-2 mb-2">
        <div className="flex align-items-center">
          <h2 className="mr-2 text-xl md:text-3xl">Feedback</h2>
          <hr className="flex-1 p-2" />
        </div>
        <div className="md:flex gap-2 justify-content-between">
          <div className="w-full overflow-hidden hidden md:block">   <img
          src={WINGROW_SLIDE_THREE}
          alt="WINGROW_SLIDE_THREE"
          className="md:ml-auto block h-full w-full"
          style={{ clipPath: "polygon(0 0%, 100% 0%, 90% 100%, 0% 100%)" }}
        /></div>
          <div className="w-full p-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-2 md:mt-5 p-fluid w-full"
            >
              <div className="field">
                <MzTextarea
                  control={control}
                  label={FORM_FIELDS_NAME.MESSAGE.label}
                  name={FORM_FIELDS_NAME.MESSAGE.name}
                  placeholder={FORM_FIELDS_NAME.MESSAGE.placeholder}
                  rules={FORM_FIELDS_NAME.MESSAGE.rules}
                  isError={errors[FORM_FIELDS_NAME.MESSAGE.name]}
                  rows={3}
                  errorMsg={getFormErrorMessage(FORM_FIELDS_NAME.MESSAGE.name)}
                />
              </div>
              <div className="field text-left">
                <label htmlFor={FORM_FIELDS_NAME.RATING.name}>
                  {FORM_FIELDS_NAME.RATING.label}
                  {FORM_FIELDS_NAME.RATING.rules.isRequired && (
                    <span style={{ color: "red" }}> *</span>
                  )}
                </label>
                <Rating
                  name={FORM_FIELDS_NAME.RATING.name}
                  count={5}
                  value={watch(FORM_FIELDS_NAME.RATING.name)}
                  onChange={handleRatingChange}
                  size={24}
                  activeColor="3"
                />
                {getFormErrorMessage(FORM_FIELDS_NAME.RATING.name)}
              </div>
              <div className="flex justify-content-between gap-2 w-full">
                <div className="mb-3 w-full">
                  <Button
                    label="Submit"
                    type="submit"
                    className="mt-3 border-round-sm"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
