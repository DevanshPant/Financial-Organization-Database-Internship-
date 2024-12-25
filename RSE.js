const{Client}=require('pg')
const con=new Client({
    host:"localhost",
    user:"postgres",
    port: 5432,
    password:"1234",
    database:"RSE"
})

con.connect().then(()=>console.log("connected"))

con.query('SELECT * FROM ClientData',(err,res)=>{
    if(!err){
        console.log(res.rows)
    }
    else{
        console.log(err.message)
    }
    con.end;
})

