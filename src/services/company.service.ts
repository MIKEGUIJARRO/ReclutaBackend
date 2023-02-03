import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { CompanyRepository } from './repositories/interfaces/company';
import { CompanyAttributes } from '../models/company';

export class CompanyService {
  constructor(private readonly companyRepository: CompanyRepository) {}

  public async findOne(
    id: number,
    userId: number
  ): Promise<CompanyAttributes | null> {
    const options: FindOptions = {
      where: {
        id: id,
        partnerId: userId,
      },
    };
    const company = await this.companyRepository.findOne(options);
    return company;
  }

  public async findAll(userId: number): Promise<CompanyAttributes[]> {
    const options: FindOptions = {
      where: {
        partnerId: userId,
      },
    };
    const companies = await this.companyRepository.findAll(options);
    return companies;
  }

  public async create(data: CompanyAttributes): Promise<CompanyAttributes> {
    const newCompany = await this.companyRepository.create(data);
    return newCompany;
  }

  public async update(
    data: Object,
    id: number,
    userId: number
  ): Promise<CompanyAttributes[]> {
    const options: UpdateOptions = {
      where: {
        id: id,
        partnerId: userId,
      },
    };
    const updatedCompany = await this.companyRepository.update(data, options);
    return updatedCompany;
  }

  public async delete(id: number, userId: number): Promise<void> {
    const options: DestroyOptions = {
      where: { id: id, partnerId: userId },
    };
    const deletedCompany = await this.companyRepository.delete(options);
    return deletedCompany;
  }
}
