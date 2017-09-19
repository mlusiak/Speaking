module HTML

(*
You want to become startup hipster, so we need to find cheap tickets to SF. Of course, using type providers.
*)

open FSharp.Data

let origin = "KRK"
let destination = "OAK"
let currency = "EUR"

let urlString = "http://www.norwegian.com/uk/flight/select-flight/?D_City=" + origin + "&A_City=" + destination + "&TripType=1&D_SelectedDay=15&D_Day=15&D_Month=201507&R_SelectedDay=26&R_Day=26&R_Month=201507&CurrencyCode=" + currency
//let urlString = "C:/Projects/LambdaDays/krkoak.html"

let flight = HtmlDocument.Load(urlString)

let getTime typeOfTime:string = 
    (flight.Descendants ["td"] 
           |> Seq.find (fun x -> x.HasClass(typeOfTime))).Elements().Head.InnerText()

let price typeOfSeat = 
    ((flight.Descendants ["td"] 
           |> Seq.find (fun x -> x.HasClass("fareselect " + typeOfSeat))).Descendants("label")
           |> Seq.last).InnerText()


printfn "Departure: %s\nArrival: %s\n" (getTime("depdest")) (getTime("arrdest"))
printfn "Economy price: %s %s\nPremium: %s %s\n" (price("standardlowfare")) currency (price("premiumlowfare")) currency




type Norwegian = HtmlProvider<"C:/Projects/LambdaDays/krkoak.html">

let htmlStructure = Norwegian.Load(urlString)
let information = htmlStructure.Lists.List3.Values

let stuff = htmlStructure.Lists.List3.Values