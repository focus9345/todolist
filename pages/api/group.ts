import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../libs/db';
import Group from '../../models/group';
import { GroupType } from '../../types/types';

type ResponseData = {
    message?: string,
    data?: GroupType[],
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
                const groups = await Group.find({});
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
                const newGroupModel = new Group(req.body);
                const group = await Group.create(newGroupModel);
                console.log('Group Created: ' + JSON.stringify(group));
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Group Created', data: [group] }));
                break;
            } catch (error) {
                console.error(error);
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Group Failed to Post' }));
                break;
            }     
        default:
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: Group Failed'}));
                break;
    }
}