export const FORM_FIELDS_NAME = {
  REMAINING_SALE: {
    name: "remainingSale",
    label: "Remaining Sale (Rs/Kg)",
    type: "number",
    placeholder: "Enter Remaining Sale",
    rules: {
      required: {
        value: true,
        message: "Remaining Sale is required."
      },
      min: {
        value: 0,
        message: "Remaining Sale cannot be less than 0."
      },
      max: {
        value: 10000,
        message: "Remaining Sale cannot exceed 10000."
      },
    },
  },

  SALE_RATE: {
    name: "saleRate",
    label: "Sale Rate (Rs/Kg)",
    type: "number",
    placeholder: "Enter Sale Rate",
    rules: {
      required: {
        value: true,
        message: "Sale Rate is required."
      },
      min: {
        value: 0,
        message: "Sale Rate cannot be less than 0."
      },
      maxLength: {
        value: 1000,
        message: "Sale Rate cannot exceed 1000."
      },
    },
  },

  MARKET: {
    name: "market",
    label: "Market",
    type: "dropdown",
    optionLabel: "name",
    optionValue: "name",
    rules: {
      required: {
        value: true,
        message: "Market selection is required."
      },
    },
    options: [
      { name: "Red", value: "#FF0000" },
      { name: "Green", value: "#00FF00" },
      { name: "Blue", value: "#0000FF" },
    ],
    placeholder: "Select Market",
  },

  COMMODITY: {
    name: "commodity",
    label: "Commodity",
    type: "dropdown",
    optionLabel: "label",
    optionValue: "label",
    rules: {
      required: {
        value: true,
        message: "Commodity selection is required."
      },
    },
    options: [
      { name: "Red", value: "#FF0000" },
      { name: "Green", value: "#00FF00" },
      { name: "Blue", value: "#0000FF" },
    ],
    placeholder: "Select Commodity",
  },
};
