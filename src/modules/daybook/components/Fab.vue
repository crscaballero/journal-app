<template>
    <button type="button" class="btn btn-primary" @click="$emit('on:click')">
        <i class="fa fa-2x fa-plus" :class="icon"></i>
    </button>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: 'fa-plus'
        }
    }
}
</script>

<style lang="scss" scoped>
    button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 100%;
    }
</style>
