export const FORM_FIELDS_NAME = {
  PURCHASE_QUANTITY: {
    name: "purchaseQuantity",
    label: "Purchase Quantity (Rs/Kg)",
    type: "number",
    placeholder: "Enter Purchase Quantity",
    rules: {
      required: true,
      min:0,
      max: {
        value: 10000,
        message: "Purchase Quantity cannot exceed 10000 Number",
      },
    },
  },

  PURCHASE_RATE: {
    name: "purchaseRate",
    label: "Purchase Rate (Rs/Kg)",
    type: "number",
    placeholder: "Enter Purchase Rate",
    rules: {
      required: true,
      min: 0,
      maxLength: {
        value: 1000,
        message: "Purchase Rate cannot exceed 1000 Number",
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



