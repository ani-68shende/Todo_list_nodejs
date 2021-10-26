const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Todo = require('./models/contact');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/practice', function(req, res) {
    return res.render('practice', {
        title: "Let us play with ejs"
    });
});


app.get('/', (req, res) => {
    Todo.find({}, function(err, todolist) {
        if (err) {
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home', {
            title: "TODO List",
            todo_list: todolist
        });
    });
});
app.post('/create-list', function(req, res) {

    // contactList.push(req.body);
    Todo.create({
        description: req.body.description,
        category: req.body.category,
        due_date: req.body.due_date

    }, function(err, newTodo) {
        if (err) {
            console.log('errot in creating a contact!');
            return;
        }
        console.log('*******', newTodo);
        return res.redirect('back');
    });

    // return res.redirect('/');

});

app.listen(port, function(err) {
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})


app.get('/delete-contact', function(req, res) {
    //console.log(req.query);
    //get id from query in the ul
    let id = req.query.id

    //let contactindex = contactList.findIndex(contact => contact.phone == phone);
    Todo.findByIdAndDelete(id, function(err) {
        if (err) {
            console.log('error in deleting the object from the database');
            return;
        }
        return res.redirect('back');
    });
    // if (contactindex != -1) {
    //     contactList.splice(contactindex, 1);
    // }

});