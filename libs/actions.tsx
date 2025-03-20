'use server';
//import { redirect } from "next/navigation";
//import { revalidatePath } from "next/cache";
import { TaskType, DataTypes, TaskStatus, TaskPriority, SubtaskType } from '../types/types';
import GroupData from '../db/groupdata';
import TaskData from './taskdata';
import slugify from 'slugify';
import { today, getLocalTimeZone } from "@internationalized/date";
import { NextApiRequest, NextApiResponse } from 'next';


// Text Input Validation
const isInvalidText = (text: string | null | undefined): boolean => {
    if( typeof text === 'string') {
        return !text || text.length < 3 || text === null || text.trim().length === 0;
    } else {
        return true; // Return true for non-string values
    }
}
// Create a new group
// async function createGroup(groupData: GroupType): Promise<GroupType> {
//     const newGroup = await new GroupModel(groupData);
//     return newGroup.save();
// };

// Validate a new group
const ValidateGroup = async (prevState: any, formData: FormData) => {
    
    const localDate = today(getLocalTimeZone()).toString(); // update this
    const title = formData.get('groupname') as string;
    const description = formData.get('description') as string;
    const group = {
        //id: uniqueName(4) as string,
        type: DataTypes.group as DataTypes.group,
        title: title as string,
        description: description as string,
        group: slugify(title || '', { lower: true }) as string,
        completed: false as boolean,
        active: true as boolean,
        date: localDate as string,
        project: '' as string,
        tasks: [] as TaskType[],
    }
    if (isInvalidText(group.title)) {
        return { message: 'Invalid Group Name!', isError: true };
    }
    if (isInvalidText(group.description)) {
        return { message: 'Invalid Group Description!', isError: true };
    }

    // console.log('Group: ' + JSON.stringify(group));
    // Validation passes now save the group
    // await createGroup(group);
    // const newGroupModel = new GroupModel(group);
    // console.log('Do we have ID: ' + (newGroupModel._id instanceof mongoose.Types.ObjectId)); //true

    const reqInit: RequestInit = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group),
    };
  
    const res = await fetch('/api/groups', reqInit);
    //const response = await GroupData(req, res);
    console.log('Response: ' + JSON.stringify(res));
    return { message: 'Great!!', isError: false };
    //await saveGroup(group);
    //revalidatePath('/menu', 'layout');
    //redirect('/menu');
}

// Ceate a new task
const ValidateTask = async (prevState: any, formData: FormData) => {
    
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
    const subtasks = formData.get('subtasks') as unknown as SubtaskType[];
    const dependencies = formData.get('dependencies') as unknown as TaskType[];
    const project = formData.get('project') as string;

    // Create a new task object
    const task: Partial<TaskType> = {
        //id: uniqueName(4),
        type: DataTypes.task,
        title: title,
        description: description,
        status: status,
        deadline: deadline,
        priority: priority,
        assignee: assignee,
        creator: creator,
        estimated: localDate,
        tags: tags,
        subtasks: subtasks,
        dependencies: dependencies,
        project: project,
    }
    if (isInvalidText(task.title) || isInvalidText(task.description)) {
        return { message: 'Invalid Text, must be more than 3 characters!', isError: true
         };
    }
    console.log('Task: ' + JSON.stringify(task));
    // Validation passes now save the group
    const req: NextApiRequest = { 
        method: 'POST',
        body: task,
    };
    await TaskData(req, res || null);

    return { message: 'Success!', isError: false };

    
    //await saveTask(task);
    //revalidatePath('/menu', 'layout');
    //redirect('/menu');
}

export { ValidateGroup, ValidateTask };