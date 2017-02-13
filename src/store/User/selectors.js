export const all = state => state.User.byId
export const byId = (state, id) => state.User.byId.get(id)
export const currentId = state => state.User.current.get('id')
