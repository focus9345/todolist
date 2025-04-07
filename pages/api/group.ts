import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../libs/db';
import Group from '../../models/group';
import Project from '../../models/project';
import { GroupModelType } from '../../models/group';
import slugify from 'slugify';

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
                // look  into pre() mongoose to ensure this is done before save
                if (newGroupModel.slug == null) {
                                    console.log('Project Slug: ' + newGroupModel.slug);
                                    newGroupModel.slug = slugify(newGroupModel.title, { lower: true, remove: /[^A-Za-z0-9\s]/g });
                                }
                // put a legit projectId here
                const project = await Project.findOne().sort({ field: 'asc', _id: -1 }).limit(1);
                newGroupModel.projectId = project._id;
                // temp until Projects are chosen in form.
                const group = await Group.create(newGroupModel);
                //console.log('Group Created: ' + JSON.stringify(group));
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Group Created', data: [group] }));
                break;
            } catch (error) {
                //console.error(error);
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Group Failed to Post. ' + error }));
                break;
            }     
        default:
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: Group Failed'}));
                break;
    }
}