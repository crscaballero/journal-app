<template>
    <template v-if="entry">
        <div class="entry-title d-flex justify-content-between p-2" >
            <div>
                <span class="text-success fs-3 fw-bold">{{day}}</span>
                <span class="mx-1 fs-3">{{month}}</span>
                <span class="textmx-2 fs-4 fw-light">{{yearDay}}</span>
            </div>
            <div>
                <button
                    v-if="entry.id"
                    @click="onDeleteEntry"
                    type="button"
                    class="btn btn-danger mx-2"
                >
                    Delete <i class="fa fa-trash-all"></i>
                </button>
                <button
                    v-if="entry.id"
                    type="button"
                    class="btn btn-primary"
                >
                    Upload image <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>
        <hr />
        <div class="d-flex flex-column px-3 h-75">
            <textarea
                v-model="entry.text"
                cols="30"
                rows="10"
                placeholder="What happened today?..."
            ></textarea>
        </div>
        <Fab
            icon="fa-save"
            @on:click="saveEntry"
        />
        <img
            v-if="entry?.picture"
            :src="entry.picture"
            alt="entry-picture"
            class="img-thumbnail"
        />
    </template>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { mapGetters, mapActions } from 'vuex';
import Swal from 'sweetalert2';

import getDayMonthYear from '@/modules/daybook/helpers/getDayMonthYear';

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('@/modules/daybook/components/Fab.vue'))
    },
    data() {
        return {
            entry: null
        }
    },
    computed: {
        ...mapGetters('journal', ['getEntryById']),
        day() {
            const { day } = getDayMonthYear(this.entry.date);
            return day;
        },
        month() {
            const { month } = getDayMonthYear(this.entry.date);
            return month;
        },
        yearDay() {
            const { yearDay } = getDayMonthYear(this.entry.date);
            return yearDay;
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry(){
            let entry;
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntryById(this.id);
                if (!entry) return this.$router.push({name: 'no-entry'})
            }
            this.entry = entry;
        },
        async saveEntry(){
            if (!this.entry.text) {
                alert('You must write somthing before save it');
                return;
            }
            new Swal({
                title: 'Please wait...',
                allowOutsideClick: false
            });
            Swal.showLoading();
            if (this.entry.id) { // If Id does exist then update it
                await this.updateEntry(this.entry);
            } else { // If not, create it
                const newEntryId = await this.createEntry(this.entry);
                this.$router.push({ name: 'entry', params: { id: newEntryId }})
            }
            Swal.fire('Saved!', 'Entry saved successfully', 'success');
        },
        async onDeleteEntry() {
            const { isConfirmed } = await Swal.fire({
                title: 'Are you sure?',
                text: 'Once delted can not be retrieved',
                showDenyButton: true,
                confirmButtonText: 'Yes, I am sure'
            });
            if (isConfirmed) {
                new Swal({
                    title: 'Please wait...',
                    allowOutsideClick: false
                });
                await this.deleteEntry(this.entry.id);
                Swal.fire('Deleted!', 'Entry deleted successfully', 'success');
                this.$router.push({ name: 'no-entry' });
            }
        }
    },
    created() {
        this.loadEntry();
    },
    watch: {
        id() {
            this.loadEntry();
        }
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
