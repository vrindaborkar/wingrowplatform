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
    label: 'Message',
    type: 'text',
    placeholder: "What's Your Feedback",
    rules: {
      required: 'Your feedback is required',
      isRequired: true,
    },
  },
  RATING: {
    name: 'rating',
    label: 'Rating',
    type: 'number',
    placeholder: 'Rate us',
    rules: {
      required: 'Rating is required',
      min: 1,
      max: 5,
      isRequired: true,
    },
  },
}
