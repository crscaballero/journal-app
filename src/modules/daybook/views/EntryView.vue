<template>
    <div class="entry-title d-flex justify-content-between p-2">
        <div>
            <span class="text-success fs-3 fw-bold">15</span>
            <span class="mx-1 fs-3">July</span>
            <span class="textmx-2 fs-4 fw-light">2021, Thurday</span>
        </div>
        <div>
            <button type="button" class="btn btn-danger mx-2">
                Delete <i class="fa fa-trash-all"></i>
            </button>
            <button type="button" class="btn btn-primary">
                Upload image <i class="fa fa-upload"></i>
            </button>
        </div>
    </div>
    <hr />
    <div class="d-flex flex-column px-3 h-75">
        <textarea name="" id="" cols="30" rows="10" placeholder="Whaat happened today?..."></textarea>
    </div>
    <Fab
        icon="fa-save"
    />
    <img src="https://cdn.vallarta-adventures.com/sites/default/files/2021-05/CHichen10.jpeg" alt="entry-picture" class="img-thumbnail">
</template>

<script>
import { defineAsyncComponent } from "vue";

export default {
    components: {
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue'))
    }
}
</script>

<style lang="scss" scoped>
    // .entry-title {}
    textarea {
        font-size: 20px;
        border: none;
        height: 100%;
        resize: none;
        &:focus {
            outline: none;
        }
    }
    img {
        width: 200px;
        position: fixed;
        bottom: 150px;
        right: 20px;
        box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
    }
</style>
