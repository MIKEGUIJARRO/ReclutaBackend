// Hooks Helpers

import { Op } from 'sequelize';
import { ErrorResponse } from '../../common/errors/errorResponse';
import {
  CandidateStatus,
  CandidateStatusAttributes,
} from '../../models/candidateStatus';
import { Position } from '../../models/position';

export const validateDataValues = async (
  dataValues: CandidateStatusAttributes
): Promise<void> => {
  const promisePosition = Position.findOne({
    where: {
      id: dataValues.positionId,
      stages: { [Op.contains]: [dataValues.stage] },
    },
  });
  const promiseCandidateStatus = CandidateStatus.findOne({
    where: {
      positionId: dataValues.positionId,
      candidateId: dataValues.candidateId,
    },
  });

  const [responsePosition, responseCandidateStatus] = await Promise.all([
    promisePosition,
    promiseCandidateStatus,
  ]);

  if (!responsePosition) {
    throw new ErrorResponse('Invalid stage property', 400);
  }
  if (responseCandidateStatus) {
    throw new ErrorResponse('This candidate status already exists', 400);
  }
};

export const getIndexProperties = async (
  dataValues: CandidateStatusAttributes
): Promise<{ index: number }> => {
  const count = await CandidateStatus.count({
    where: {
      stage: dataValues.stage,
    },
  });
  return {
    index: count,
  };
};

export const updateGlobalIndexes = async (
  dataValues: CandidateStatusAttributes,
  prevDataValues: any
) => {
  if (prevDataValues.stage && dataValues.stage !== prevDataValues.stage) {
    // Moving in different row
    const response = await CandidateStatus.increment('index', {
      by: 1,
      where: {
        id: { [Op.not]: dataValues.id },
        stage: dataValues.stage,
        positionId: dataValues.positionId,
        index: { [Op.gte]: dataValues.index },
      },
    });
  } else if (dataValues.index !== prevDataValues.index) {
    // Moving in the same row
    if (dataValues.index > prevDataValues.index) {
      // Moving down
      const response = await CandidateStatus.decrement('index', {
        by: 1,
        where: {
          id: { [Op.not]: dataValues.id },
          stage: dataValues.stage,
          positionId: dataValues.positionId,
          index: { [Op.between]: [prevDataValues.index + 1, dataValues.index] },
        },
      });
    } else {
      // Moving up
      console.log('Moving up'.red);
      const response = await CandidateStatus.increment('index', {
        by: 1,
        where: {
          id: { [Op.not]: dataValues.id },
          stage: dataValues.stage,
          positionId: dataValues.positionId,
          index: { [Op.between]: [dataValues.index, prevDataValues.index - 1] },
        },
      });
    }
  }
};
