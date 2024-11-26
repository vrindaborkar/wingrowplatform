export const FORM_FIELDS_NAME={
    B_DATE: {
        name: "date",
        label: "Date",
        type: "date",
        placeholder: "Enter your Date",
        rules: {
          required: "Date is required",
        },
      },
      MARKET: {
        name: "market",
        label: "Select Market",
        type: "dropdown",
        optionLabel: "name",
        optionValue: "name",
        rules: {
          required: {
            value: true,
            message: "Market is required",
          },
        },
        options: [
          { name: "Red", value: "#FF0000" },
          { name: "Green", value: "#00FF00" },
          { name: "Blue", value: "#0000FF" },
        ],
        placeholder: "Select Market",
      },
}