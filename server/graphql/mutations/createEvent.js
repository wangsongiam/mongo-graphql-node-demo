import { GraphQLNonNull } from 'graphql'
import EventType from '../types/event.js'
import EventInputType from '../types/input/event.js'
import Event from '../../db/event.js'

module.exports  = {
  type: EventType,
  args: {
    data: {
      name: 'data',
      type: new GraphQLNonNull(EventInputType)
    }
  },

  resolve: (root, { data }) => new Promise((res, rej)=> {
    const newEvent = new Event(data)

    newEvent.save()
      .then(data=> res(data))
      .catch(err=> rej(err))
  })

}

