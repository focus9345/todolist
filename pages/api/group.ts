import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../libs/db';
import Group from '../../models/group';
import { GroupModelType } from '../../models/group';
//import slugify from 'slugify';

type ResponseData = {
    message?: string,
    data?: GroupModelType[],
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
                const { projectId } = req.query;
                const groups = await Group.find({ 'projectId': projectId });
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Group Found', data: groups }));
                break;
            } catch (error) {
                console.error(error);
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Group Failed to Get' }));
                break;
            }
        case 'POST':
            try {
                const newGroupModel: GroupModelType = new Group(req.body);
                // put a legit projectId here
                if (!newGroupModel.projectId) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ message: 'ProjectId is required' }));
                    break;
                }
                const group = await Group.create(newGroupModel);
                //console.log('Group Created: ' + JSON.stringify(group));
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Group Created', data: [group] }));
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
            res.end(JSON.stringify({ message: 'Error: Task Failed' }));
            break;
    }
}