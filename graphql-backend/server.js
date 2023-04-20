require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const port = process.env.PORT || 2003;
const User = require("./models/user");
const Form = require("./models/form");

app.use(cors()); // Make sure you have express initialised before this.
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");
const { Query } = require("mongoose");

// Connect Database
connectDB();

const UserType = new GraphQLObjectType({
  name: "User",
  description: "Represents a user",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
    userType: { type: GraphQLNonNull(GraphQLString) },
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

const UserQuery = new GraphQLObjectType({
  name: "Query",
  description: "User Queries",
  fields: () => ({
    userById: {
      type: UserType,
      description: "Returns a single user by id",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let user = await User.findById(args._id);
        return user;
      },
    },
    userByEmail: {
      type: UserType,
      description: "Returns a single user by email",
      args: {
        email: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let user = await User.findOne({ email: args.email }).exec();
        return user;
      },
    },
  }),
});

const FormQuery = new GraphQLObjectType({
  name: "Query",
  description: "Form Queries",
  fields: () => ({
    userById: {
      type: FormType,
      description: "Returns the forms of a patient",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let forms = await Form.findById(args._id);
        return forms;
      },
    },
  }),
});

const UserMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "User Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      description: "Add a user",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
        userType: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const user = new User({
          name: args.name,
          email: args.email,
          password: args.password,
          userType: args.userType,
        });
        const newUser = await user.save();
        return newUser;
      },
    },
  }),
});

const FormMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Form Mutation",
  fields: () => ({
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

const userSchema = new GraphQLSchema({
  query: UserQuery, FormQuery,
  mutation: UserMutation,
});

app.use(express.json());
app.use(
  "/users",
  expressGraphQL({
    schema: userSchema,
    graphiql: true,
  })
);


app.listen(port, () => console.log(`Server Started: http://localhost:${port}`));
