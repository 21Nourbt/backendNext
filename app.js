
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const session = require('express-session')
app.use(cookieParser());
const passport = require('passport')
app.use(passport.initialize())
setupPassport(passport)

app.use(cors(
  {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
  }
));
app.use('/' , googleRoute)
app.use(express.json())
const subscriptionRouter = require('./Routes/subscriptionRoute');
const userRouter = require('./Routes/userRoute');
const userSubscription = require('./Routes/userSubscriptionRoute');
const bookingRouter = require('./Routes/tablePaymentRouter');
const tableRouter = require('./Routes/tableRoute');
app.use('/ELACO/subcription', subscriptionRouter);
app.use('/ELACO', userRouter);
app.use('/ELACO/userSubscription', userSubscription);
app.use('/ELACO/booking', bookingRouter);
app.use('/ELACO/table', tableRouter);
module.exports = app;