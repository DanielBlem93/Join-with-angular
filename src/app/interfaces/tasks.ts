import { AssignContacts } from "./assign-contacts";

export interface Tasks {

    title: string,
    description: string,
    category: string,
    assigendTo: AssignContacts[],
    date: Date,
    priority: 'urgent' | 'medium' | 'low',
    subtasks: string[]
}
