<template>
    <div class="p-4">
        <h1 class="text-3xl font-bold">Calendar</h1>
        <FullCalendar
                :selectable="selectable"
                :editable="editable"
                :slot-label-format="eventTimeFormat"
                :event-time-format="eventTimeFormat"
                :events="events" defaultView="timeGridWeek"
                :plugins="calendarPlugins"
                @eventDrop="updateEvent"
                @eventResize="updateEvent"
                @eventClick="showDetails"
                @select="storeEvent"
                ref="Calendar"
        />
        <EventDetails @destroy-event="destroyEvent" @refetch="fetch"></EventDetails>
    </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue';
    import EventDetails from '../components/modals/EventDetails';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import googleCalendarPlugin from '@fullcalendar/google-calendar';
    import interactionPlugin from '@fullcalendar/interaction';
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
                eventTimeFormat: { // like '14:30'
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                },
                editable: true,
                selectable: true,
                form: new Form({'name': '', 'startDateTime': '', 'endDateTime': ''})
            }
        },
        created() {
            this.fetch();
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
                        console.log(error);
                    })
                    .then(response => {
                        console.log(response);
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

                this.form.post(this.getGatewayUrl() + 'events')
                    .catch(error => {
                        console.log(error);
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
                    });

            }
        }
    }
</script>

<style lang='scss'>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/timegrid/main.css';
</style>
