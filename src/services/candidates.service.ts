import { DestroyOptions, FindOptions, UpdateOptions } from 'sequelize';
import { CandidateRepository } from './repositories/interfaces/candidate';

export class CandidateService {
  constructor(private readonly candidateRepository: CandidateRepository) {}

  public async findOne(id: number): Promise<{}> {
    const options: FindOptions = {
      where: {
        id: id,
      },
    };
    const candidate = await this.candidateRepository.findOne(options);
    return candidate;
  }

  public async findAll(): Promise<Object> {
    const options: FindOptions = {};
    // Pending to implement a query that only returns the candidates that belong to this user
    const candidates = await this.candidateRepository.findAll(options);
    return candidates;
  }

  public async create(data: Object): Promise<Object> {
    const newCandidate = await this.candidateRepository.create(data);
    return newCandidate;
  }

  public async update(data: Object, options: UpdateOptions): Promise<Object> {
    const updatedCandidate = await this.candidateRepository.update(
      data,
      options
    );
    return updatedCandidate;
  }

  public async delete(options: DestroyOptions): Promise<void> {
    const deletedCandidate = await this.candidateRepository.delete(options);
    return deletedCandidate;
  }
}
