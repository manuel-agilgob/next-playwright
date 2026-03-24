import { Expedient } from '../expedient.interface';

export function buildExpedient( overrides?: Partial<Expedient>): Expedient {
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