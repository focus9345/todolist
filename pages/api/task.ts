import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../libs/db';
import Task from '../../models/task';
//import Group from '../../models/group';
import { TaskModelType } from '../../models/task';

type ResponseData = {
    message?: string,
    data?: TaskModelType[],
} 

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    await dbConnect();
    const { method } = req;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache');
    switch (method) {
        case 'GET':
            try {
                const tasks = await Task.find({});
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Task Found', data: tasks }));
                break;
            } catch (err) {
                res.statusCode = 400;
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                res.end(JSON.stringify( {message: errorMessage}) || JSON.stringify({ message: 'Task Failed to Get' }));
                break;
            }  
        case 'POST':
            try {
                const newModel = new Task(req.body);
                console.log('New Task Group ID:', newModel.groupId);
                // put a legit groupId here
                // const group = await Group.findOne().sort({ field: 'asc', _id: 1 }).limit(1);
                // newModel.groupId = group._id;
                // temp until groups are chosen in form.
                const task = await Task.create(newModel);
                res.statusCode = 201;
                res.end(JSON.stringify({ message: `${task.title} Task Was Created`, data: [task] }));
                break;
            } catch (err) {
                res.statusCode = 400;
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                res.end(JSON.stringify({ message: errorMessage, errors: err }) || JSON.stringify({ message: 'Task Failed to Post' }));
                //res.end(JSON.stringify({ message: 'Task Failed to Post' }));
                break;
            }     
        default:
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: Task Failed'}));
                break;
    }
}