module Bonus_Squirrel

#r @"C:\Github\SquirrelifyProvider\SquirrelifyProvider\bin\Debug\SquirrelifyProvider.dll"

open SquirrelifyProvider
type squirrels = SquirrelifyProvider.SquirrelifyProvider
let squirrel = squirrels.Create();

squirrel