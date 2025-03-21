import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../libs/db';
import Task from '../../models/task';
import { TaskType } from '../../types/types';

type ResponseData = {
    message?: string,
    data?: TaskType[],
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
                const groups = await Task.find({});
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Task Found', data: groups }));
                return res;
            } catch (error) {
                console.error(error);
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Task Failed to Get' }));
                return res;
            }  
        case 'POST':
            try {
                const newModel = new Task(req.body);
                const task = await Task.create(newModel);
                console.log('Task Created: ' + JSON.stringify(task));
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Task Created', data: [task] }));
                return res;
            } catch (error) {
                console.error(error);
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Task Failed to Post' }));
                return res;
            }     
        default:
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: Task Failed'}));
                return res;
    }
}