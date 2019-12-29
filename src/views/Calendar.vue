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
        />
    </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import googleCalendarPlugin from '@fullcalendar/google-calendar';
    import interactionPlugin from '@fullcalendar/interaction';
    import axios from 'axios';

    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
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
                selectable: true
            }
        },
        created() {
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
        methods: {
            updateEvent(info) {
                let updatedEvent = info.event;

                let data = {
                    'name' : updatedEvent.title,
                    'startDateTime' : updatedEvent.start,
                    'endDateTime' : updatedEvent.end
                };

                console.log(updatedEvent);
                console.log(data);

                axios.patch(this.getGatewayUrl() + '/events/' + updatedEvent.id, data)
                    .catch(error => {
                        console.log(error);
                    })
                    .then(response => {
                        console.log(response);
                    });
            }
        }
    }
</script>

<style lang='scss'>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/timegrid/main.css';
</style>
