function getProjectionFromInfo(info) {
  // simple recursive traversal to collect top-level fields requested
  const fields = {};
  const fieldNodes = info.fieldNodes || info.fieldASTs;
  if (!fieldNodes) return null;

  function collect(selection) {
    if (!selection.selectionSet) return;
    for (const sel of selection.selectionSet.selections) {
      if (sel.kind === 'Field') {
        fields[sel.name.value] = 1;
      } else if (sel.kind === 'InlineFragment' || sel.kind === 'FragmentSpread') {
        // skip fragments for brevity (could be expanded)
      }
    }
  }

  for (const node of fieldNodes) {
    collect(node);
  }

  return fields;
}

module.exports = { getProjectionFromInfo };
