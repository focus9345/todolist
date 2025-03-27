import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../libs/db';
import Project, { ProjectType } from '../../models/project';
import slugify from 'slugify';

type ResponseData = {
    message?: string,
    data?: ProjectType[],
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
                const project = await Project.find({});
                res.statusCode = 200;
                res.end(JSON.stringify({ message: 'Project Found', data: project }));
                break;
            } catch (err) {
                //console.error('Project Error: ' + err);
                res.statusCode = 400;
                res.end(JSON.stringify({ message: (err as any)}) || JSON.stringify({ message: 'Error: Project Failed'}));
                break;
            }  
        case 'POST':
            try {
                const newProjectModel = await new Project(req.body);
                if (newProjectModel.projectslug == null) {
                    console.log('Project Slug: ' + newProjectModel.projectslug);
                    newProjectModel.projectslug = slugify(newProjectModel.title, { lower: true, remove: /[^A-Za-z0-9\s]/g });
                }
                const project = await Project.create(newProjectModel as ProjectType);
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Project Created', data: [project] }));
                break;
            } catch (err) {
                //console.log(err);
                res.statusCode = 400;
                res.end(JSON.stringify({ message: (err as any)}) || JSON.stringify({ message: 'Error: Project Failed'}));
                break;
            }     
        default:
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: Group Failed'}));
                break;
    }
}