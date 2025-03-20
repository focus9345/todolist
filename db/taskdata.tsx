import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from './db';
import Task from '../models/task';


const TaskData = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    await dbConnect();
    const { method } = req;
    switch (method) {
        case 'GET':
            try {
                const tasks = await Task.find({});
                res.status(200).json({ success: true, data: tasks });
            } catch (error) {
                console.error(error);
                //res.status(400).json({ success: false });
            }
            break;
        case 'POST':
            try {
                const newTaskModel = new Task(req.body);
                //console.log('Do we have ID: ' + (newTaskModel._id instanceof mongoose.Types.ObjectId)); //true
                const result = await newTaskModel.save();
                console.log('Task POST: ' + JSON.stringify(result));
                res.status(201).json({ success: true, data: Task });
                //res.status(201).json({ success: true, data: Task });
            } catch (error) {
                console.error(error);
                //res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
            break;
    }
}




export default TaskData;
// const saveTask = async (task: TaskType): Promise<void> => {
//     console.log('Task POST: ' + JSON.stringify(task));
//     //await db.prepare('INSERT INTO groups (id, name, slug, date) VALUES (@id, @name, @slug, @date)').run(group);
// }
// export { saveTask };