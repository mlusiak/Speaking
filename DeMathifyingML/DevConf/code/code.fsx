#r "../packages/FSharp.Data/lib/net40/FSharp.Data.dll"
open FSharp.Data

#I "../packages/Newtonsoft.Json/lib/net45/"
#I "../packages/Google.DataTable.Net.Wrapper/lib/"
#r "../packages/XPlot.GoogleCharts/lib/net45/XPlot.GoogleCharts.dll"

open XPlot.GoogleCharts

[<Literal>]
let redWinesPath = @"../data/winequality-red.csv"

type Wines = 
    CsvProvider<
        Sample = redWinesPath,
        Separators = ";",
        Schema = "float,float,float,float,float,float,float,float,float,float,float,float">

type Wine = Wines.Row


//SHOW SOME TYPE PROVIDER COOLNESS

let redWines = Wines.GetSample().Rows

let firstWine = redWines |> Seq.head
firstWine.Density

//CHART THE DATA

let options = Configuration.Options()
options.dataOpacity <- 0.20
options.pointSize <- 10

redWines
|> Seq.map (fun wine -> wine.Alcohol, wine.Quality)
|> Chart.Scatter
|> Chart.WithOptions options
|> Chart.WithTitle "Quality based on stuff"
|> Chart.WithXTitle "Amount of stuff"
|> Chart.WithYTitle "Quality"
|> Chart.Show

//DIVIDE THE DATA

let learningData = redWines |> Seq.take 1000
let testData = redWines |> Seq.skip 1000


//DEFINIG OUR MODEL AND COST FUNCTION

let predictionModel (a:float) (b:float) input =
    input |> Seq.map ( fun x -> a*x + b )


let costFunction (hypothesis:seq<float>) (actualValue:seq<float>) = 

    let sumSquared = Seq.map2 ( fun hx y -> (hx - y)**2.0 ) hypothesis actualValue |> Seq.sum

    let length = hypothesis |> Seq.length |> float
    let average = sumSquared / (length * 2.0) 
    average

// CHARTING HELPER

let drawCompareChart a b feature =
    let hypothesis = predictionModel a b feature

    let predictedQuality = Seq.map2 (fun a b -> (a,b)) feature hypothesis
    let actualQuality = redWines |> Seq.map (fun wine -> wine.Alcohol, wine.Quality)

    [predictedQuality; actualQuality]
    |> Chart.Scatter
    |> Chart.WithOptions options
    |> Chart.WithLabels ["Predicted"; "Actual"]
    |> Chart.Show


// LET'S TEST MY COST FUNCTION AND CHARTING

let alcoholFeature = learningData |> Seq.map (fun x -> x.Alcohol)
let qualityLabels = learningData |> Seq.map (fun x -> x.Quality)

let sampleA = 1.0 
let sampleB = 0.0
let hypothesis = predictionModel sampleA sampleB alcoholFeature

costFunction hypothesis qualityLabels
drawCompareChart sampleA sampleB alcoholFeature


// CALCULATING STEPS FOR GRADIENT DESCENT
let calculateStepA a b alpha feature actualValue =
    let hypothesis = predictionModel a b feature
    let sum = Seq.map2 ( fun hx y -> (hx - y) ) hypothesis actualValue |> Seq.sum

    let length = hypothesis |> Seq.length |> float
    let result = (sum * alpha) / length
    result

let calculateStepB a b alpha feature actualValue =
    let hypothesis = predictionModel a b feature
    let sum = Seq.map3 ( fun hx y x -> (hx - y) * x ) hypothesis actualValue feature |> Seq.sum

    let length = hypothesis |> Seq.length |> float
    let result = (sum * alpha) / length
    result


//LEARNING

let alpha = 0.001 //learning rate 
let steps = 150 //learning steps
let mutable a = 0.0
let mutable b = 0.0

for i in 0 .. steps do
    printfn "%f %f" a b
    if i%10 = 0 then drawCompareChart a b alcoholFeature

    let stepA = calculateStepA a b alpha alcoholFeature qualityLabels
    let stepB = calculateStepB a b alpha alcoholFeature qualityLabels

    a <- a - stepA
    b <- b - stepB



//TODO: Test on test data

let testAlcohoFeature = testData |> Seq.map (fun x -> x.Alcohol)
let testQualityLabels = testData |> Seq.map (fun x -> x.Quality)
let testHypothesis = predictionModel a b alcoholFeature
let testCost = costFunction testHypothesis testQualityLabels
drawCompareChart a b testAlcohoFeature