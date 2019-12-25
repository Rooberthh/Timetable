<template>
    <div class="p-4">
        <h1 class="text-3xl font-bold">Calendar</h1>
        <FullCalendar :slot-label-format="eventTimeFormat" :event-time-format="eventTimeFormat" :events="events" defaultView="timeGridWeek" :plugins="calendarPlugins" />
    </div>
</template>

<script>
    import FullCalendar from '@fullcalendar/vue';
    import timeGridPlugin from '@fullcalendar/timegrid';
    import googleCalendarPlugin from '@fullcalendar/google-calendar';
    import axios from 'axios';

    export default {
        components: {
            FullCalendar // make the <FullCalendar> tag available
        },
        data() {
            return {
                calendarPlugins: [ timeGridPlugin, googleCalendarPlugin ],
                events : [],
                eventUrl: this.getGatewayUrl() + "events",
                eventTimeFormat: { // like '14:30:00'
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }
            }
        },
        created() {
            axios.get(this.eventUrl)
                .catch(error => {
                    console.log(error);
                })
                .then(response => {
                    // this.events = response.data;
                    for (let i = 0; i < response.data.length; i++){
                        let temp_event = response.data[i];

                        let event = {
                            'title':temp_event.googleEvent.summary,
                            'start':temp_event.googleEvent.start.dateTime,
                            'end':temp_event.googleEvent.end.dateTime
                        };

                        this.events.push(event);
                    }
                })

        }
    }
</script>

<style lang='scss'>
    @import '~@fullcalendar/core/main.css';
    @import '~@fullcalendar/timegrid/main.css';
</style>