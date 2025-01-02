export const FORM_FIELDS_NAME = {
  PURCHASE_QUANTITY: {
    name: 'purchaseQuantity',
    label: 'purchase_quantity_(Rs/Kg)',
    type: 'number',
    placeholder: 'enter_purchase_quantity',
    rules: {
      required: {
        value: true,
        message: 'Purchase Quantity is required',
      },
      min: {
        value: 0,
        message: 'Purchase Quantity must be at least 0',
      },
      max: {
        value: 10000,
        message: 'Purchase Quantity cannot exceed 10000',
      },
    },
  },

  PURCHASE_RATE: {
    name: 'purchaseRate',
    label: 'purchase_rate_(Rs/Kg)',
    type: 'number',
    placeholder: 'enter_purchase_rate',
    rules: {
      required: {
        value: true,
        message: 'Purchase Rate is required',
      },
      min: {
        value: 0,
        message: 'Purchase Rate must be at least 0',
      },
      maxLength: {
        value: 1000,
        message: 'Purchase Rate cannot exceed 1000',
      },
    },
  },
  B_DATE: {
    name: 'date',
    label: 'Date',
    type: 'date',
    placeholder: 'select_date',
    rules: {
      required: 'Date is required',
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

  COMMODITY: {
    name: 'commodity',
    label: 'commodity',
    type: 'dropdown',
    optionLabel: 'label',
    optionValue: 'label',
    rules: {
      required: {
        value: true,
        message: 'Commodity is required',
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
