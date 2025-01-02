export const FORM_FIELDS_NAME = {
  REMAINING_SALE: {
    name: 'remainingSale',
    label: 'remaining_sale_(Rs/Kg)',
    type: 'number',
    placeholder: 'enter_remaining_sale',
    rules: {
      required: {
        value: true,
        message: 'Remaining Sale is required.',
      },
      min: {
        value: 0,
        message: 'Remaining Sale cannot be less than 0.',
      },
      max: {
        value: 10000,
        message: 'Remaining Sale cannot exceed 10000.',
      },
    },
  },
  B_DATE: {
    name: 'date',
    label: 'date',
    type: 'date',
    placeholder: 'select_date',
    rules: {
      required: 'Date is required',
    },
  },
  SALE_RATE: {
    name: 'saleRate',
    label: 'sale_rate_(Rs/Kg)',
    type: 'number',
    placeholder: 'enter_sale_rate',
    rules: {
      required: {
        value: true,
        message: 'Sale Rate is required.',
      },
      min: {
        value: 0,
        message: 'Sale Rate cannot be less than 0.',
      },
      maxLength: {
        value: 1000,
        message: 'Sale Rate cannot exceed 1000.',
      },
    },
  },

  MARKET: {
    name: 'market',
    label: 'market',
    type: 'dropdown',
    optionLabel: 'name',
    optionValue: 'name',
    rules: {
      required: {
        value: true,
        message: 'Market selection is required.',
      },
    },
    options: [
      { name: 'Red', value: '#FF0000' },
      { name: 'Green', value: '#00FF00' },
      { name: 'Blue', value: '#0000FF' },
    ],
    placeholder: 'select_market',
  },

  COMMODITY: {
    name: 'commodity',
    label: 'commodity',
    type: 'dropdown',
    optionLabel: 'label',
    optionValue: 'label',
    rules: {
      required: {
        value: true,
        message: 'Commodity selection is required.',
      },
    },
    options: [
      { name: 'Red', value: '#FF0000' },
      { name: 'Green', value: '#00FF00' },
      { name: 'Blue', value: '#0000FF' },
    ],
    placeholder: 'select_one_commodity',
  },
}
