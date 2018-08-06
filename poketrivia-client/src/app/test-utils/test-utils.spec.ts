export function when(methodStub: any) {
  return (methodStub as jasmine.Spy).and;
}
