const createInitialState = (name, date, location) => {
  const obj = {
    name: name,
    date: date,
    location: location,
    registered: {},
  };

  return obj;
};
