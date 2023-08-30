export const useNumberFormatter = () => {
  const formatter = new Intl.NumberFormat("en-US");

  const formatNumber = (value) => {
    if (!value) {
      return value;
    }

    return formatter.format(value);
  };

  const revertNumberFormat = (value) => {
    if (!value) {
      return value;
    }

    return Number(value.replace(/,/g, ""));
  };

  return {
    formatNumber,
    revertNumberFormat
  };
};
