//connectiong mongoose
const mongoose = require('mongoose');
// Making sure that mongoose can read our Schema.
const Schema = mongoose.Schema;
//Assigning new Schema to our variable ToDoSchema.
const ToDoSchema = new Schema({
//Setting up properties for Schema
    name: {type: String, required: true},
    completed: {type: Boolean, required: true, default: false}
});
//Exporting our mongoose model.
module.exports = mongoose.model('ToDo', ToDoSchema);