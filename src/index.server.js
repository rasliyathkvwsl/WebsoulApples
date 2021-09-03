const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose= require('mongoose');
const path = require('path');




//routes
const authRoutes = require('./routes/user/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/user/category');
const subcategoryRoutes = require('./routes/user/subcategory');
const productRoutes = require('./routes/user/product');
const cartRoutes = require('./routes/user/cart');
const favoriteRoutes = require('./routes/user/favorite');
const initialDateRoutes = require('./routes/admin/initialData');


//environment variable or we can say constants
env.config();

//mongodb connection
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.mh1kf.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
{  
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true 
}
).then(() => {
    console.log("database is connected");
});

app.use(express.json());
app.use('/public',express.static(path.join(__dirname,'routes/uploads')))
app.use('/api',authRoutes);
app.use('/api',adminRoutes);
app.use('/api',categoryRoutes);
app.use('/api',subcategoryRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',favoriteRoutes);
app.use('/api',initialDateRoutes);



// listening port
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
});