'use server';
//import { redirect } from "next/navigation";
//import { revalidatePath } from "next/cache";
import { GroupType, TaskType, DataTypes, TaskStatus, TaskPriority, SubtaskType } from '../types/types';
import { saveGroup } from '../api/groupdata';
import { saveTask } from '../api/taskdata';
import uniqueName from '../utils/uniqueName';
import slugify from 'slugify';
import { CalendarDate, parseDate, today, getLocalTimeZone } from "@internationalized/date";


// Text Input Validation
const isInvalidText = (text: string | null | undefined): boolean => {
    console.log("isInvalidText: " + typeof(text) + ' : ' + text);
    if( typeof text === 'string') {
        return !text || text.length < 3 || text === null || text.trim().length === 0;
    } else {
        return true; // Return true for non-string values
    }
}

// Ceate a new group
const createGroup = async (prevState: any, formData: FormData) => {
    
    const localDate = today(getLocalTimeZone()).toString(); // update this
    const title = formData.get('groupname') as string;
    const group: GroupType = {
        id: uniqueName(4) as string,
        type: DataTypes.group as DataTypes.group,
        title: title as string,
        description: '' as string,
        group: slugify(title || '', { lower: true }) as string,
        completed: false as boolean,
        active: true as boolean,
        date: localDate as string,
        project: '' as string,
        tasks: [] as TaskType[],
    }
    if (isInvalidText(group.title)) {
        return { message: 'Invalid Group!', isError: true };
    }

    console.log('Group: ' + JSON.stringify(group));
    // Validation passes now save the group
    await saveGroup(group);
    //revalidatePath('/menu', 'layout');
    //redirect('/menu');
}

// Ceate a new task
const createTask = async (prevState: any, formData: FormData) => {
    
    const localDate = today(getLocalTimeZone()).toString(); //update this
    // Get Form Data
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as TaskStatus;
    const deadline = formData.get('deadline') as string;
    //const deadline = deadlineValue ? parseDate(deadlineValue as string) : null;
    const priority = formData.get('priority') as TaskPriority;
    const assignee = formData.get('assignee') as string;
    const creator = formData.get('creator') as string;
    const tagsValue = formData.get('tags');
    const tags = tagsValue ? (tagsValue as string).split(',') : [];
    const group = formData.get('group') as string;
    const subtasks = formData.get('subtasks') as unknown as SubtaskType[];
    const dependencies = formData.get('dependencies') as unknown as TaskType[];
    const project = formData.get('project') as string;

    // Create a new task object
    const task: TaskType = {
        id: uniqueName(4),
        type: DataTypes.task,
        title: title,
        description: description,
        status: status,
        deadline: deadline,
        priority: priority,
        group: group,
        assignee: assignee,
        creator: creator,
        created: localDate,
        estimated: localDate,
        updated: localDate,
        tags: tags,
        subtasks: subtasks,
        dependencies: dependencies,
        project: project ,
    }
    if (isInvalidText(task.title) || isInvalidText(task.description)) {
        return { message: 'Invalid Text, must be more than 3 characters!', isError: true
         };
    }

    console.log('Task: ' + JSON.stringify(task));
    // Validation passes now save the group
    await saveTask(task);
    //revalidatePath('/menu', 'layout');
    //redirect('/menu');
}

export { createGroup, createTask };