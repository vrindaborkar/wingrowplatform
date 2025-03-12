export const getBasicValidationRule = () => {
  return {
    DEFAULT: {
      DO_NOT_VALIDATE: {},
      VALIDATION_RULE: { required: true },
      VALIDATION_RULE_MESSAGE: { required: 'This is required filed' },
    },
  }
}
