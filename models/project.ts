import mongoose, { Schema, InferSchemaType } from "mongoose";
import { DataTypes } from "../types/types";
import slugify from 'slugify';
// move this to types...
interface IProjectSchema {
    _id: mongoose.Types.ObjectId,
    type: string;
    title: string;
    description?: string;
    slug: string;
    completed: boolean;
    active: boolean;
}

const projectSchema: Schema<IProjectSchema> = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: DataTypes.project,
        readonly: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        minlength: [3, 'Title must be at least 3 characters'],
        max_length: [50, 'Title cannot be more than 50 characters'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Title must be alphanumeric'],
        unique: true,
    },
    description: {
        type: String,
        required: false,
        minlength: [3, 'Description must be at least 3 characters'],
        max_length: [350, 'Description cannot be more than 350 characters'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Description must be alphanumeric'],
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    completed: {
        type: Boolean,
        required: true,
        set: (value: string | boolean) => {
            if (typeof value === 'string' && value === 'on') {
                return true;
            }
            return false;
        },
        default: false,
    },
    active: {
        type: Boolean,
        set: (value: string | boolean) => {
            if (typeof value === 'string' && value === 'on') {
                return true;
            }
            return false;
        },
        required: true,
    },

}, { timestamps: true, autoIndex: true });

    projectSchema.pre('save', function(next) {
        this.slug = slugify(this.title, { lower: true, remove: /[^A-Za-z0-9\s]/g });
        next();
    });
    
    type ProjectType = InferSchemaType<typeof projectSchema>;
    // Removed the undefined ExtractInterface type
    const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
    
    export default Project;
    export type { ProjectType };