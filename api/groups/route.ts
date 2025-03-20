import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../libs/db';
import Group from '../../models/group';
import { GroupType } from '../../types/types';

type ResponseData = {
    success: boolean,
    message?: string,
    data?: GroupType[],
} 

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>  
) {
    await dbConnect();
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                const groups = await Group.find({});
                res.status(200).json({ success: true, data: groups });
            } catch (error) {
                console.error(error);
                res.status(400).json({ success: false, message: 'Error: failed to get any groups -' + error });
            }
            break;
        case 'POST':
            try {
                const newGroupModel = new Group(req.body);
                const group = await Group.create(newGroupModel);
                res.status(201).json({ success: true, message:'Group Created', data: group });
            } catch (error) {
                console.error(error);
                res.status(400).json({ success: false, message: 'Error: failed to create group -' + error });
            }
            break;
        default:
            res?.status(400).json({ success: false });
            break;
    }
    return { success: false };
}