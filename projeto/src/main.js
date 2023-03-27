const {express} = require("./utils");
const app = express();
const path = require("path");
const public_dir = path.join(__dirname, "../view");
const port = 80;

app.use(express.json());
app.use(express.static(public_dir,{extensions:['html']}));
app.use('/api',require("./routes/router"));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
