'use server';
//import { redirect } from "next/navigation";
//import { revalidatePath } from "next/cache";


// Group Form Validation
const isInvalidText = (text: any): boolean => {
    console.log("isInvalidText: " + typeof(text) + ' : ' + text);
    if( typeof text === 'string') {
        return !text || text.length === 0 || text === null || text.trim().length === 0;
    } else {
        return true; // Return true for non-string values
    }
}

// Ceate a new group
const createGroup = async (prevState: any, formData: FormData) => {
    const group = {
        name: formData.get('groupname') as string,
    }
    if (
        isInvalidText(group.name)
    ) {
        return { message: 'Invalid input!' };
    }

    console.log('Group: ' + JSON.stringify(group));

    // Validation passes now save the group
    //await saveGroup(group);
    //revalidatePath('/menu', 'layout');
    //redirect('/menu');
}

export { createGroup };