export default {
    Provider: jest.fn(({ children }) => children),
    Consumer: jest.fn(({ children }) => children()),
};
