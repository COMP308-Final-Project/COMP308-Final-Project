require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const Course = require("./models/course");
const Forms = require("./models/form");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

const CourseType = new GraphQLObjectType({
  name: "Course",
  description: "Represents a course avaliable at Centennial College",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    courseCode: { type: GraphQLNonNull(GraphQLString) },
    courseName: { type: GraphQLNonNull(GraphQLString) },
    section: { type: GraphQLNonNull(GraphQLString) },
    semester: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const FormType = new GraphQLObjectType({
  name: "Form",
  description: "This is the form Patients can submit",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    patientId: { type: GraphQLNonNull(GraphQLString) },
    bodyTemp: { type: GraphQLNonNull(GraphQLString) },
    heartRate: { type: GraphQLNonNull(GraphQLString) },
    bloodPress: { type: GraphQLNonNull(GraphQLString) },
    respRate: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    course: {
      type: CourseType,
      description: "A Single Course",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let course;
        course = await Course.findById(args._id);
        return course;
      },
    },
    courses: {
      type: new GraphQLList(CourseType),
      description: "List of All Courses",
      resolve: async () => {
        const courses = await Course.find();
        return courses;
      },
    },
    forms: {
      type: FormType,
      description: "A Single Form",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let form;
        form = await Form.findById(args._id);
        return form;
      },
    },
    courses: {
      type: new GraphQLList(FormType),
      description: "List of All Forms",
      resolve: async () => {
        const forms = await Form.find();
        return forms;
      },
    }

  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addCourse: {
      type: CourseType,
      description: "Add a Course",
      args: {
        courseCode: { type: GraphQLNonNull(GraphQLString) },
        courseName: { type: GraphQLNonNull(GraphQLString) },
        section: { type: GraphQLNonNull(GraphQLString) },
        semester: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const course = new Course({
          courseCode: args.courseCode,
          courseName: args.courseName,
          section: args.section,
          semester: args.semester,
        });
        const newCourse = await course.save();
        return newCourse;
      },
    },
    deleteCourse: {
      type: CourseType,
      description: "Delete a Course",
      args: {
        courseId: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        return Course.findByIdAndDelete(args.courseId);
      },
    },
    updateCourse: {
      type: CourseType,
      description: "Update an existing course",
      args: {
        _id: { type: GraphQLNonNull(GraphQLString) },
        courseCode: { type: GraphQLNonNull(GraphQLString) },
        courseName: { type: GraphQLNonNull(GraphQLString) },
        section: { type: GraphQLNonNull(GraphQLString) },
        semester: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const record = await Course.findById(args._id);
        record.courseCode = args.courseCode;
        record.courseName = args.courseName;
        record.section = args.section;
        record.semester = args.semester;
        const course = await record.save();
        return course;
      },
    },
    addForm: {
      type: FormType,
      description: "Add a Form",
      args: {
        patientId: { type: GraphQLNonNull(GraphQLString) },
        bodyTemp: { type: GraphQLNonNull(GraphQLString) },
        heartRate: { type: GraphQLNonNull(GraphQLString) },
        bloodPress: { type: GraphQLNonNull(GraphQLString) },
        respRate: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const form = new Course({
          patientId: args.patientId,
          bodyTemp: args.bodyTemp,
          heartRate: args.heartRate,
          bloodPress: args.bloodPress,
          respRate: args.respRate,
        });
        const newForm = await form.save();
        return newForm;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(
  "/courses",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3500, () => console.log("Server Started:"));
