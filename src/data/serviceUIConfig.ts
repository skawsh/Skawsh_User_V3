
export const getServiceUIConfig = () => {
  const deliveryMessages = {
    standard: "Delivery in just 36 sunlight hours after pickup",
    express: "Delivery in just 12 sunlight hours after pickup"
  };

  const backgroundColors = {
    standard: "bg-[#D5E7FF]",
    express: "bg-orange-50"
  };

  return {
    deliveryMessages,
    backgroundColors
  };
};
