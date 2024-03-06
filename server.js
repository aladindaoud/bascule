const app = express();
const cors = require("cors");


const allowedOrigins= ['http://localhost:4200/', '*'];
var corsOptionsDelegate = (req, callback) => {
var corsOptions;
  
console.log(req.header('Origin'));
if(allowedOrigins.indexOf(req.header('Origin')) !== -1) {
corsOptions = { origin: true };
}
else {
corsOptions = { origin: false };
}
callback(null, corsOptions);
};





app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);

module.exports = app; // exporting app for vercel

