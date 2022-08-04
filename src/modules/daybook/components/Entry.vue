<template>
    <div
        class="entry-container mb-3 pointer p-2"
        @click="$router.push({name: 'entry', params: {id: 10}})"
    >
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">15</span>
            <span class="mx-1 fs-5">July</span>
            <span class="mx-2 fw-light">2022, Thursday</span>
        </div>
        <div class="entry-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, fugiat ex eum pariatur cupiditate reiciendis magnam ipsam, maxime aspernatur, architecto doloribus eos quasi molestias porro illum repellat inventore atque expedita.
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .entry-container {
        border-bottom: 1px solid #2c3e50;
        transition: 0.2s all easy-in;
        &:hover{
            background-color: lighten($color: grey, $amount: 45);
            transition: 0.2s all easy-in;
        }
        // .entry-title {}
        .entry-description {
            font-size: 12px;
        }
    }
</style>
