//import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../libs/db';
import Group from '../models/group';

import { GroupType } from '../types/types';

type ResponseData = {
    success: boolean,
    message?: string,
    data?: GroupType[],
}


const GroupData = async (resolve, reject): Promise<ResponseData> => {
    await dbConnect();
    const { method } = resolve;
    //console.log('GroupData: ' + method);
    switch (method) {
        case 'GET':
            try {
                const groups = await Group.find({});
                if (groups) {
                    return { success: true, data: groups };
                }
            } catch (error) {
                console.error(error);
                return { success: false };
            }
            break;
        case 'POST':
            try {
                
                const newGroupModel = new Group(request.body);
                const group = await Group.create(newGroupModel);
                
                console.log('Group POST: ' + JSON.stringify(result));

                if (result) {
                    res?.json({ success: true, message:'Group Created', data: result });
                }

                //console.log('Do we have ID: ' + (newGroupModel._id instanceof mongoose.Types.ObjectId)); //true
                //const result = await newGroupModel.save();
                //console.log('Response: ' + JSON.stringify(res));
                //console.log('Group POST: ' + JSON.stringify(result));
                //res?.status(201).json({ success: true, data: Group });
            } catch (error) {
                console.error(error);
                reject = { success: false };
            }
            break;
        default:
            res?.status(400).json({ success: false });
            break;
    }
    return { success: false };
}

export default GroupData;

// const saveGroup = async (group: GroupType): Promise<void> => {
 
//     console.log('Group POST: ' + JSON.stringify(group));
//     //await db.prepare('INSERT INTO groups (id, name, slug, date) VALUES (@id, @name, @slug, @date)').run(group);
// }

// export { saveGroup };