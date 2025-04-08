'use server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import BASE_URL from '../utils/baseurl';
import sanitize from 'dompurify';

// used to prevent xss attacks
const sanitizeFormData = (formData: FormData) => {
    const sanitizedData: Record<string, any> = {};
    for (const [key, value] of formData.entries()) {
        const newkey = key.replace(/"/g, '');
        let sanitizedValue;
        if (newkey === 'description' || newkey === 'comment') {
            sanitizedValue = sanitize(value);
            continue;
        }
        if (newkey === 'completed' || newkey === 'active') {
            if (typeof value === 'string' && value === 'on') {
                sanitizedValue = true;
            } else {
                sanitizedValue = false;
            }
        }
        if (newkey === 'tags') {
            console.log('Tags: ' + value);
            sanitizedValue = value as string[];
        }
        sanitizedValue = value as string;
        sanitizedData[newkey] = sanitizedValue;
    }
    return sanitizedData;
}

// Below can be reduced to one function. need to pass API fetch destination as parameter.

// validate a new project
const ValidateProject = async (prevState: any, formData: FormData) => {
    // sanitize the form data
    const formDataEntries: Record<string, any> = sanitizeFormData(formData);

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
        const failErrors: object = whyfail.message.errors;
        return { message: failMessage, errors: failErrors,  isError: true };
    }
    // Get the JSON response
    await res.json();
    // Revalidate the cache
    revalidatePath('/project', 'layout');
    // Redirect to the home page
    redirect('/project');
};

// Validate a new group
const ValidateGroup = async (prevState: any, formData: FormData) => {
    
    // sanitize the form data
    const formDataEntries: Record<string, any> = sanitizeFormData(formData);
  
    // Validation passes now prep to save the group
    const reqInit: RequestInit = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataEntries),
    };
    // Call the API to save the group
    const res = await fetch(BASE_URL + '/api/group', reqInit);
    // Check if the response is ok
    if (!res.ok) {
        const whyfail = await res.json();
        const failMessage: string = whyfail.message.message;
        const failErrors: object = whyfail.message.errors;
        return { message: failMessage, errors: failErrors,  isError: true };
    }
    // Get the JSON response
    await res.json();
    // Revalidate the cache
    revalidatePath('/project', 'layout');
    // Redirect to the home page
    redirect('/project');

}

// Validate a new task
const ValidateTask = async (prevState: any, formData: FormData) => {
        // sanitize the form data
        const formDataEntries: Record<string, any> = sanitizeFormData(formData);
    // Validation passes now prep to save the group
    const reqInit: RequestInit = { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDataEntries),
    };
    // Call the API to save the task
    const res = await fetch(BASE_URL + '/api/task', reqInit);
    // Check if the response is ok
    if (!res.ok) {
        const whyfail = await res.json();
        const failMessage: string = whyfail.message.message;
        const failErrors: object = whyfail.message.errors;
        return { message: failMessage, errors: failErrors, isError: true };
    }
    // Get the JSON response
    await res.json();
    revalidatePath('/project', 'layout');
    redirect('/project');
}

export { ValidateGroup, ValidateTask, ValidateProject };