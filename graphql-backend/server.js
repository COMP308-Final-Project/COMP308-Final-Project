require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const Nurse = require("./models/nurse");

app.use(cors()); // Make sure you have express initialised before this.
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// const PatientType = new GraphQLObjectType
// ({
//   name: 'Patient',
//   description: 'Represent Patient',
//   fields: () => ({
//     _id: { type: GraphQLNonNull(GraphQLString) },
//     fullName: { type: GraphQLNonNull(GraphQLString)  },
//     userName: { type: GraphQLNonNull(GraphQLString) },
//     emailAdress: { type: GraphQLNonNull(GraphQLString) },
//     passWord: { type: GraphQLNonNull(GraphQLString) }
//   })
// })

const NurseType = new GraphQLObjectType({
  name: "Nurse",
  description: "Represent Nurse",
  fields: () => ({
    _id: { type: GraphQLNonNull(GraphQLString) },
    name: { type: GraphQLNonNull(GraphQLString) },
    userName: { type: GraphQLNonNull(GraphQLString) },
    email: { type: GraphQLNonNull(GraphQLString) },
    password: { type: GraphQLNonNull(GraphQLString) },
  }),
});
const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    // patient:
    // {
    //   type: PatientType,
    //   description: 'A Single Patient',
    //   args: {
    //     _id: { type: GraphQLString }
    //   },
    //   resolve: async (parent, args) => {
    //       let patient
    //       patient = await Patient.findById(args._id)
    //      return patient;

    //   }
    // },
    // patients:
    // {
    //   type: new GraphQLList(PatientType),
    //   description: 'List of All patient',
    //   resolve: async () => {
    //      const patients = await Patient.find();
    //       return patients;
    //   }
    // },
    nurse: {
      type: NurseType,
      description: "A Single nurse",
      args: {
        _id: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let nurse;
        nurse = await Nurse.findById(args._id);
        return nurse;
      },
    },
    nurses: {
      type: new GraphQLList(NurseType),
      description: "List of All nurse",
      resolve: async () => {
        const nurses = await Nurse.find();
        return nurses;
      },
    },
  }),
});
const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    // addPatient:
    // {
    //   type: PatientType,
    //   description: 'Add a patient',
    //   args: {
    //     name: { type: GraphQLNonNull(GraphQLString)  },
    //     userName: { type: GraphQLNonNull(GraphQLString) },
    //     emailAdress: { type: GraphQLNonNull(GraphQLString) },
    //     passWord: { type: GraphQLNonNull(GraphQLString) }

    //   },
    //   resolve: async (parent, args) => {
    //     const patient = new Patient({
    //       fullName: args.fullName,
    //       userName: args.userName,
    //       emailAdress: args.emailAdress,
    //       passWord: args.passWord
    //     });
    //     const newPatient = await patient.save();
    //     return newPatient;

    //   }
    // },
    addNurse: {
      type: NurseType,
      description: "Add a nurse",
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        userName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        const nurse = new Nurse({
          name: args.name,
          userName: args.userName,
          email: args.email,
          password: args.password,
        });
        const newNurse = await nurse.save();
        return newNurse;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

app.use(express.json());
app.use(
  "/users",
  expressGraphQL({
    schema: schema,
    graphiql: true,
  })
);

app.listen(2003, () =>
  console.log("Server Started: http://localhost:2003/users")
);
