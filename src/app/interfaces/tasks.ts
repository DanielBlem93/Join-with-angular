import { AssignContacts } from "./assign-contacts";

export interface Tasks {

    title: string,
    description: string,
    category: string,
    categoryColor: string,
    assigendTo: AssignContacts[],
    date: Date,
    priority: 'urgent' | 'medium' | 'low',
    subtasks: Array<{ task: string, check: boolean }>;
    status: 'todo' | 'in-progress' | 'awaiting-feedback' | 'done',
    docId: string
}
