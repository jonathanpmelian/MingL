const prismaMock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  event: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
};

export default prismaMock;
