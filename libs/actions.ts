"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import BASE_URL from '../utils/baseurl';
import xss from 'xss';
/* 
    * used to prevent xss attacks
    * 
    * @param formData - FormData object
    * @returns errors - object with errors
    * @returns message - string with message
    * @returns isError - boolean with error status
    */

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
        if (value == null) {
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
            sanitizedValue = xss(String(value));
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
    // remove any empty values from the object
    Object.keys(sanitizedData).forEach((key) => {
        if (sanitizedData[key] === '' || sanitizedData[key] === undefined) {
            delete sanitizedData[key];
        }
    });
    return sanitizedData;
}
const HandleSubmit = (prevState: any, formData: FormData) => {
    const type = formData.get('type');
    formData.delete('type');
    // sanitize the form data
    const formDataEntries: Record<string, any> = sanitizeFormData(formData);

    async function handler( formDataEntries: Record<string, any>) {
        // create a request Init object
        const reqInit: RequestInit = { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formDataEntries),
        };
        // Call the API to save the project
        const res = await fetch(BASE_URL + '/api/' + type, reqInit);
        // Check if the response is ok
        if (!res.ok) {
            const whyfail = await res.json();
            const failMessage: string = whyfail.message.message;
            const failErrors: object = whyfail.message.errors;
            return { message: failMessage, errors: failErrors,  isError: true };
        }
        // Get the JSON response
        const response = await res.json();
        const slug = response.slug ? response.slug : '';
        console.log('slug', slug);
        // Revalidate the cache
        revalidatePath(`/project/${slug}`, 'page');
        // Redirect to the project page
        redirect(`/project/${slug}`);
       
        
    }
    return handler(formDataEntries)

};


export default HandleSubmit;