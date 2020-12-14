const express = require('express')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3000
const app = express()
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')
const path = require('path')
const hbs = exphbs.create({
	defaultLayout: 'min',
	extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.use(todoRoutes)
async function start() {
	try {
		await mongoose.connect('mongodb+srv://site:mordacious@cluster0.hbm2m.mongodb.net/sitex', {
			useNewUrlParser: true,
			useFindAndModify: false
		})
		app.listen(PORT, () => {
			console.log('Server has been started!')
		})
	} 	catch (e) {
		console.log(e)
	}
}
start()