let express=require("express")
let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header ("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    )
    res.header (
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        )
next();
})
var port=process.env.PORT||2410
app.listen(port,() =>console. log(`Node App listening on port ${port}!`))

let mysql=require("mysql")
let connData={
    host:"localhost",
    user:"root",
    password:"",
    database:"storagenew2"
}

app.get("/EmpApp/employees",function(req,res){
    let connection=mysql.createConnection(connData)
    let {dept,desig,gender,sortBy}=req.query
    let sql="SELECT * FROM employees"
    connection.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{
            let arr=[...result]
            if(dept){
                arr=arr.filter((a)=>a.department==dept)
            }
            if(desig){
                arr=arr.filter((a)=>a.designation==desig)
            }
            if(gender){
                arr=arr.filter((a)=>a.gender==gender)
            }
            if(sortBy=="empCode"){
                arr=arr.sort((a,b)=>a.empCode-b.empCode)
            }
            if(sortBy=="Name"){
                arr=arr.sort((a,b)=>a.name.localeCompare(b.name))
            }
            if(sortBy=="Gender"){
                arr=arr.sort((a,b)=>a.gender.localeCompare(b.gender))
            }
            if(sortBy=="Salary"){
                arr=arr.sort((a,b)=>a.salary-b.salary)
            }
            if(sortBy=="Department"){
                arr=arr.sort((a,b)=>a.department.localeCompare(b.department))
            }
            if(sortBy=="Designation"){
                arr=arr.sort((a,b)=>a.designation.localeCompare(b.designation))
            }
            res.send(arr)
        }
    })
})
app.get("/EmpApp/employees/:id",function(req,res){
    let id=req.params.id
    let connection=mysql.createConnection(connData)
    let sql="SELECT * FROM employees WHERE empCode=?"
    connection.query(sql,id,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{ 
            res.send(result)
        }
    })
    
})
app.get("/EmpApp/department/:dep",function(req,res){
    let dep=req.params.dep
    let connection=mysql.createConnection(connData)
    let sql="SELECT * FROM employees"
    connection.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{ 
            let arr=result.filter((a)=>a.department==dep)
            res.send(arr)
        }
    })
})
app.get("/EmpApp/designation/:desig",function(req,res){
    let desig=req.params.desig
    let connection=mysql.createConnection(connData)
    let sql="SELECT * FROM employees"
    connection.query(sql,function(err,result){
        if(err) res.status(404).send("No Data Found")
        else{ 
            let arr=result.filter((a)=>a.designation==desig)
            res.send(arr)
        }
    })
})
app.post("/EmpApp/employees",function(req,res){
    let connection=mysql.createConnection(connData)
    let body=req.body
    let arr=[body.empCode,body.name,body.gender,body.salary,body.department,body.designation]
    let sql="INSERT INTO  employees(empCode,name,gender,salary,department,designation) VALUES ?"
    connection.query(sql,[[arr]],function(err,result){
        if(err) res.status(404).send(err)
        else{ 
            res.send("Inserted")
        }
    })
})
app.put("/EmpApp/employees/:id",function(req,res){
    let id=+req.params.id
    let connection=mysql.createConnection(connData)
    let body=req.body
    let sql="UPDATE employees SET empCode=?,name=?,gender=?,salary=?,department=?,designation=? WHERE empCode=?"
    connection.query(sql,[body.empCode,body.name,body.gender,body.salary,body.department,body.designation,id],function(err,result){
        if(err) res.status(404).send(err)
        else{ 
            res.send("Inserted")
        }
    })
})
app.delete("/EmpApp/employees/:id",function(req,res){
    let id=+req.params.id
    let connection=mysql.createConnection(connData)
    let body=req.body
    let sql="DELETE FROM employees WHERE empCode=?"
    connection.query(sql,id,function(err,result){
        if(err) res.status(404).send(err)
        else{ 
            res.send("DELETED")
        }
    })
})
