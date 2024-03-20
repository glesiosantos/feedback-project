import { readonly } from 'vue'
import GlobaStoreModule from './global.store'
import UserStoreModule from './user.store'

export default readonly({
  GlobaStore: GlobaStoreModule,
  UserStore: UserStoreModule
})
