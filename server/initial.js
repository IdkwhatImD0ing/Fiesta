const createInitialState = (name, date, location, user) => {
  const obj = {
    name: name,
    date: date,
    location: location,
    registered: {},
    creator: user,
  };

  return obj;
};

module.exports = createInitialState;
