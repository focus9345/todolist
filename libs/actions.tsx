'use server';
//import { redirect } from "next/navigation";
//import { revalidatePath } from "next/cache";
import { GroupType, TaskType } from '../types/types';
import { saveGroup } from '../api/groupdata';
import uniqueName from '../utils/uniqueName';
import { dateModifier } from '../utils/dates';
import slugify from 'slugify';


// Group Form Validation
const isInvalidText = (text: string | null | undefined): boolean => {
    console.log("isInvalidText: " + typeof(text) + ' : ' + text);
    if( typeof text === 'string') {
        return !text || text.length < 3 || text === null || text.trim().length === 0;
    } else {
        return true; // Return true for non-string values
    }
}

// Ceate a new group
const createGroup = async (prevState: string, formData: FormData) => {
    
    const { dateUTC } = dateModifier(new Date());
    const title = formData.get('groupname') as string;
    const group: GroupType = {
        id: uniqueName(4) as string,
        title: title as string,
        description: '' as string,
        group: slugify(title || '', { lower: true }) as string,
        completed: false as boolean,
        active: true as boolean,
        date: dateUTC() as string,
        project: '' as string,
        tasks: [] as TaskType[],
    }
    if (isInvalidText(group.title)) {
        return { message: 'Invalid Group!' };
    }

    console.log('Group: ' + JSON.stringify(group));
    // Validation passes now save the group
    await saveGroup(group);
    //revalidatePath('/menu', 'layout');
    //redirect('/menu');
}

export { createGroup };