const path =require('path');
const express = require('express')
const hbs=require('hbs')
const geocode = require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath =path.join(__dirname, '../public')
const viewsPath= path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//Setup static directory location
app.use(express.static(publicDirectoryPath))



app.get('',(req, res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Sagar Vanave'
    })
})

app.get('/about',(req, res) =>{
    res.render('about',{
        name:'Sagar Vanave',
        title:'About Me'
    })
})

app.get('/help',(req, res) =>{
    res.render('help',{
        message:'Hello this is message from homepage',
        title:'help',
        name:'Sagar Vanave'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please provide a address'
        })
    }

    geocode(req.query.address,(error,{lat,long,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }

        forecast(lat,long,(error,forecastdata)=>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast:forecastdata,
                location,
                address:req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Mumbai',
    //     address: req.query.address
    // })
})

app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term"
        })
    }
    res.send({
        products:[]
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Sagar Vanave',
        errorMassage:'Help article not found'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title:'404',
        name:'Sagar Vanave',
        errorMassage:'Page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port '+port)
})