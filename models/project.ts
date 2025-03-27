import mongoose, { Schema } from "mongoose";
import { DataTypes } from "../types/types";
import slugify from 'slugify';

interface ProjectSchemaType {
    type: string;
    title: string;
    description?: string;
    projectslug: string;
    completed: boolean;
    active: boolean;
}

const projectSchema: Schema<ProjectSchemaType> = new mongoose.Schema<ProjectSchemaType>({
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
    projectslug: {
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
        this.projectslug = slugify(this.title, { lower: true, remove: /[^A-Za-z0-9\s]/g });
        next();
    });
    
    type ProjectType = typeof projectSchema;
    const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);
    
    export default Project;
    export type { ProjectType };