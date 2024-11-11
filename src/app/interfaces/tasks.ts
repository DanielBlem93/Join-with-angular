export interface Tasks {

    title:string,
    description:string,
    category:[],
    assigendTo:[],
    date:Date,
    priority: 'urgent' | 'medium' | 'low',
    subtasks:[]
}
