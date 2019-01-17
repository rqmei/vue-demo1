import hamburger from '../../../../components/hamburger/Hamburger'
import {mapGetters} from 'vuex'
import TagsView from '@/views/layout/components/TagsView'
export default {
  name: 'MyHeader',
  data () {
    return {
    }
  },
  components: {
    hamburger,
    TagsView
  },
  methods: {
    toggleSideBar () {

    },
    logOut () {
    }
  },
  computed: {
    ...mapGetters([
      'userName'
    ])
  }
}
