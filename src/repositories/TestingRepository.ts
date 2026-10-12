import Testing from '../models/Testing';

export default class TestingRepository {
  getAll() {
    return Testing.findAll({ raw: true });
  }

  getById(id: number) {
    return Testing.findByPk(id, { raw: true });
  }

  create(name: string) {
    return Testing.create({ name });
  }
}
