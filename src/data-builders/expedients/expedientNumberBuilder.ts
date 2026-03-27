import { IExpedient } from '../../contracts/IExpedient.interface';

export function buildExpedient( overrides?: Partial<IExpedient>): IExpedient {
    return {
        expedientNumber: '5/2026',
        matter : 'Familiar',
        legalWay : 'Acto Prejudicial',
        kindExpedient : 'PRINCIPAL',
        kindJudgement : 'Alimentos',
        mainAction : 'ABANDONO',
        ...overrides
    };
} 