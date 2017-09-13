using System.Runtime.InteropServices;
using Nancy;
using Nancy.ModelBinding;

namespace _4WebApp.Modules
{
    public class MathModel
    {
        public int A { get; set; }
        public int B { get; set; }
        public int X { get; set; }
    }

    public class IndexModule : NancyModule
    {
        [DllImport("../../../Debug/2NativeLibrary.dll", CallingConvention = CallingConvention.Cdecl)]
        static extern int axb(int a, int x, int b);

        public IndexModule()
        {
            Get["/"] = parameters =>
            {
                return View["index"];
            };

            Post["/api"] = parameters =>
            {
                MathModel model = this.Bind();
                var complexMath = axb(model.A, model.X, model.B);

                return Response.AsJson(complexMath);
            };
        }
    }
}