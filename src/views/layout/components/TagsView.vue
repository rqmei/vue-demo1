<template>
  <div class="tag-view-wrap">
    <ScrollPane ref='scrollPane'>
      <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
        {{tag.title}}
        <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </ScrollPane>
  </div>
</template>
<script>
import ScrollPane from '@/components/scrollpane/ScrollPane'
export default {
  name: 'TagsView',
  components: {
    ScrollPane
  },
  data () {
    return {

    }
  },
  mounted () {
    this.addViewTags()
  },
  computed: {
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route () {
      this.addViewTags()
      this.moveToCureentTag()
    }
  },
  methods: {
    isActive (route) {
      return route.path === this.$route.path || route.name === this.$route.name
    },
    addViewTags () {
      if (this.$route.name) {
        const route = this.$route
        this.$store.dispatch('addVisitedViews', route)
      }
      return false
    },
    moveToCureentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tag.$el)
            break
          }
        }
      })
    },
    closeSelectedTag (view) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
    }
  }
}
</script>
