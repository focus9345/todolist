'use server';
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import BASE_URL from '../utils/baseurl';
import xss from 'xss';


// used to prevent xss attacks
const sanitizeFormData = (formData: FormData) => {
    const sanitizedData: Record<string, string | string[] | boolean> = {};
    const formValues = Object.fromEntries(formData);
    // Special case for tags because they are stored as an array
    const tags = formData.getAll('tags');

    //lets sanitize the form values
    for (const [key, value] of Object.entries(formValues)) {
        const newkey = key.replace(/"/g, '');
        
        let sanitizedValue;
        if ( Array.isArray(value) || key === 'tags') {
            continue;
        }
        if (typeof value === 'string' && value.trim() === '') {
            continue;
        }
        // convert the value to a boolean if the key is completed or active
        if (newkey === 'completed' || newkey === 'active') {
            if (typeof value === 'string' && value.trim() === 'on') {
                sanitizedValue = true;
            } else {
                sanitizedValue = false;
            }
            continue;
        } else {
            sanitizedValue = xss(String(sanitizedValue));
        }
        sanitizedData[key] = sanitizedValue ?? '';
    }
    // special case for tags because they are stored as an array
    if (tags.length > 0) {
        const sanitizedTags: string[] = [];
        for (const tag of tags) {
            if (typeof tag === 'string' && tag.trim() !== '') {
                const sanitizedTag = xss(tag);
                sanitizedTags.push(sanitizedTag);
            }
        }
        sanitizedData['tags'] = sanitizedTags;
    }

    console.log('Sanitized Data: ', sanitizedData);
    // remove any empty values from the object
    Object.keys(sanitizedData).forEach((key) => {
        if (sanitizedData[key] === '' || sanitizedData[key] === undefined) {
            delete sanitizedData[key];
        }
    });
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
    console.log('Tags: ' + formData.get('tags'));
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