export enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED',
}

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    created_by: string;
    created_at: Date;
    updated_at: Date;
}