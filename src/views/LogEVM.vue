<template>
    <div class="content-wrapper">
        <new-pairs></new-pairs>
        <all-pairs></all-pairs>
    </div>
</template>

<script>
import NewPairs from '@/components/NewPairs.vue'
import AllPairs from '@/components/AllPairs.vue'

export default {
    components: {
        NewPairs,
        AllPairs
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