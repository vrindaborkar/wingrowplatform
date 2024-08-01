export const FORM_FIELDS_NAME = {
  REMAINING_SALE: {
    name: "remainingSale",
    label: "Remaining Sale (Rs/Kg)",
    type: "number",
    placeholder: "Enter Remaining Sale",
    rules: {
      required: true,
      min:0,
      max: {
        value: 10000,
        message: "Remaining Sale cannot exceed 10000 Number",
      },
    },
  },

  SALE_RATE: {
    name: "saleRate",
    label: "Sale Rate (Rs/Kg)",
    type: "number",
    placeholder: "Enter Sale Rate",
    rules: {
      required: true,
      min: 0,
      maxLength: {
        value: 1000,
        message: "Sale Rate cannot exceed 1000 NUmber",
      },
    },
  },

  MARKET: {
    name: "market",
    label: "Market",
    type: "dropdown",
    optionLabel:"name",
    optionValue:"name",
    rules: {
      required: true,
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
    optionLabel:"label",
    optionValue:"label",
    rules: {
      required: true,
      },
    options: [
      { name: "Red", value: "#FF0000" },
      { name: "Green", value: "#00FF00" },
      { name: "Blue", value: "#0000FF" },
    ],
    placeholder: "Select Commodity",
  },
  
};



