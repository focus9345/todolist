
import { GroupType } from '../types/types';

const saveGroup = async (group: GroupType): Promise<void> => {
 

    console.log('Group POST: ' + JSON.stringify(group));
    //await db.prepare('INSERT INTO groups (id, name, slug, date) VALUES (@id, @name, @slug, @date)').run(group);
}

export { saveGroup };