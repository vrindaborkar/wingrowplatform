export const FORM_FIELDS_NAME = {
  B_DATE: {
    name: 'date',
    label: 'Date',
    type: 'date',
    placeholder: 'select_date',
    rules: {
      required: {
        value: true,
        message: 'Date is required',
      },
    },
  },
  MARKET: {
    name: 'market',
    label: 'select_market',
    type: 'dropdown',
    optionLabel: 'name',
    optionValue: 'name',
    rules: {
      required: {
        value: true,
        message: 'Market is required',
      },
    },
    options: [
      { name: 'Red', value: '#FF0000' },
      { name: 'Green', value: '#00FF00' },
      { name: 'Blue', value: '#0000FF' },
    ],
    placeholder: 'select_market',
  },
}
