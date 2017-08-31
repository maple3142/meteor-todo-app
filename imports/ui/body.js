import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'

import { Tasks } from '../api/tasks.js'

import './body.html'
import './task.js'

Template.body.onCreated(function(){
	this.state = new ReactiveDict()
	console.log(this.state)
})

Template.body.helpers({
	tasks() {
		const instance = Template.instance()
		if (instance.state.get('hideCompleted')) {
			return Tasks.find({checked: {$ne: true}},{sort:{createdAt: -1}})
		}
		return Tasks.find({},{sort:{createdAt: -1}})
	},
	imcomplete() {
		return Tasks.find({checked: {$ne: true}}).count()
	}
})

Template.body.events({
	'submit .new-task'(e) {
		e.preventDefault()
		Tasks.insert({
			text: e.target.text.value,
			createdAt: new Date()
		})
		e.target.text.value=''
	},
	'change .hide-completed input'(e, instance) {
		instance.state.set('hideCompleted',e.target.checked)
	}
})