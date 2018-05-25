import _ from 'lodash';
import { normalize, denormalize as denorm, schema } from 'normalizr';
import { Record, Map, fromJS } from 'immutable';

// Define general schema for API responses
const userSchema = new schema.Entity('users');
const photoSchema = new schema.Entity('photos', {
  user: userSchema,
});
const responseSchema = {
  user: userSchema,
  users: [userSchema],
  photos: [photoSchema],
  photo: photoSchema,
};

export const PhotoRecord = new Record({
  id: undefined,
  name: null,
  description: '',
  highest_rating: 0,
  rating: 0,
  times_viewed: 0,
  votes_count: 0,
  created_at: null,
  category: 0,
  width: 0,
  height: 0,
  voted: false,
  liked: false,
  images: [],
  user: null,
}, 'PhotoRecord');

export class UserRecord extends Record({
  id: undefined,
  about: null,
  admin: null,
  affection: 0,
  avatars: {},
  birthday: null,
  buyer_mode_enabled: null,
  city: null,
  contacts: Map(),
  country: null,
  cover_url: null,
  email: null,
  equipment: Map(),
  firstname: null,
  followers_count: 0,
  friends_count: 0,
  fullname: null,
  lastname: null,
  locale: null,
  photos_count: 0,
  sex: null,
  show_homefeed_recommendations: null,
  show_nude: null,
  state: null,
  username: null,
}, 'UserRecord') {
  constructor(attrs) {
    const equipment = fromJS(attrs.equipment);
    const contacts = fromJS(attrs.contacts);

    let { avatars } = attrs;
    if (attrs.avatar && !avatars) {
      avatars = { default: { https: attrs.avatar } };
    }

    super({
      ...attrs,
      equipment,
      contacts,
      avatars,
    });
  }
}

// Short user models will sometimes return values as "null" when the full user model
// returns an actual value. To prevent "null" from overwriting these values, remove
// all "null" attributes.
const cleanUserObject = user => _.omitBy(user, _.isNull);

export function normalizeResponse(data) {
  // Normalize response data
  const normalized = normalize(data, responseSchema);

  const entities = Map({
    photos: Map(_.mapValues(normalized.entities.photos, value => new PhotoRecord(value))),
    users: Map(_.mapValues(
      normalized.entities.users,
      value => new UserRecord(cleanUserObject(value)),
    )),
  });

  return { entities, result: normalized.result };
}

export function denormalize(input, entities) {
  return denorm(input, responseSchema, entities);
}
