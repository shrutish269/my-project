module.exports = {
  id: (category) => category._id ? category._id.toString() : category.id
};