module.exports = {
  id: (user) => user._id ? user._id.toString() : user.id,
  createdAt: (user) => user.createdAt
};