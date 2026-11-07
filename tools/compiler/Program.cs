using System;
namespace DarkScript3
{
    static class Program
    {
        static int Main(string[] args)
        {
            try
            {
                RoundTripTool.CommandLine(args);
                return 0;
            }
            catch (Exception e)
            {
                Console.Error.WriteLine("ERROR: " + e);
                return 1;
            }
        }
    }
}
