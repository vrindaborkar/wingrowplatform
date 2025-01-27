export const FORM_FIELDS_NAME = {
  CUSTOMER: {
    name: 'customer',
    label: 'Customer',
    type: 'text',
    placeholder: 'Enter Your Name',
    rules: {
      required: 'Your name is required',
      isRequired: true,
    },
  },
  MESSAGE: {
    name: 'message',
    label: 'message',
    type: 'text',
    placeholder: 'feedback_placeholder',
    rules: {
      required: 'feedback_is_required',
      isRequired: true,
    },
  },
  RATING: {
    name: 'rating',
    label: 'rating',
    type: 'number',
    placeholder: 'Rate us',
    rules: {
      required: 'rating_is_required',
      min: 1,
      max: 5,
      isRequired: true,
    },
  },
}
