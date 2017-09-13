using System;
using System.Runtime.InteropServices;

namespace ManagedConsoleApp
{
    public class Program
    {
        [DllImport("../../../Debug/2NativeLibrary.dll", CallingConvention = CallingConvention.Cdecl)]
        static extern int axb(int a, int x, int b);

        static void Main(string[] args)
        {
            var y = axb(3, 5, 7);

            Console.WriteLine(y);
        }
    }
}
