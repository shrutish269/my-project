// Safe projection: always include required fields for resolvers
const REQUIRED_FIELDS = ["name", "slug", "price", "currency", "inStock", "quantity", "createdAt", "categoryId"];

function buildProjection(info) {
  if (!info || !info.fieldNodes || !info.fieldNodes.length) return null;
  const fields = {};
  const node = info.fieldNodes[0];
  const selections = node.selectionSet ? node.selectionSet.selections : [];
  selections.forEach(sel => {
    if (sel.kind === "Field" && sel.name && sel.name.value) {
      const name = sel.name.value;
      if (name !== "__typename") fields[name] = 1;
    }
  });
  REQUIRED_FIELDS.forEach(f => fields[f] = 1);
  fields._id = 1;
  return fields;
}

module.exports = { buildProjection };
