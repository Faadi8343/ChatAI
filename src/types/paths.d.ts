// Module declaration to help tools that don't resolve tsconfig path aliases
// This declares any import that starts with "@/" as `any` to avoid false-positive "cannot find module" diagnostics.
// It does not change runtime behavior.

declare module "@/*" {
  const value: unknown;
  export = value;
}
