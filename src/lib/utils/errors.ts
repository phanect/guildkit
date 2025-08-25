export class RecruiterWithoutOrgError extends Error {
  constructor(...args: Parameters<ErrorConstructor>) {
    super(...args);
    this.name = "RecruiterWithoutOrgError";
  }
}
