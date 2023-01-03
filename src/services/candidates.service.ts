import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { CandidateRepository } from './repositories/interfaces/candidate';

export class CandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  public async findOne(id: number, companyId: number): Promise<{}> {
    const options: FindOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
    };
    const candidate = await this.candidateRepository.findOne(options);
    return candidate;
  }

  public async findAll(companyId: number): Promise<Object> {
    const options: FindOptions = { where: { companyId: companyId } };
    const candidates = await this.candidateRepository.findAll(options);
    return candidates;
  }

  public async create(data: Object): Promise<Object> {
    const newCandidate = await this.candidateRepository.create(data);
    return newCandidate;
  }

  public async update(
    data: Object,
    id: number,
    companyId: number
  ): Promise<Object> {
    const options: UpdateOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
    };
    const updatedCandidate = await this.candidateRepository.update(
      data,
      options
    );
    return updatedCandidate;
  }

  public async delete(id: number, companyId: number): Promise<void> {
    const options: DestroyOptions = {
      where: { id: id, companyId: companyId },
    };
    const deletedCandidate = await this.candidateRepository.delete(options);
    return deletedCandidate;
  }
}
