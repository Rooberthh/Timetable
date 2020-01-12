<template>
    <section>
        <h1 class="text-3xl font-bold">Calendar</h1>
        <div class="flex">
            <div class="w-1/6">
                <h2 class="text-xl">Frequent events</h2>
                <ul id="draggable" >
                    <li v-for="(item, index) in frequentEvents" class="my-3 draggable-item fc-event p-2" :data-event="JSON.stringify(item)">
                        {{ item.title }}
                    </li>
                </ul>
            </div>
            <div class="w-5/6">
                <FullCalendar
                        :selectable="selectable"
                        :editable="editable"
                        :slot-label-format="eventTimeFormat"
                        :event-time-format="eventTimeFormat"
                        :events="events" defaultView="timeGridWeek"
                        :plugins="calendarPlugins"
                        :droppable="droppable"
                        @eventReceive="dropEvent"
                        @eventDrop="updateEvent"
                        @eventResize="updateEvent"
                        @eventClick="showDetails"
                        @select="storeEvent"
                        ref="Calendar"
                />
            </div>
        </div>
        <EventDetails @destroy-event="destroyEvent" @refetch="fetch"></EventDetails>
    </section>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue';
    import EventDetails from '../components/modals/EventDetails';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import googleCalendarPlugin from '@fullcalendar/google-calendar';
    import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
    import Form from '../components/Form/Form';
    import axios from 'axios';

    export default {
        components: {
            FullCalendar, // make the <FullCalendar> tag available
            EventDetails
        },
        data() {
            return {
                calendarPlugins: [ timeGridPlugin, googleCalendarPlugin, interactionPlugin ],
                events : [],
                eventUrl: this.getGatewayUrl() + "events",
                frequentEvents: [],
                eventTimeFormat: { // like '14:30'
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                },
                droppable: true,
                editable: true,
                selectable: true,
                form: new Form({'name': '', 'startDateTime': '', 'endDateTime': ''})
            }
        },
        created() {
            this.fetch();

            this.getFrequentEvents();
        },
        mounted() {
            let el = document.getElementById('draggable');

            new Draggable(el, {
                itemSelector: '.draggable-item'
            });
        },
        methods: {
            updateEvent(info) {
                let updatedEvent = info.event;

                let data = {
                    'name' : updatedEvent.title,
                    'startDateTime' : updatedEvent.start,
                    'endDateTime' : updatedEvent.end
                };

                axios.patch(this.getGatewayUrl() + 'events/' + updatedEvent.id, data)
                    .catch(error => {
                        flash(error.message);
                    })
                    .then(response => {
                        flash("Event updated");
                    });
            },
            showDetails(info) {
                this.$modal.show('event-details', info.event);
            },
            fetch() {
                this.events.splice(0, this.events.length);

                axios.get(this.eventUrl)
                    .catch(error => {
                        console.log(error);
                    })
                    .then(response => {
                        // this.events = response.data;
                        if(response.data.length){
                            for (let i = 0; i < response.data.length; i++){
                                let temp_event = response.data[i];

                                let event = {
                                    'title':temp_event.googleEvent.summary,
                                    'start':temp_event.googleEvent.start.dateTime,
                                    'end':temp_event.googleEvent.end.dateTime,
                                    'id': temp_event.googleEvent.id
                                };

                                this.events.push(event);
                            }
                        }
                    })
            },
            destroyEvent(id) {
                let api = this.$refs.Calendar.getApi();
                api.getEventById(id).remove();

                flash('Event deleted');
            },
            storeEvent(info) {
                this.form.name = prompt('Add event name:');
                if(this.form.name == null) {
                    return;
                }
                this.form.startDateTime = info.start;
                this.form.endDateTime = info.end;

                flash('Adding...');

                this.form.post(this.getGatewayUrl() + 'events')
                    .catch(error => {
                        flash(error.message);
                    })
                    .then(response => {
                        let temp_event = response;

                        let event = {
                            'title':temp_event.googleEvent.summary,
                            'start':temp_event.googleEvent.start.dateTime,
                            'end':temp_event.googleEvent.end.dateTime,
                            'id': temp_event.googleEvent.id
                        };
                        let api = this.$refs.Calendar.getApi();

                        api.addEvent(event);
                        flash('Added Event');
                    });
            },
            getFrequentEvents() {
                axios.get(this.eventUrl + '/frequent')
                    .catch(error => {
                        flash(error.message);
                    })
                    .then(response => {
                        // this.events = response.data;
                        for (let i = 0; i < response.data.length; i++){
                            let event = {
                                'title': response.data[i],
                                'duration': "01:00"
                            };

                            this.frequentEvents.push(event);
                        }
                    })
            },
            dropEvent(info) {
                let event = info.event;

                this.form.name = event.title;
                this.form.startDateTime = event.start;
                this.form.endDateTime = event.end;

                flash('Adding...');

                this.form.post(this.getGatewayUrl() + 'events')
                    .catch(error => {
                        flash(error.message);
                    })
                    .then(() => {
                        flash('Added Event');
                    });
            }
        }
    }
</script>

<style lang='scss'>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/timegrid/main.css';

    .draggable-item {
        display: block;
        cursor: pointer;
    }

    .event-item {
        display: inline-block;
    }
</style>
