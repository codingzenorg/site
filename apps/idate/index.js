import { h, app } from "hyperapp"
//import { withLogger } from "@hyperapp/logger"
import styles from "./index.css"

//calc date
const bdate = new Date(2016, 0, 16, 4, 25, 0);
const idate = bdate.getTime();
const cdate = new Date().getTime();
const diff_microseconds = (cdate - idate);
const diff_seconds = diff_microseconds / 1000;//1000 -> from microseconds to seconds
const diff_minutes = diff_seconds / 60; //60 -> from seconds to minutes
const diff_hours = diff_minutes / 60; //60 -> from minutes to hours
const diff_days = diff_hours / 24; //24 -> from hours to days


//state  ------------------------------------------------
const state = {
	bdate,
	diff_microseconds,
	diff_seconds,
	diff_minutes,
	diff_hours,
	diff_days
}

//actions ------------------------------------------------
const actions = {
//    getDate:  () => (state,actions) => { axios.get(URL_BASE).then(res => { actions.setTodo(res.data) })},
}
//components ------------------------------------------------
const view = (state,actions) => {
	return (
		<div class={styles.todos}>
			<h1>Date and time differences since {state.bdate.toLocaleString('en-US')}</h1>
			<ul>
				<li>days   : {Math.floor(state.diff_days)}</li>
				<li>hours  : {Math.floor(state.diff_hours)}</li>
				<li>minutes: {Math.floor(state.diff_minutes)}</li>
				<li>seconds: {Math.floor(state.diff_seconds)}</li>
				<li>microseconds: {Math.floor(state.diff_microseconds)}</li>
			</ul>
		</div>
	)
}

//render the app ------------------------------------------
app(state,actions,view,document.body)
//withLogger(app)(state,actions,view,document.body)
//console.log('first run');
