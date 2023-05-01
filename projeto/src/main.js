const {express} = require("./utils");
const app = express();
const path = require("path");
const public_dir = path.join(__dirname, "../view");
const port = 80;

app.use(express.json());
app.use(express.static(public_dir,{extensions:['html']}));
app.use('/api',require("./routes/router"));
app.all('/*',(req,res)=>{
  res.status(404).sendFile(path.join(public_dir,"404.html"));
})


app.listen(port, () => {
  console.log(`App em execução na porta ${port}`);
});
