<script setup>
const props = defineProps(["index", "item"]);
const {index, item} = props;
</script>

<template>
  <div class="row border-bottom border-secondary">
    <div class="col-1 text-secondary">
      {{ index }}.
    </div>
    <div class="col px-3 d-flex">
      <div>
      {{ item.anagram }}
      </div>
      <div>
        →
      </div>
      <div class="text-success">
      {{ item.word }}
      </div>
      <div class="text-secondary px-1">
        ({{ item.word.length }})
      </div>
    </div>
    <div
        class="col text-secondary d-flex justify-content-end"
        :class="item.hintSize === 0 ? '' : 'withHint'"
        :title="item.hintSize === 0 ? '' : `with ${item.hintSize} hints`"
    >
      {{ Math.round(item.timeMs / 10) / 100 }}
    </div>
  </div>
</template>

<style scoped>
.withHint {
  text-decoration: line-through;
}
</style>