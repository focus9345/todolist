'use server';
import { TaskType, DataTypes, TaskStatus, TaskPriority } from '../types/types';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import slugify from 'slugify';
import { today, getLocalTimeZone } from "@internationalized/date";
import BASE_URL from '../utils/baseurl';

// Text Input Validation
// Delete this function
const isInvalidText = (text: string | null | undefined): boolean => {
    if( typeof text === 'string') {
        return !text || text.length < 3 || text === null || text.trim().length === 0;
    } else {
        return true; // Return true for non-string values
    }
}

// validate a new project
const ValidateProject = async (prevState: any, formData: FormData) => {
    // This may be redundent but it is a good practice to sanitize the form data
    const formDataEntries: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
        const newkey = key.replace(/"/g, '');
        formDataEntries[newkey] = value;
    }
    // create a request Init object
    const reqInit: RequestInit = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataEntries),
    };
    // Call the API to save the project
    const res = await fetch(BASE_URL + '/api/project', reqInit);
    // Check if the response is ok
    if (!res.ok) {
        const whyfail = await res.json();
        const failMessage: string = whyfail.message.message;
        const failErrors: object = whyfail.message.errors
        return { message: failMessage, errors: failErrors,  isError: true };
    }
    // Get the JSON response
    await res.json();
    // Revalidate the cache
    revalidatePath('/', 'layout');
    // Redirect to the home page
    redirect('/');
};

// Validate a new group
const ValidateGroup = async (prevState: any, formData: FormData) => {
    
    const localDate = today(getLocalTimeZone()).toString(); // update this
    const title = formData.get('groupname') as string;
    const description = formData.get('description') as string;
    const group = {
        type: DataTypes.group as DataTypes.group,
        title: title as string,
        description: description as string,
        groupslug: slugify(title || '', { lower: true }) as string,
        completed: false as boolean,
        active: true as boolean,
        date: localDate as string,
        projectID: '' as string,
    }
    if (isInvalidText(group.title)) {
        return { message: 'Invalid Group Name!', isError: true };
    }
    if (isInvalidText(group.description)) {
        return { message: 'Invalid Group Description!', isError: true };
    }
    // Validation passes now prep to save the group
    const reqInit: RequestInit = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group),
    };
    // Call the API to save the group
    const res = await fetch(BASE_URL + '/api/group', reqInit);
    // Check if the response is ok
    if (!res.ok) {
        return { message: 'Failed to save group!', isError: true };
    }
    // Get the JSON response
    await res.json();
    revalidatePath('/', 'layout');
    redirect('/');

}

// Validate a new task
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
    //const subtasks = formData.get('subtasks') as unknown as Schema.Types.ObjectId[];
    //const dependencies = formData.get('dependencies') as unknown as Schema.Types.ObjectId[];
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
        //subtasks: [],
        //dependencies: [],
        project: project,
    }
    if (isInvalidText(task.title) || isInvalidText(task.description)) {
        return { message: 'Invalid Text, must be more than 3 characters!', isError: true
         };
    }
    // Validation passes now prep to save the task
    const reqInit: RequestInit = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    };
    // Call the API to save the task
    const res = await fetch(BASE_URL + '/api/task', reqInit);
    // Check if the response is ok
    if (!res.ok) {
        return { message: 'Failed to save task!', isError: true };
    }
    // Get the JSON response
    await res.json();
    revalidatePath('/', 'layout');
    redirect('/');
}

export { ValidateGroup, ValidateTask, ValidateProject };