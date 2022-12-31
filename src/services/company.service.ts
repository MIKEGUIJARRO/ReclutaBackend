import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { CompanyRepository } from './repositories/interfaces/company';

export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async findOne(id: number): Promise<{}> {
    const options: FindOptions = {
      where: {
        id: id,
      },
    };
    const company = await this.companyRepository.findOne(options);
    return company;
  }

  public async findAll(): Promise<Object[]> {
    const options: FindOptions = {};
    // Pending to implement a query that only returns the candidates that belong to this user
    const companies = await this.companyRepository.findAll(options);
    return companies;
  }

  public async create(data: Object): Promise<Object> {
    const newCompany = await this.companyRepository.create(data);
    return newCompany;
  }

  public async update(data: Object, options: UpdateOptions): Promise<Object> {
    const updatedCompany = await this.companyRepository.update(data, options);
    return updatedCompany;
  }

  public async delete(options: DestroyOptions): Promise<void> {
    const deletedCompany = await this.companyRepository.delete(options);
    return deletedCompany;
  }
}
