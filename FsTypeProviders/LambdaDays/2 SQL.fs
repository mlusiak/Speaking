module SQL

(*
You realized, that there's lots of negative stuff about Dreamliner, so first let's check
your own journal of flights, have you ever flow one?
*)

open System
open System.Data
open System.Data.Linq
open Microsoft.FSharp.Data.TypeProviders
open Microsoft.FSharp.Linq

[<Literal>]
let connectionString = "Data Source=.\SQLEXPRESS;Initial Catalog=FlightDiary;Integrated Security=True"
   
type dbSchema = SqlDataConnection<connectionString>
let db = dbSchema.GetDataContext()

//Try tables


// Try x.SomethingElse
db.Airplanes |> Seq.iter(fun x -> printfn "%s" x.Manufacturer)


// Change to B788
let result = 
    query {
        for flight in db.Flights do 
        join airplane in db.Airplanes on (flight.Airplane.Value = airplane.Id)
        where (airplane.Code = "B738")
        select airplane
    }

result |> Seq.length

result |> Seq.iter (fun row -> printfn "%s %s" row.Manufacturer row.Code)