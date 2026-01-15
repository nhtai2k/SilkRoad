# Function Calling Demo Usage

This demo shows how to implement function calling with OpenAI's ChatGPT API based on the official documentation.

## Files Overview

- **`FunctionCalling.cs`** - Contains the function definitions and tool configurations
- **`FunctionCallingDemo.cs`** - Provides demo methods to test function calling
- **`BeebotHelper.cs`** - Enhanced with function calling support
- **`readme.md`** - Original documentation reference

## How to Use

### 1. Simple Demo (No API Key Required)

```csharp
// Run a simulation without making actual API calls
string demo = await FunctionCalling.SimpleFunctionCallingDemo();
Console.WriteLine(demo);
```

### 2. Complete Demo with OpenAI API

```csharp
// Requires valid OpenAI API key in Constants.ChatGPTKey
await FunctionCallingDemo.RunCompleteDemo();
```

### 3. Integration with Existing BeebotHelper

```csharp
// Use the enhanced method with function calling
var beebotHelper = new BeebotHelper(promptHelper);
var result = await beebotHelper.SendMessageWithFunctionCalling(chatModel);
```

### 4. Direct Function Calling

```csharp
// Use function calling directly
string response = await FunctionCalling.DemoFunctionCalling(
    apiKey: "your-openai-api-key",
    userMessage: "What's the weather like today?"
);
```

## Available Functions

1. **GetCurrentLocation()** - Returns the user's current location (simulated as "San Francisco")
2. **GetCurrentWeather(location, unit)** - Returns weather information for a given location

## Example Conversations

**User:** "What's the weather like today?"

**Process:**
1. AI decides it needs location information
2. Calls `GetCurrentLocation()` → "San Francisco"
3. Calls `GetCurrentWeather("San Francisco", "celsius")` → "31 celsius"
4. Responds with complete weather information

**User:** "Can you tell me the current weather in New York in Fahrenheit?"

**Process:**
1. AI extracts location and unit from user message
2. Calls `GetCurrentWeather("New York", "fahrenheit")` → "31 fahrenheit"
3. Responds with weather information

## Key Features

- **Automatic Function Detection** - AI determines when functions are needed
- **Parameter Parsing** - Extracts and validates function parameters from user input
- **Error Handling** - Handles missing parameters and unknown functions
- **Multiple Iterations** - Supports multiple function calls in a single conversation
- **Integration Ready** - Can be easily integrated into existing chatbot workflows

## Configuration

Make sure to set your OpenAI API key in the `Constants.ChatGPTKey` field or pass it directly to the demo methods.

## Testing

You can test the function calling in several ways:

1. **Unit Test**: Call `FunctionCallingDemo.TestIndividualFunctions()` to see function schemas
2. **Simulation**: Use `SimpleFunctionCallingDemo()` for offline testing
3. **Full Integration**: Use `RunCompleteDemo()` with real API calls

## Extending

To add new functions:

1. Create your function method (make it static and private/public)
2. Define a `ChatTool` using `ChatTool.CreateFunctionTool()`
3. Add the tool to `GetAvailableTools()` method
4. Add function execution logic to `ExecuteFunction()` method

Example:
```csharp
private static string GetCurrentTime()
{
    return DateTime.Now.ToString("HH:mm:ss");
}

private static readonly ChatTool getCurrentTimeTool = ChatTool.CreateFunctionTool(
    functionName: nameof(GetCurrentTime),
    functionDescription: "Get the current time"
);
```
