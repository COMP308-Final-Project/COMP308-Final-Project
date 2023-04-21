require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./config/db");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const port = process.env.PORT || 2003;
const User = require("./models/user");
const Form = require("./models/form");
const Covid = require("./models/covid");

app.use(cors()); // Make sure you have express initialised before this.

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLBoolean,
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

const CovidType = new GraphQLObjectType({
  name: "Covid",
  description: "A covid symptom form",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    patientId: { type: GraphQLNonNull(GraphQLString) },
    feverChills: { type: GraphQLNonNull(GraphQLString) },
    breathingDifficulty: { type: GraphQLNonNull(GraphQLString) },
    cough: { type: GraphQLNonNull(GraphQLString) },
    fatigue: { type: GraphQLNonNull(GraphQLString) },
    aches: { type: GraphQLNonNull(GraphQLString) },
    headaches: { type: GraphQLNonNull(GraphQLString) },
    tasteSmell: { type: GraphQLNonNull(GraphQLString) },
    soreThroat: { type: GraphQLNonNull(GraphQLString) },
    congestion: { type: GraphQLNonNull(GraphQLString) },
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

const CovidQuery = new GraphQLObjectType({
  name: "Query",
  description: "Covid form queries",
  fields: () => ({
    covidFormsById: {
      type: GraphQLList(CovidType),
      description: "Returns all covid forms by a patient",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let covidForms = await Covid.find({ patientId: args._id }).exec();
        return covidForms;
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

const CovidMutation = new GraphQLObjectType({
  name: "Mutation",
  description: "Covid form mutation",
  fields: () => ({
    addCovidForm: {
      type: CovidType,
      description: "Adding a covid form",
      args: {
        patientId: { type: GraphQLNonNull(GraphQLString) },
        feverChills: { type: GraphQLNonNull(GraphQLBoolean) },
        breathingDifficulty: { type: GraphQLNonNull(GraphQLBoolean) },
        cough: { type: GraphQLNonNull(GraphQLBoolean) },
        fatigue: { type: GraphQLNonNull(GraphQLBoolean) },
        aches: { type: GraphQLNonNull(GraphQLBoolean) },
        headaches: { type: GraphQLNonNull(GraphQLBoolean) },
        tasteSmell: { type: GraphQLNonNull(GraphQLBoolean) },
        soreThroat: { type: GraphQLNonNull(GraphQLBoolean) },
        congestion: { type: GraphQLNonNull(GraphQLBoolean) },
      },
      resolve: async (parent, args) => {
        const covidForm = new Covid({
          patientId: args.patientId,
          feverChills: args.feverChills,
          breathingDifficulty: args.breathingDifficulty,
          cough: args.cough,
          fatigue: args.fatigue,
          aches: args.aches,
          headaches: args.headaches,
          tasteSmell: args.tasteSmell,
          soreThroat: args.soreThroat,
          congestion: args.congestion,
        });
        const newCovidForm = await covidForm.save();
        return newCovidForm;
      },
    },
  }),
});

const userSchema = new GraphQLSchema({
  query: UserQuery,
  FormQuery,
  mutation: UserMutation, FormMutation,
});

const covidSchema = new GraphQLSchema({
  query: CovidQuery,
  mutation: CovidMutation,
});

app.use(express.json());
app.use(
  "/users",
  expressGraphQL({
    schema: userSchema,
    graphiql: true,
  })
);
app.use(
  "/covid",
  expressGraphQL({
    schema: covidSchema,
    graphiql: true,
  })
);

app.listen(port, () => console.log(`Server Started: http://localhost:${port}`));

module.exports = app;
