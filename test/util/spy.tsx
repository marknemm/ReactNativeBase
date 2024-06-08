/**
 * Spies on a component.
 *
 * @param module The path of the module containing the component to spy on.
 * @returns The spy component.
 */
export function spyComponent(module: string) {
  jest.mock(module, () => ({
    __esModule: true,
    default: jest.fn((props) => {
      const ActualComponent = jest.requireActual(module).default;
      console.log(props);
      return <ActualComponent {...props} />;
    }),
  }));
}
