import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../libs/db';
import Project, { ProjectModelType } from '../../models/project';
import slugify from 'slugify';

type ResponseData = {
    message?: string,
    data?: ProjectModelType[],
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
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                res.end(JSON.stringify({ message: errorMessage }) || JSON.stringify({ message: 'Error: Project Failed'}));
                break;
            }  
        case 'POST':
            try {
                const newProjectModel = await new Project(req.body);
                console.log('New Project Model: ' + JSON.stringify(newProjectModel));
                if (newProjectModel.slug == null && newProjectModel.title != null) {
                    
                    //newProjectModel.slug = slugify(newProjectModel.title, { lower: true, remove: /[^A-Za-z0-9\s]/g });
                    console.log('Project Slug: ' + newProjectModel.slug);
                   
                }
                const project = await Project.create(newProjectModel);
                console.log('Project Created: ' + project.title);
                res.statusCode = 201;
                res.end(JSON.stringify({ message: 'Project Created', data: [project] }));
                break;
            } catch (err) {
                //console.log(err);
                console.error('Project Error: ' + err);
                res.statusCode = 400;
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                res.end(JSON.stringify({ message: errorMessage }) || JSON.stringify({ message: 'Error: Project Failed'}));
                break;
            }     
        default:
                res.statusCode = 400;
                res.end(JSON.stringify({ message: 'Error: Project Failed'}));
                break;
    }
}