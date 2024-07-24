export const FORM_FIELDS_NAME = {
  PHONE_NUMBER: {
    name: "phoneNumber",
    label: "Phone Number",
    type: "tel",
    placeholder: "Enter phone number",
    rules: {
      required: "Phone number is required",
    },
  },
  ROLE: {
    name: "Role",
    label: "role",
    type: "dropdown",
    optionLabel:"name",
    optionValue:"value",
    rules: {
      required: "Role is required",
    },
    options: [
      { name: "Farmer", value: "farmer" },
      { name: "Customer", value: "customer" },
    ],
    placeholder: "Select an role",
  },

  OTP: {
    name: "otp",
    label: "OTP",
    type: "number",
    placeholder: "Enter your OTP",
    rules: {
      required: "OTP is required",
      length: {
        value: 4,
        message: "OTP must be 4 characters",
      }
    },
  },
};
