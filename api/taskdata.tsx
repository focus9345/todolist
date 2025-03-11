import { TaskType } from '../types/types';

const saveTask = async (task: TaskType): Promise<void> => {
 

    console.log('Task POST: ' + JSON.stringify(task));
    //await db.prepare('INSERT INTO groups (id, name, slug, date) VALUES (@id, @name, @slug, @date)').run(group);
}

export { saveTask };