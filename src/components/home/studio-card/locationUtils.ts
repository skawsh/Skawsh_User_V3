
export const getLocationName = (studioName: string): string => {
  const locationMap: Record<string, string> = {
    'Busy Bee': 'Manikonda',
    'U clean': 'Madhapur',
    'Tumble Dry': 'Gachibowli',
    'Fabrico': 'Hitech City',
    'Eco Clean': 'Kondapur',
    'Mycloth': 'Jubilee Hills'
  };
  
  return locationMap[studioName] || 'Hyderabad';
};
