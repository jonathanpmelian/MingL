const prismaMock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  event: {
    create: jest.fn(),
  },
};

export default prismaMock;
