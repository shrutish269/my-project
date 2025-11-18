const { GraphQLScalarType, Kind } = require('graphql');
const Decimal = require('decimal.js');
const GraphQLJSON = require('graphql-type-json');

const DateTime = new GraphQLScalarType({
  name: 'DateTime',
  description: 'ISO-8601 DateTime scalar',
  parseValue(value) { return new Date(value); },
  serialize(value) { return value instanceof Date ? value.toISOString() : new Date(value).toISOString(); },
  parseLiteral(ast) { if (ast.kind === Kind.STRING) return new Date(ast.value); return null; }
});

// Decimal not used in SDL directly but provided if needed
const DecimalScalar = new GraphQLScalarType({
  name: 'Decimal',
  description: 'Arbitrary precision decimal',
  parseValue(value) { return new Decimal(value); },
  serialize(value) { return value && value.toString ? value.toString() : String(value); },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT || ast.kind === Kind.FLOAT) return new Decimal(ast.value);
    return null;
  }
});

module.exports = { DateTime, Decimal: DecimalScalar, JSON: GraphQLJSON };