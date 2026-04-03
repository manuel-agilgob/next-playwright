import { randomInt } from 'node:crypto';
import { IExpedient } from '@contracts/IExpedient.interface';

import * as expedientData from '@contracts/IExpedient.interface'

export function buildExpedient( overrides?: Partial<IExpedient>): IExpedient {
    return {
        expedientNumber: '5/2026',
        matter :  expedientData.matterTypes[randomInt(0, expedientData.matterTypes.length)],
        legalWay : expedientData.legalWayTypes[randomInt(0, expedientData.legalWayTypes.length)],
        kindExpedient : expedientData.kindExpedientTypes[randomInt(0, expedientData.kindExpedientTypes.length)],
        kindJudgement : expedientData.kindJudgementTypes[randomInt(0, expedientData.kindJudgementTypes.length)],
        mainAction : expedientData.mainActionTypes[randomInt(0, expedientData.mainActionTypes.length)],
        ...overrides
    };
} 