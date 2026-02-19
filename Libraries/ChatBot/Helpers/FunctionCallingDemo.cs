using System.Share;

namespace ChatBot.Helpers
{
    /// <summary>
    /// Demo class showing how to use the FunctionCalling helper
    /// </summary>
    public class FunctionCallingDemo
    {
        /// <summary>
        /// Run a complete demo of function calling with OpenAI
        /// </summary>
        public static async Task RunCompleteDemo()
        {
            try
            {
                Console.WriteLine("=== Function Calling Demo ===\n");

                // Demo 1: Simple simulation without API call
                Console.WriteLine("1. Simple Function Calling Simulation:");
                Console.WriteLine("=====================================");
                string simpleDemo = await FunctionCalling.SimpleFunctionCallingDemo();
                Console.WriteLine(simpleDemo);
                Console.WriteLine();

                // Demo 2: Actual API call (requires valid API key)
                Console.WriteLine("2. Real Function Calling with OpenAI API:");
                Console.WriteLine("==========================================");

                if (!string.IsNullOrEmpty(Constants.ChatGPTKey))
                {
                    string[] testQueries = {
                        "What's the weather like today?",
                        "Can you tell me the current weather in New York in Fahrenheit?",
                        "Where am I and what's the temperature?"
                    };

                    foreach (string query in testQueries)
                    {
                        Console.WriteLine($"User: {query}");
                        try
                        {
                            string response = await FunctionCalling.DemoFunctionCalling(Constants.ChatGPTKey, query);
                            Console.WriteLine($"Assistant: {response}");
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine($"Error: {ex.Message}");
                        }
                        Console.WriteLine();
                    }
                }
                else
                {
                    Console.WriteLine("No API key found in Constants.ChatGPTKey. Please set your OpenAI API key to test real function calling.");
                    Console.WriteLine("Example usage would be:");
                    Console.WriteLine("User: What's the weather like today?");
                    Console.WriteLine("Assistant: [Would call GetCurrentLocation(), then GetCurrentWeather(), then provide response]");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Demo failed: {ex.Message}");
            }
        }

        /// <summary>
        /// Test individual functions
        /// </summary>
        public static void TestIndividualFunctions()
        {
            Console.WriteLine("=== Testing Individual Functions ===\n");

            // These are private methods, so we can't call them directly
            // But we can show what they would return
            Console.WriteLine("Available Functions:");
            Console.WriteLine("- GetCurrentLocation(): Returns 'San Francisco' (simulated)");
            Console.WriteLine("- GetCurrentWeather(location, unit): Returns '31 {unit}' (simulated)");
            Console.WriteLine();

            Console.WriteLine("Function Schemas:");
            Console.WriteLine("1. GetCurrentLocation Tool:");
            Console.WriteLine("   - Name: GetCurrentLocation");
            Console.WriteLine("   - Description: Get the user's current location");
            Console.WriteLine("   - Parameters: None");
            Console.WriteLine();

            Console.WriteLine("2. GetCurrentWeather Tool:");
            Console.WriteLine("   - Name: GetCurrentWeather");
            Console.WriteLine("   - Description: Get the current weather in a given location");
            Console.WriteLine("   - Parameters:");
            Console.WriteLine("     - location (required): string - The city and state, e.g. Boston, MA");
            Console.WriteLine("     - unit (optional): string - celsius or fahrenheit");
            Console.WriteLine();
        }
    }
}
