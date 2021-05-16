<template>
    <div class="content-wrapper">
        <new-pairs></new-pairs>
    </div>
</template>

<script>
import NewPairs from '@/components/NewPairs.vue'
export default {
    components: {
        NewPairs
    }
}
</script>

<style>
.content-wrapper {
    margin: 20px;

    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
</style>