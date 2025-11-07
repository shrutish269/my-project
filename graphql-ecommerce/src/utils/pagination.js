const Buffer = require('buffer').Buffer;

function encodeCursor(id) {
  return Buffer.from(id.toString()).toString('base64');
}
function decodeCursor(cursor) {
  return Buffer.from(cursor, 'base64').toString('utf8');
}

function connectionFromMongoResults({ results, limit, offset, first, after }) {
  const edges = results.map(r => ({ node: r, cursor: encodeCursor(r._id) }));
  const pageInfo = {
    hasNextPage: results.length > (limit || first || results.length),
    hasPreviousPage: !!offset && offset > 0,
    startCursor: edges[0] ? edges[0].cursor : null,
    endCursor: edges[edges.length - 1] ? edges[edges.length - 1].cursor : null
  };
  return { edges, pageInfo, totalCount: results.length };
}

module.exports = { encodeCursor, decodeCursor, connectionFromMongoResults };
