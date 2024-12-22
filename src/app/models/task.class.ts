import { AssignContacts } from "../interfaces/assign-contacts"
import { Tasks } from "../interfaces/tasks"

export class Task {
    title: string
    description: string
    category: string
    categoryColor: string
    assigendTo: AssignContacts[]
    date: Date
    priority: 'urgent' | 'medium' | 'low';
    subtasks: Array<{ task: string, check: boolean }>;
    status: 'todo' | 'in-progress' | 'awaiting-feedback' | 'done'



    constructor(obj?: Tasks) {

        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.category = obj ? obj.category : '';
        this.assigendTo = obj ? obj.assigendTo : [];
        this.date = obj ? obj.date : new Date;
        this.priority = obj ? obj.priority : 'low';
        this.subtasks = obj ? obj.subtasks : [];
        this.status = obj ? obj.status : 'todo';
        this.categoryColor = obj ? obj.categoryColor : '';
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            category: this.category,
            categoryColor: this.categoryColor,
            assigendTo: this.assigendTo,
            date: this.date,
            priority: this.priority,
            subtasks: this.subtasks,
            status: this.status
        }
    }

}