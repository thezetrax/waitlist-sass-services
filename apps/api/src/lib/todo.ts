/**
 * TODO is a function that throws a 'not implemented' error when called.
 */
const TODO = (message?: string): never => {
  if (message) throw new Error(`Not implemented: ${message}`);
  throw new Error("Not implemented");
};

export { TODO };
