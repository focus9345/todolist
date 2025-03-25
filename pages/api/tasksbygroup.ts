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
    switch (method) {
        case 'GET':
            try {
                const { groupID: id } = req.query;
                const tasks = await Task.find( { groupID : id } );
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Task Filtered by Group Found', data: tasks }));
                break;
            } catch (error) {
                console.error(error);
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Tasks by Group Failed' }));
                break;
            }      
        default:
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: Tasks by Group Failed'}));
                break;
    }
}