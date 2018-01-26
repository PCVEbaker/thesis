const graphql = require('graphql')
const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLID
} = graphql

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLInt },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    user: { type: GraphQLInt }
    })
})

module.exports = EventType