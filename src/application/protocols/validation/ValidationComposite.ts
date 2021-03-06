export abstract class ValidationComposite<T = unknown> {
    protected validations: ValidationComposite[] = [];

    abstract validate(args: T): void;

    add (...validations: ValidationComposite[]) {
      validations.forEach((validation) => {
        this.validations.push(validation)
      })
    }
}
