const graphql = require('graphql');
const _ = require('lodash');
const Task = require('../models/task');
const Project = require('../models/project');


const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = graphql;

let TaskType;
let ProjectType;

TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        project: {
            type: ProjectType,
            resolve(parent, args) {
                return Project.findById(parent.projectId);
            }
        }
    })
});

ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        weight: { type: GraphQLInt },
        description: { type: GraphQLString },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({ projectId: parent.id });
            }
        }
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addProject: {
            type: ProjectType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const project = new Project({
                    title: args.title,
                    weight: args.weight,
                    description: args.description
                });
                return project.save();
            }
        },
        addTask: {
            type: TaskType,
            args: {
                title: { type: new GraphQLNonNull(GraphQLString) },
                weight: { type: new GraphQLNonNull(GraphQLInt) },
                description: { type: new GraphQLNonNull(GraphQLString) }            
            },
            resolve(parent, args) {
                const task = new Task({
                    title: args.title,
                    weight: args.weight,
                    description: args.description                
                });
                return task.save();
            }
        },
        removeProject: {
            type: TaskType,
            args: {
                
            }
        }
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Task.findById(args.id);
            }
        },

        project: {
            type: ProjectType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Project.findById(args.id);
            }
        }, 
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                return Task.find({});
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Project.find({});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
