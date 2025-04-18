"use server";
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
        // skip the keys that are not needed
        if ( Array.isArray(value) || key === 'tags') {
            continue;
        }
        if (value == null) {
            continue;
        }
        const sanitizedValue: string | string[] | boolean | undefined = xss(String(value));
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
            console.log('removing key', key, ' sanitizedData[key] ', sanitizedData[key]);
            delete sanitizedData[key];
        }
    });
    return sanitizedData;
}
const HandleSubmit = (prevState: any, formData: FormData) => {
    const type = formData.get('type');

    // remove the type from the form data

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
            return { message: failMessage, errors: failErrors, isError: true };
        }
        // Get the JSON response
        const response = await res.json();

        if (response.message) {
            return { message: response.message, errors: {}, isError: false };
        }

        // const slug = response.slug ? response.slug : '';
        // console.log('slug', slug);
        // // Revalidate the cache
        // revalidatePath(`/project/${slug}`, 'page');
        // // Redirect to the project page
        // redirect(`/project/${slug}`);
       
        
    }
    return handler(formDataEntries)

};


export default HandleSubmit;