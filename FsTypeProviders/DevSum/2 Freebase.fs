module Freebase

open FSharp.Data

[<Literal>]
let FreebaseApiKey = "<<insert your google apis key>>"
type Freebase = FreebaseDataProvider<Key=FreebaseApiKey>
let db = Freebase.GetDataContext();


let aircraft = db.Commons.Aviation.``Aircraft models``
//Stockholm - San Francisco = 8616km

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

globalExpress.``Cruise Speed``
