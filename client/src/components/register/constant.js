export const FORM_FIELDS_NAME = {
  FIRST_NAME: {
    name: "firstname",
    label: "First Name",
    type: "text",
    placeholder: "Enter your First Name",
    rules: {
      required: "First Name is required",
    },
  },

  LAST_NAME: {
    name: "lastname",
    label: "Last Name",
    type: "text",
    placeholder: "Enter your Last Name",
    rules: {
      required: "Last Name is required",
    },
  },
  PHONE_NUMBER: {
    name: "phone",
    label: "Mobile Number",
    type: "number",
    placeholder: "Enter your Mobile Number",
    rules: {
      required: "Mobile Number is required",
    },
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
      },
    },
  },

  TYPE: {
    name: "type",
    label: "Role",
    type: "text",
    placeholder: "Enter your Type",
    rules: {
      required: "Type is required",
    },
  },

  PRODUCER: {
    name: "producer",
    label: "Producer Type",
    type: "text",
    placeholder: "Enter Producer Type",
    rules: {
      required: "Producer is required",
    },
  },

  ADDRESS: {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your Address",
    rules: {
      required: "Address is required",
    },
  },
};
