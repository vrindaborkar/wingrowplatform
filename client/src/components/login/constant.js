export const FORM_FIELDS_NAME = {
  PHONE_NUMBER: {
    name: 'phoneNumber',
    label: 'signin.form.label.phonenumber',
    type: 'tel',
    placeholder: 'Enter phone nu',
    rules: {
      required: 'signin.error.phone_required',
    },
  },
  ROLE: {
    name: 'Role',
    label: 'signin.form.label.role',
    type: 'dropdown',
    optionLabel: 'name',
    optionValue: 'value',
    rules: {
      required: 'signin.error.role_required',
    },
    options: [
      { name: 'Farmer', value: 'producer' },
      { name: 'Customer', value: 'customer' },
    ],
    placeholder: 'signin.form.placeholder.selectrole',
  },

  OTP: {
    name: 'otp',
    label: 'OTPFORM.otp',
    type: 'number',
    placeholder: 'Enter your OTP',
    rules: {
      required:  'OTPFORM.otpRequired',
      length: {
        value: 4,
        message: 'OTP must be 4 characters',
      },
    },
  },
}
