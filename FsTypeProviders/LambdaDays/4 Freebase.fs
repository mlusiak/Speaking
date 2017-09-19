module Freebase

(*
So let's fast forward a little bit here. We made gazillions of dollars on our F# startup and
are fed up with flying airlines. Let's just buy a plane.
*)

open FSharp.Data

[<Literal>]
let FreebaseApiKey = "AIzaSyAS7AIl_PJILqui08IAKXErPUiAxk4wmp0"
type Freebase = FreebaseDataProvider<Key=FreebaseApiKey>
let db = Freebase.GetDataContext();

let aircraft = db.Commons.Aviation.``Aircraft models``
//Krakow - San Francisco = 9590km


let longRange = 
    query { for a in aircraft do
            where (a.Range.HasValue && a.Range.Value > 10000000.0<Data.UnitSystems.SI.UnitNames.meter>)
           }
           |> Seq.toList

let buisnessJet = longRange 
                  |> List.filter (fun x -> 
                        let aircraftType = 
                            match (x.``Aircraft type`` |> Seq.length) with
                            | 0 -> ""
                            | _ -> (x.``Aircraft type`` |> Seq.head).ToString()
                            
                        aircraftType.Equals("Business jet")
                  )



let lineage = db.Commons.Aviation.``Aircraft models``.IndividualsAZ.E.``Embraer Lineage 1000``
let g650 = db.Commons.Aviation.``Aircraft models``.IndividualsAZ.G.``Gulfstream G650``
let globalExpress = db.Commons.Aviation.``Aircraft models``.IndividualsAZ.B.``Bombardier Global Express``




