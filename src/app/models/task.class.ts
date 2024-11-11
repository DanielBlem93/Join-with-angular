import { Tasks } from "../interfaces/tasks"

export class Task {
    title: string
    description: string
    category: []
    assigendTo: []
    date: Date
    priority: 'urgent' | 'medium' | 'low';
    subtasks: []



    constructor(obj?: Tasks) {

        this.title = obj ? obj.title : '';
        this.description = obj ? obj.description : '';
        this.category = obj ? obj.category : [];
        this.assigendTo = obj ? obj.assigendTo : [];
        this.date = obj ? obj.date : new Date;
        this.priority = obj ? obj.priority : 'low';
        this.subtasks = obj ? obj.subtasks : [];
    }

    public toJSON() {
        return {
            title: this.title,
            description: this.description,
            category: this.category,
            assigendTo: this.assigendTo,
            date: this.date,
            priority: this.priority,
            subtasks: this.subtasks
        }
    }

}