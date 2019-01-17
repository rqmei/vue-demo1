import {mapGetters} from 'vuex'
import Main from '../layout/Main'
export default {
  name: 'User',
  data () {
    return {
      flag: 2, // 默认为当月计划 .active
      showOnline: false
    }
  },
  computed: {
    ...mapGetters(['userName'])
  },
  components: {
    Main
  },
  methods: {
    change: function (a) {
      // 传入参数这里指1、2
      this.flag = a // flag==1 or flag==2
    },
    enter () {
      this.showOnline = true
    },
    leave () {
      this.showOnline = false
    }
  }
}
