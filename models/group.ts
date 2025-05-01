import mongoose, { Schema, InferSchemaType  } from "mongoose";
import { DataTypes } from "../types/types";
import slugify from 'slugify';
// import slugify from 'slugify';

interface IGroupSchema {
    _id: mongoose.Types.ObjectId,
    type: DataTypes.group;
    title: string;
    description?: string;
    slug?: string;
    completed?: boolean;
    active?: boolean;
    projectId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const groupSchema: Schema<IGroupSchema> = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        default: DataTypes.group,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title'],
        minlength: [3, 'Title must be at least 3 characters'],
        max_length: [50, 'Title cannot be more than 50 characters'],
        match: [/^[a-zA-Z0-9 ]+$/, 'Title must be alphanumeric'],
        unique: [true, 'Title must be unique'],
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
        slug: "title",
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
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: 'Project',
        required: true,
    },

}, { timestamps: true, autoIndex: true },);

// Add pre-save middleware to generate the slug
groupSchema.pre('save', function (next) {
    console.log('Pre-save hook triggered for Group model');
    if (!this.slug && this.title) {
        this.slug = slugify(this.title, { lower: true, remove: /[^A-Za-z0-9\s]/g });
    }
    next();
});
type GroupModelType = InferSchemaType<typeof groupSchema>;
const Group = mongoose.models.Group || mongoose.model("Group", groupSchema);

export default Group;
export type { GroupModelType };
