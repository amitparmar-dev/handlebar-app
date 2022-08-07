const express = require('express')
const path = require('path');
const hbs = require('hbs');

const app = express();
const staticPath = path.join(__dirname,'/public');
const viewsPath = path.join(__dirname,'./template/views')
const partialsPath = path.join(__dirname,'./template/partials')

app.set('view engine', 'hbs');
app.set('views', viewsPath);

hbs.registerPartials(partialsPath);

//For static HTML Content
app.use(express.static(staticPath))

//Example of Custom Helper
hbs.registerHelper('upper', function (aString) {
    return aString.toUpperCase()
})
// Example of Block Helper
hbs.registerHelper("noop", function(context, options) {
    return (options.fn(context));
  });


app.get('/',(req,res)=>{
    res.render('index', { 
                            title: 'My Home Page', 
                            name : "Amit Parmar",
                            address : {
                                city: 'Vadodara', state: 'Guj' }

                        })
});

//Example of Built-in Helper
app.get('/about', (req, res) => {
    res.render('about', {
            person : false,
            name : 'Amit Parmar'
       
        // people: [
        //     "Yehuda Katz",
        //     "Alan Johnson",
        //     "Charles Jolley",
        // ],
    }
    )
})

app.get('/help', (req,res)=>{

    res.render('help', {
        func : {
            name: 'add',
            arg : { arg1 : 1, arg2 : 2 }
        }
    })
})




app.listen(4000, ()=> console.log('Server is up and running on 4000'));
