const createInitialState = (name, date, location, user, description) => {
  const obj = {
    name: name,
    date: date,
    location: location,
    registered: {[user.email]: user},
    creator: user,
    description: description,
  };
  return obj;
};

module.exports = createInitialState;
