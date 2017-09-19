module CSV

(*
And now we need airport, where we want to store our brand new airplane
*)

open FSharp.Data

let distanceInKm lat1 lon1 lat2 lon2 =
    let deg2rad (d:float) =
        d * System.Math.PI / 180.0

    let radius = 6371.0
    let phi1 = (90.0 - lat1) |> deg2rad
    let phi2 = (90.0 - lat2) |> deg2rad
    let theta1 = deg2rad lon1
    let theta2 = deg2rad lon2

    radius * acos(sin(float(phi1)) * sin(float(phi2)) *
        cos(float(theta1 - theta2)) + 
        cos(float(phi1)) * cos(float(phi2)))

let distanceToKrk lat lon =
    let krkLat = 50.061389
    let krkLon = 18.068611
    distanceInKm lat lon krkLat krkLon

let nearKrakow lat lon =
    (distanceToKrk (float(lat)) (float(lon)) < 100.0)



let airports = new CsvProvider<"C:/Projects/LambdaDays/airports.csv", IgnoreErrors = true>()
let runways = new CsvProvider<"C:/Projects/LambdaDays/runways.csv", IgnoreErrors = true>()

let airportsNearKrakow = 
    airports.Rows  
    |> Seq.filter(fun a -> nearKrakow a.Latitude_deg a.Longitude_deg) 
    |> Seq.iter (fun a ->
        let suitableRunways = runways.Rows 
                            |> Seq.filter (fun r -> r.Airport_ref = a.Id) 
                            |> Seq.filter (fun r-> r.Closed = false)
                            |> Seq.filter (fun r-> r.Length_ft > 7000)
                            //|> Seq.filter (fun r-> r.Surface = "ASPH-G" || r.Surface = "CONC")

        if (suitableRunways |> Seq.length > 0)
        then printf "%s %f\n" a.Name (distanceToKrk (float(a.Latitude_deg)) (float(a.Longitude_deg)))
    )