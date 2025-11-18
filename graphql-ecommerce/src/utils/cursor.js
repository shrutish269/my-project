function encodeCursor(obj) {
  return Buffer.from(JSON.stringify(obj)).toString('base64');
}

function decodeCursor(cursor) {
  try {
    return JSON.parse(Buffer.from(cursor, 'base64').toString('utf8'));
  } catch (err) {
    return null;
  }
}

module.exports = { encodeCursor, decodeCursor };
