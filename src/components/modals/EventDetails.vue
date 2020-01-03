<template>
    <modal name="event-details"
           height="auto"
           @before-open="beforeOpen"
           @before-close="beforeClose"
    >
        <article class="card p-5" v-if="!editing">
            <div class="card-top flex">
                <div class="ml-auto">
                    <button @click="edit" class="mr-4"> <font-awesome-icon :icon="['fas', 'edit']" /></button>
                    <button @click="destroy"> <font-awesome-icon :icon="['fas', 'trash']" /> </button>
                </div>
            </div>
            <div class="card-body">
                <div class="card-header">
                    <span role="heading"> {{ this.item.title }}</span>
                </div>
                <div class="card-info">
                    <span>{{ sameDay }}</span>
                </div>
            </div>
        </article>
        <article class="card p-5" v-else>
            <div class="card-body">
                <div class="mb-4">
                    <input class="input" id="title" name="title" type="text" placeholder="Title" v-model="form.name">
                </div>
            </div>
            <div class="flex justify-between">
                <button @click="cancel" class="btn bg-red-700 text-white">Cancel</button>
                <button @click="update" class="btn btn-primary">Update</button>
            </div>
        </article>
    </modal>
</template>

<script>
    import Form from '../Form/Form';
    import moment from 'moment';
    import axios from 'axios';

    export default {
        data() {
            return {
                loading: false,
                editing: false,
                item : {id: '', title: '', startDateTime: '', endDateTime: ''},
                form: new Form({'name': '', 'startDateTime': '', 'endDateTime': ''}),
            }
        },
        methods: {
            beforeOpen (e) {
                let event = e.params;

                this.item.id = event.id;
                this.item.title = event.title;
                this.item.startDateTime = event.start;
                this.item.endDateTime = event.end;

                this.form.name = event.title;
                this.form.startDateTime = moment(event.start).toISOString();
                this.form.endDateTime = moment(event.end).toISOString();
            },
            beforeClose() {
                this.editing = false;
            },
            edit() {
                this.editing = !this.editing;
            },
            update() {
                this.form.patch(this.getGatewayUrl() + 'events/' + this.item.id)
                    .then(response => {
                        //flash message?
                        this.item.id = response.googleEvent.id;
                        this.item.title = response.googleEvent.summary;
                        this.item.startDateTime = response.googleEvent.start.dateTime;
                        this.item.endDateTime = response.googleEvent.end.dateTime;

                        this.$emit('refetch');

                        this.editing = false;
                    });
            },
            destroy() {
                this.$modal.hide('event-details');

                flash('Deleting...');

                axios.delete(this.getGatewayUrl() + 'events/' + this.item.id)
                    .catch(error => {
                        console.log(error)
                    })
                    .then(() => {
                        this.$emit('destroy-event', this.item.id);
                    });
            },
            cancel() {
                this.editing = false;
            }
        },
        computed: {
            sameDay() {
                if(moment.utc(this.form.startDateTime).isSame(moment.utc(this.form.endDateTime), 'day'))
                {
                    let formatted = moment(this.form.startDateTime).format("dddd, MMMM DD ");
                    let startHour = moment(this.form.startDateTime).format('H:mm');
                    let endHour = moment(this.form.endDateTime).format('H:mm');

                    formatted = formatted + startHour + ' - ' + endHour;

                    return formatted;

                }

                return '';
            }
        }
    }
</script>

<style scoped lang="scss">
    .card-header {
        font-size: 1.5rem;
    }

    i {
        font-size: 18px;
    }
</style>
