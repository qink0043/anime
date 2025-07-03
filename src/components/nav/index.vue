<template>
  <div class="nav">
    <div class="tag-container">
      <div class="tag" ref="tags" :class="{ active: activeIndex == index }" @mouseenter="activeIndex = index"
        @mouseleave="activeIndex = selectedIndex" @click="changeActive(index)"
        v-for="(type, index) in Object.values(subjectMap)">
        {{ type }}
      </div>
    </div>
    <div class="underline" :style="underlinStyle"></div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue'
const activeIndex = ref(0)
const selectedIndex = ref(0) // 用于跟踪选中的索引，初始值为0，表示第一个元素被选中

const props = defineProps({
  subjectMap: {
    type: Object,
    default: {}
  },
  changeActive: {
    type: Function,
    default: () => {
      console.log('changeActive');
    }
  }
})
const tags = ref([])
const widths = ref([])
//动态计算下划线的位置
const left = computed(() => {
  let left = 0
  for (let i = 0; i < activeIndex.value; i++) {
    left += widths.value[i]
  }
  return left
})
const underlinStyle = computed(() => {
  return {
    left: left.value + 'px',
    width: `${widths.value[activeIndex.value]}px`
  }
})
onMounted(async () => {
  await nextTick()
  widths.value = tags.value.map(tag => tag.offsetWidth)
  console.log(widths.value);
})
</script>

<style scoped lang="scss">
.nav {
  display: flex;
  flex-direction: column;
  position: relative;

  .tag-container {
    display: flex;
    flex: 1;

    .tag {
      padding: 0 10px;

    }
  }

  .underline {
    background-color: #0052D9;
    height: 2px;
    position: relative;
    width: 52px;
    left: 0;
    transition: left 0.3s ease;
  }
}
</style>