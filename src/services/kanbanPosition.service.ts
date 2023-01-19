import { FindOptions } from 'sequelize';
import { Candidate, CandidateAttributes } from '../models/candidate';
import {
  CandidateStatus,
  CandidateStatusAttributes,
} from '../models/candidateStatus';
import { PositionAttributes } from '../models/position';
import { KanbanPositionRepository } from './repositories/interfaces/kanbanPosition';

interface CandidateStatusInclude extends CandidateStatusAttributes {
  Candidate: CandidateAttributes;
}

interface KanbanPosition extends PositionAttributes {
  CandidateStatuses: CandidateStatusInclude[];
}

export interface Item<T> {
  id: string;
  content: T;
}

export interface Column {
  id: string;
  title: string;
  itemIds: string[];
}

interface KanbanData<T> {
  items: {
    [key: string]: Item<T>;
  };
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}

interface ContentData {
  candidateStatusId: string;
  candidateId: string;
  firstName: string;
  positionId: string;
}

const createItemId = (id: number): string => {
  return 'Item-' + id;
};

export class KanbanPositionService {
  constructor(
    private readonly kanbanPositionRepository: KanbanPositionRepository
  ) {}

  public async findOne(id: number, companyId: number): Promise<Object> {
    const options: FindOptions = {
      where: {
        id: id,
        companyId: companyId,
      },
      include: [
        {
          model: CandidateStatus,
          order: [['index', 'ASC']],
          include: [
            {
              model: Candidate,
            },
          ],
        },
      ],
      order: [[{ model: CandidateStatus, as: 'CandidateStatuses' }, 'index']],
    };
    const position: KanbanPosition =
      await this.kanbanPositionRepository.findOne(options);

    const kanbanData: KanbanData<ContentData> = {
      columnOrder: position.stages,
      columns: {},
      items: {},
    };

    // Ordering and loading columns
    for (let i = 0; i < position.stages.length; i++) {
      kanbanData.columns[position.stages[i]] = {
        id: position.stages[i],
        title: position.stages[i],
        itemIds: position.CandidateStatuses.filter((candidateStatus) => {
          if (candidateStatus.stage === kanbanData.columnOrder[i]) {
            return true;
          }
          return false;
        }).map((candidateStatus) =>
          String(createItemId(candidateStatus.Candidate.id))
        ),
      };
    }

    for (let i = 0; i < position.CandidateStatuses.length; i++) {
      kanbanData.items[
        createItemId(position.CandidateStatuses[i].Candidate.id)
      ] = {
        id: String(createItemId(position.CandidateStatuses[i].Candidate.id)),
        content: {
          candidateId: String(position.CandidateStatuses[i].Candidate.id),
          candidateStatusId: String(position.CandidateStatuses[i].id),
          firstName: position.CandidateStatuses[i].Candidate.firstName,
          positionId: String(id),
        },
      };
    }

    return {
      id: position.id,
      title: position.title,
      description: position.description,
      kanbanData: kanbanData,
    };
  }
}
